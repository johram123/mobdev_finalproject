import React from "react";
import {
  View,
  Text,
  Button,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useSearchParams } from "expo-router/build/hooks";
import { AntDesign } from "@expo/vector-icons";
import { useState, useEffect, useCallback } from "react";
import { getSet } from "../../lib/set";
import DeleteHandler from "../../components/deletehandler";
import { useAuth } from "../../lib/supabase_auth";
import TopicHandler from "../../components/topichandler";
import { useFocusEffect } from "@react-navigation/native";

interface Set {
  question: string;
  answer: string;
}

export default function TopicPage() {
  const searchParams = useSearchParams();
  const [modalVisible, setModalVisible] = useState(false);

  const [categoryId, setCategoryId] = useState<string>("");
  const [categoryName, setCategoryName] = useState<string>("");
  const [topicId, setTopicId] = useState<string>("");
  const [topicName, setTopicName] = useState<string>("");

  const { user } = useAuth();

  const [fcSet, setFcSet] = useState<Set[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchSet = async (topicId: string) => {
    setIsLoading(true);
    try {
      if (!topicId) {
        console.error("No category ID provided");
        return;
      }
      const set = await getSet(categoryId || "");
      setSet(set);
    } catch (error) {
      console.error("Error fetching set:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTopicAdded = () => {
    fetchSet(topicId);
  };

  useFocusEffect(
    useCallback(() => {
      const catId = searchParams.get("categoryId") || "";
      const catName = searchParams.get("categoryName") || "";
      const topId = searchParams.get("topicId") || "";
      const topName = searchParams.get("topicName") || "";

      // Only update state and refetch if values changed
      if (topId !== topicId || topName !== topicName) {
        setCategoryId(catId);
        setCategoryName(catName);
        setTopicId(topId);
        setTopicName(topName);
        fetchSet(topId);
      }
    }, [searchParams, categoryId, topicId])
  );

  return (
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
                onPress={() => setModalVisible(true)}
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
              <ScrollView
                contentContainerStyle={styles.categoriesScrollView}
                showsVerticalScrollIndicator={false}
              >
                <View style={styles.setGrid}>
                  {topics.map((topic) => (
                    <View key={topic.topic_id} style={styles.topicBox}>
                      <Text style={styles.topicText}>{topic.topic_name}</Text>
                      <View style={styles.deleteButtonContainer}>
                        <DeleteHandler
                          rowId={topic.topic_id}
                          onDeleteSuccess={() => void fetchSet(topicId)}
                          page="topic"
                        />
                      </View>
                    </View>
                  ))}
                </View>
              </ScrollView>
            )}
          </View>
        </View>
      </View>

      <TopicHandler
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        onCategoryAdded={handleTopicAdded}
        categoryId={categoryId || ""}
      />
    </View>
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
  content: {
    flex: 5,
    alignItems: "center",
    zIndex: 1,
  },
  categoriesScrollView: {
    alignItems: "center",
    paddingVertical: 10,
    width: "100%",
  },
  setGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    width: "100%",
  },
  setBox: {
    width: "40%",
    height: 120,
    backgroundColor: "#0484D1",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    margin: 10,
    padding: 10,
    position: "relative",
  },
  setText: {
    fontSize: 16,
    fontFamily: "Unbounded_Regular",
    color: "white",
    textAlign: "center",
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
