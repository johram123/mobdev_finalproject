import supabase from "./supabase";

const TABLE_NAME = "category";

export async function getCategory() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select("*")
    .eq("user_id", user.id);
  if (error) {
    throw error;
  }
  console.log("Category data: ", data);
  return data;
}

export async function createCategory(category: { category_Name: string }) {
  const { category_Name } = category;
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .insert([{ category_Name: category_Name }]);
  if (error) {
    throw error;
  }
}

export async function updateCategory(category: {
  category_id: number;
  category_Name: string;
}) {
  const { category_id, category_Name } = category;
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .update({ category_Name: category_Name })
    .match({ category_id: category_id });
  if (error) {
    throw error;
  }
}

export async function deleteCategory(category_id: number) {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .delete()
    .match({ category_id: category_id });
  if (error) {
    throw error;
  }
}
