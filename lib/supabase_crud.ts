import supabase from "./supabase";

const TABLE_NAME = "users";

export async function getItems() {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("User not found");
  }

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select("*")
    .eq("userID", user.id);
}

export async function insertUser(user: {
  userID: string;
  username: string;
  email: string;
}) {
  const { userID, username, email } = user;
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .insert([{ userID: userID, usernamename: username, email: email }]);
  if (error) {
    throw error;
  }
}

export async function updateUser(user: {
  id: number;
  name: string;
  email: string;
}) {
  const { id, name, email } = user;
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .update({ name: name, email: email })
    .match({ id: id });
  if (error) {
    throw error;
  }
}

export async function deleteUser(id: any) {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .delete()
    .match({ id: id });
  if (error) {
    throw error;
  }
}
