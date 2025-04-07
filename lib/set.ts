import supabase from "./supabase";

const TABLE_NAME = "flashcardset";

export async function getSet(topic_id: string) {
  console.log("Fetching set for topic ID:", topic_id);
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select("*")
    .eq("topic_id", topic_id);
  if (error) {
    throw error;
  }
  return data;
}

export async function createSet(topic: {
  topic_id: string;
  category_id: string;
  questions: string;
  answers: string;
}) {
  const { topic_id, category_id, questions, answers } = topic;
  const { data, error } = await supabase.from(TABLE_NAME).insert([
    {
      topic_id: topic_id,
      category_id: category_id,
      question: questions,
      answer: answers,
    },
  ]);
  if (error) {
    throw error;
  }
}

export async function updateSet(set: {
  fc_id: string;
  questions: string;
  answers: string;
}) {
  const { fc_id, questions, answers } = set;
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .update({ questions: questions, answers: answers })
    .match({ fc_id: fc_id });
  if (error) {
    throw error;
  }
}

export async function deleteSet(fc_id: string) {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .delete()
    .eq("fc_id", fc_id);
  if (error) {
    throw error;
  }
}
