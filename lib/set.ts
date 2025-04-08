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
  console.log("Updating set with ID:", set.fc_id);
  console.log("New questions:", set.questions);
  console.log("New answers:", set.answers);
  const { fc_id, questions, answers } = set;
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .update({ question: questions, answer: answers })
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
