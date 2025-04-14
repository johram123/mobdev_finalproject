import React from "react";
import {
  View,
  Text,
  Button,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { useRouter, useSearchParams } from "expo-router/build/hooks";
import { AntDesign } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { getSet, createSet, updateSet } from "../../lib/set";
import DeleteHandler from "../../components/deletehandler";
import { useAuth } from "../../lib/supabase_auth";
import TopicHandler from "../../components/topichandler";
import { useIsFocused } from "@react-navigation/native";

interface Set {
  fc_id: string;
  question: string;
  answer: string;
}

export default function TopicPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [categoryId, setCategoryId] = useState<string>("");
  const [topicId, setTopicId] = useState<string>("");
  const [topicName, setTopicName] = useState<string>("");
  const [isReturned, setIsReturned] = useState<boolean>(false);

  const { user } = useAuth();

  const [fcSet, setFcSet] = useState<Set[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const isFocused = useIsFocused();

  const fetchSet = async (topicId: string) => {
    setIsLoading(true);
    try {
      if (!topicId) {
        console.error("No topic ID provided");
        return;
      }
      const set = await getSet(topicId || "");
      console.log("Fetched set:", set);
      if (!set || set.length === 0) {
        console.log("No sets found for this topic");
        setFcSet([{ fc_id: "", question: "", answer: "" }]);
        return;
      }
      setFcSet(set);
      console.log("yoyo", fcSet);
      return set;
    } catch (error) {
      console.error("Error fetching set:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetInputAdded = () => {
    setFcSet([...fcSet, { fc_id: "", question: "", answer: "" }]);
  };

  const handleQuestionChange = (index: number, question: string) => {
    console.log("Question changed:", question);
    const updatedSet = [...fcSet];
    updatedSet[index].question = question;
    setFcSet(updatedSet);
  };

  const handleAnswerChange = (index: number, answer: string) => {
    console.log("Answer changed:", answer);
    const updatedSet = [...fcSet];
    updatedSet[index].answer = answer;
    setFcSet(updatedSet);
  };

  const redirectToFlashcard = (
    fcSet: Set[],
    topicName: string,
    topicId: string,
    categoryId: string
  ) => {
    router.push(
      `/content/flashcard?data=${encodeURIComponent(
        JSON.stringify(fcSet)
      )}&topicName=${encodeURIComponent(
        topicName
      )}&topicId=${encodeURIComponent(topicId)}&categoryId=${encodeURIComponent(
        categoryId
      )}`
    );
  };

  const setAddHandler = async () => {
    setIsLoading(true);
    try {
      for (const fc of fcSet) {
        if (fc.question && fc.answer && !fc.fc_id) {
          await createSet({
            topic_id: topicId,
            category_id: categoryId,
            questions: fc.question,
            answers: fc.answer,
          });
        } else if (fc.question && fc.answer && fc.fc_id !== "") {
          console.log("updating set: ", fc.fc_id);
          await updateSet({
            fc_id: fc.fc_id,
            questions: fc.question,
            answers: fc.answer,
          });
        } else {
          throw Error;
        }
      }

      fetchSet(topicId);
    } catch (Error) {
      Alert.alert("Error", "Please fill in all fields before saving.", [
        { text: "OK" },
      ]);
    } finally {
      setIsReturned(false);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      const catId = searchParams.get("categoryId") || "";
      const topId = searchParams.get("topicId") || "";
      const topName = searchParams.get("topicName") || "";
      const returnedParam = searchParams.get("returned") || "";
      const returned = returnedParam === "true";

      setIsReturned(returned);

      console.log("🟢 isFocused: true");
      if (!topId || !topName) {
        fetchSet(topicId);
        return;
      }

      if (topId !== topicId) {
        console.log("Changes detected, updating state...");
        setCategoryId(catId);
        setTopicId(topId);
        setTopicName(topName);
        fetchSet(topId);
      }

      console.log("loading?", !isLoading);
      console.log("returned?", !isReturned);
      if (!isLoading && !isReturned) {
        console.log("fetch length", fcSet.length);
        if (fcSet.length >= 1 && fcSet[0].fc_id !== "") {
          console.log("current set", fcSet);
          console.log("current topic name", topicName);
          redirectToFlashcard(fcSet, topName, topId, catId);
        }
      }
    } else {
      console.log("🔴 isFocused: false");
      setIsLoading(true);
      setTopicId("");
      setIsReturned(false);
    }
  }, [isFocused, isLoading, fcSet]);

  return !isLoading ? (
    <View style={styles.container}>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View style={styles.welcomeText}>
          <Text
            style={{
              fontSize: 26,
              fontFamily: "Unbounded_Bold",
              marginLeft: 20,
              marginBottom: 50,
            }}
          >
            Hello, {user?.email?.split("@")[0]}!
          </Text>
        </View>
        <View style={styles.content}>
          <View style={styles.setContainer}>
            <View style={styles.setHeader}>
              <Text style={styles.setTitle}>{topicName}</Text>
              <TouchableOpacity
                style={styles.addButton}
                onPress={handleSetInputAdded}
              >
                <AntDesign name="plus" size={24} color="#0484D1" />
              </TouchableOpacity>
            </View>

            {isLoading ? (
              <ActivityIndicator
                size="large"
                color="#0484D1"
                style={styles.loader}
              />
            ) : (
              <KeyboardAvoidingView
                style={{
                  width: "100%",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
              >
                <ScrollView
                  contentContainerStyle={styles.setScrollView}
                  showsVerticalScrollIndicator={false}
                  keyboardShouldPersistTaps="handled"
                >
                  <View style={styles.setGrid}>
                    {fcSet.map((fc, index) => (
                      <View key={index} style={styles.setBox}>
                        <View style={styles.setTextBox}>
                          <TextInput
                            style={styles.setText}
                            placeholder="Question"
                            value={fc.question}
                            onChangeText={(text) =>
                              handleQuestionChange(index, text)
                            }
                          />
                        </View>

                        <View style={styles.setTextBox}>
                          <TextInput
                            style={styles.setText}
                            placeholder="Answer"
                            value={fc.answer}
                            onChangeText={(text) =>
                              handleAnswerChange(index, text)
                            }
                          />
                        </View>

                        {fc.fc_id && (
                          <View style={styles.deleteButtonContainer}>
                            <DeleteHandler
                              rowId={fc.fc_id}
                              onDeleteSuccess={() => void fetchSet(topicId)}
                              page="set"
                            />
                          </View>
                        )}
                      </View>
                    ))}

                    <TouchableOpacity
                      style={styles.saveButton}
                      onPress={setAddHandler}
                    >
                      <AntDesign name="check" size={24} color="#0484D1" />
                    </TouchableOpacity>
                  </View>
                </ScrollView>
              </KeyboardAvoidingView>
            )}
          </View>
        </View>
      </View>
    </View>
  ) : (
    <ActivityIndicator size="large" color="#0484D1" style={styles.loader} />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    zIndex: -1,
  },
  welcomeText: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-start",
    backgroundColor: "white",
  },
  setContainer: {
    width: "100%",
    height: "90%",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
    paddingTop: 20,
    paddingBottom: 30,
  },
  setHeader: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: 20,
    position: "relative",
  },
  setTitle: {
    fontSize: 20,
    fontFamily: "Unbounded_Regular",
    color: "#0484D1",
  },
  addButton: {
    position: "absolute",
    right: 30,
    backgroundColor: "#dee0e0",
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
  saveButton: {
    backgroundColor: "#dee0e0",
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "black",
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  content: {
    flex: 5,
    alignItems: "center",
    zIndex: 1,
  },
  setScrollView: {
    alignItems: "center",
    paddingVertical: 10,
    width: "100%",
  },
  setGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  setBox: {
    width: "90%",
    height: 200,
    backgroundColor: "#0484D1",
    justifyContent: "center",
    alignItems: "flex-start",
    borderRadius: 20,
    margin: 10,
    padding: 10,
    position: "relative",
  },
  setTextBox: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
    borderBottomWidth: 3,
    borderColor: "white",
  },
  setText: {
    fontSize: 15,
    width: "100%",
    fontFamily: "Unbounded_Regular",
    textAlign: "left",
    overflow: "hidden",
  },
  deleteButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "transparent",
    padding: 5,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  loader: {
    marginTop: 50,
  },
  noSets: {
    fontFamily: "Unbounded_Regular",
    fontSize: 16,
    color: "#666",
    marginTop: 50,
  },
  deleteButtonContainer: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});
