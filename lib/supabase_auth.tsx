import { useEffect, useState, createContext, useContext } from "react";
import supabase from "./supabase";
import { insertUser, updateStreak } from "./supabase_crud"; 
import { User } from "@supabase/supabase-js";

type AuthContextType = {
  user: User | null;
  signUp: (email: string, password: string) => Promise<any>;
  signIn: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<void>;
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

    const user = data?.user;
    if (user) {
      const { data: lastSignInData, error: lastSignInError } = await supabase
        .from("users")
        .select("last_signed_in, streaks")
        .eq("user_id", user.id)
        .single();

      if (lastSignInError) {
        console.error("Error fetching user data", lastSignInError);
      } else {
        const last_signed_in = new Date(lastSignInData?.last_signed_in);
        const currentDate = new Date();

        let streakIncremented = false;
        if (last_signed_in.toDateString() !== currentDate.toDateString()) {
          const incrementStreak = lastSignInData.streaks + 1;
          await updateStreak(user.id, incrementStreak, currentDate.toISOString());
          streakIncremented = true;
        }

        if (!streakIncremented) {
          await updateStreak(user.id, 1, currentDate.toISOString());
        }
      }
    }

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

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session ? session.user : null);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, signUp, signIn, signOut }}>
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
