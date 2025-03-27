import supabase from "./supabase";
import { insertUser } from "./supabase_crud";

export async function signUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  if (error) {
    console.error("Error: ", error.message);
    throw error;
  } else {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("User not found");
    }

    await insertUser({
      userID: user.id,
      username: email,
      email: email,
    });

    console.log("User: ", data);
    return data;
  }
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    console.error("Error: ", error.message);
    throw error;
  }
  console.log("User: ", data);
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Error: ", error.message);
    throw error;
  }

  console.log("User signed out successfully");
}
