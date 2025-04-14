import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
  Image,
} from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../lib/supabase_auth";
import { useFocusEffect, useRouter } from "expo-router";
import supabase from "../../lib/supabase";
import { useSearchParams } from "expo-router/build/hooks";

interface Flashcard {
  fc_id: string;
  question: string;
  answer: string;
}

const Flashcard = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [topicName, setTopicName] = useState<string>("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [updatedFlashcards, setUpdatedFlashcards] = useState<Flashcard[]>([
    { fc_id: "", question: "", answer: "" },
  ]);
  const [currentCard, setCurrentCard] = useState<Flashcard | null>(
    updatedFlashcards[0] || null
  );

  const [topicId, setTopicId] = useState<string>("");
  const [index, setIndex] = useState<number>(0);
  const [onQuestion, setOnQuestion] = useState<boolean>(true);

  const handleNextFlashcard = () => {
    const nextIndex = index + 1;
    if (nextIndex >= updatedFlashcards.length) {
      return;
    }
    setIndex(nextIndex);
    setCurrentCard(updatedFlashcards[nextIndex]);
    console.log("current index", index);
    setOnQuestion(true);
  };

  const handlePreviousFlashcard = () => {
    const prevIndex = index - 1;
    if (prevIndex < 0) {
      return;
    }
    setIndex(prevIndex);
    setCurrentCard(updatedFlashcards[prevIndex]);
    setOnQuestion(true);
  };

  const previousPage = (
    topicID: string,
    categoryId: string,
    topicName: string,
    returned: boolean = true
  ) => {
    router.push(
      `/content/addset?topicId=${topicID}&categoryId=${categoryId}&topicName=${topicName}&returned=${returned}`
    );
  };

  useFocusEffect(
    useCallback(() => {
      const raw = searchParams.get("data");
      const topName = searchParams.get("topicName");
      const parsedFlashcards = raw ? JSON.parse(raw) : null;
      const topicId = searchParams.get("topicId");
      const categoryId = searchParams.get("categoryId");

      if (!parsedFlashcards || parsedFlashcards.length === 0) return;

      setTopicName(topName || "");
      setCategoryId(categoryId || "");
      setTopicId(topicId || "");

      if (
        parsedFlashcards[0].fc_id !== updatedFlashcards[0].fc_id ||
        parsedFlashcards.length > updatedFlashcards.length
      ) {
        setUpdatedFlashcards(parsedFlashcards);
        setCurrentCard(parsedFlashcards[0]);
        setIndex(0);
      }
    }, [searchParams])
  );

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={styles.styledText}>{topicName}</Text>
        <TouchableOpacity
          onPress={() => previousPage(topicId, categoryId, topicName)}
          style={styles.backButton}
        >
          <Feather name="x" size={24} color="#0484D1" />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <TouchableOpacity
          style={{ width: 30, height: 30 }}
          onPress={handlePreviousFlashcard}
        >
          {index > 0 && <Feather name="arrow-left" size={30} color="black" />}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.textBox}
          onPress={() => setOnQuestion(!onQuestion)}
        >
          <Text
            style={{
              fontSize: 16,
              fontFamily: "Unbounded_Regular",
            }}
          >
            {onQuestion ? currentCard?.question : currentCard?.answer}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ width: 30, height: 30 }}
          onPress={handleNextFlashcard}
        >
          {index < updatedFlashcards.length - 1 && (
            <Feather name="arrow-right" size={30} color="black" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-evenly",
    backgroundColor: "#0484D1",
  },
  backButton: {
    position: "absolute",
    right: 30,
    backgroundColor: "#f0f0f0",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  styledText: {
    fontSize: 20,
    fontFamily: "Unbounded_Regular",
    color: "white",
  },
  textBox: {
    width: "70%",
    height: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 7,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    borderRadius: 30,
    alignSelf: "center",
    backgroundColor: "white",
    marginBottom: 20,
  },
});

export default Flashcard;
