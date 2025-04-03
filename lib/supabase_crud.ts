import supabase from "./supabase";

const TABLE_NAME = "users";
const CATEGORY_TABLE_NAME = "categories";

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
    .eq("user_id", user.id);
}

export async function insertUser(user: {
  user_id: string;
  password: string;
  email: string;
}) {
  const { user_id, password, email } = user;
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .insert([{ user_id: user_id, password: password, email: email }]);
  if (error) {
    throw error;
  }

  console.log("User inserted: ", data);
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
