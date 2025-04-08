import { useEffect, useState, createContext, useContext } from "react";
import supabase from "./supabase";
import { insertUser } from "./supabase_crud";
import { User } from "@supabase/supabase-js";

type AuthContextType = {
  user: User | null;
  signUp: (email: string, password: string) => Promise<any>;
  signIn: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<void>;
  updateUser: (updates: { email: string }) => Promise<void>; // Ensure this matches the updateUser function
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);

  async function signUp(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("User not found");
    }

    if (error) {
      alert("Error signing up");
    }
    await insertUser({
      user_id: user.id,
      password: password,
      email: email,
    });

    return user;
  }

  async function signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      alert("Error signing in");
      throw error;
    }

    console.log("User: ", data);
    return data;
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Error: ", error.message);
      throw error;
    }

    console.log("User signed out successfully");
  }

  // Add updateUser function
  async function updateUser(updates: { email: string }) {
    if (!user) {
      throw new Error("No user is signed in");
    }

    const { error } = await supabase
      .from("users") // Use the "users" table
      .update(updates) // Update the "email" column
      .eq("id", user.id); // Match the user's ID

    if (error) {
      console.error("Error updating user:", error.message);
      throw error;
    }

    console.log("User updated successfully");
  }

  async function refreshUser() {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      console.error("Error refreshing user:", error.message);
      throw error;
    }
    setUser(data.user);
  }

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session ? session.user : null);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, signUp, signIn, signOut, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
