import supabase from "./supabase";

const TABLE_NAME = "topics";

export async function getTopics(category_id: string) {
  console.log("Category ID here topic.ts: ", category_id);
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select("*")
    .eq("category_id", category_id);
  if (error) {
    throw error;
  }
  return data;
}

export async function createTopic(topic: {
  topic_name: string;
  category_id: string;
}) {
  const { topic_name, category_id } = topic;
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .insert([{ topic_name: topic_name, category_id: category_id }]);
  if (error) {
    throw error;
  }
}

export async function updateTopic(topic: {
  topic_id: string;
  topic_name: string;
}) {
  const { topic_id, topic_name } = topic;
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .update({ topic_name: topic_name })
    .match({ topic_id: topic_id });
  if (error) {
    throw error;
  }
}

export async function deleteTopic(topic_id: string) {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .delete()
    .eq("topic_id", topic_id);
  if (error) {
    throw error;
  }
}
