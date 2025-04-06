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
import { useRouter } from "expo-router";
import { useState, useEffect, useCallback } from "react";
import { getTopics } from "../../lib/topics";
import CategoryHandler from "../../components/categoryhandler";
import DeleteHandler from "../../components/deletehandler";
import { useAuth } from "../../lib/supabase_auth";
import TopicHandler from "../../components/topichandler";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

interface Topic {
  topic_id: string;
  topic_name: string;
}

export default function TopicPage() {
  const searchParams = useSearchParams();
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const router = useRouter();

  const [categoryId, setCategoryId] = useState<string>("");
  const [categoryName, setCategoryName] = useState<string>("");
  // console.log("Category ID:", categoryId);
  // console.log("Category Name:", categoryName);

  const { user } = useAuth();

  const [topics, setTopics] = useState<Topic[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTopics = async (categoryId: string, categoryName: string) => {
    setIsLoading(true);
    try {
      if (!categoryId) {
        console.error("No category ID provided");
        return;
      }
      console.log("Fetching topics for category ID:", categoryId);
      console.log("Fetching Category Name:", categoryName);
      const topics = await getTopics(categoryId || "");
      setTopics(topics);
    } catch (error) {
      console.error("Error fetching topics:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTopicAdded = () => {
    fetchTopics(categoryId, categoryName);
  };

  const handleAddSet = (
    categoryId: string,
    categoryName: string,
    topicId: string,
    topicName: string
  ) => {
    console.log("Category ID:", categoryId);
    console.log("Category Name:", categoryName);
    router.push(
      `/content/addset?categoryId=${categoryId}&categoryName=${encodeURIComponent(
        categoryName
      )}&topicId=${topicId}&topicName=${encodeURIComponent(topicName)}`
    );
  };

  useFocusEffect(
    useCallback(() => {
      const catId = searchParams.get("categoryId") || "";
      const catName = searchParams.get("categoryName") || "";

      // Only update state and refetch if values changed
      if (catId !== categoryId || catName !== categoryName) {
        setCategoryId(catId);
        setCategoryName(catName);
        fetchTopics(catId, catName);
      }
    }, [searchParams, categoryId, categoryName])
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
          <View style={styles.topicContainer}>
            <View style={styles.topicHeader}>
              <Text style={styles.topicTitle}>{categoryName}</Text>
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
                {topics.length === 0 ? (
                  <Text style={styles.noTopics}>No topics yet. Add one!</Text>
                ) : (
                  <View style={styles.topicGrid}>
                    {topics.map((topic) => (
                      <View key={topic.topic_id} style={styles.topicBox}>
                        <Text style={styles.topicText}>{topic.topic_name}</Text>
                        <View style={styles.deleteButtonContainer}>
                          <DeleteHandler
                            rowId={topic.topic_id}
                            onDeleteSuccess={() =>
                              void fetchTopics(categoryId, categoryName)
                            }
                            page="topic"
                          />
                        </View>
                      </View>
                    ))}
                  </View>
                )}
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
  topicContainer: {
    width: "100%",
    height: "90%",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
    paddingTop: 20,
    paddingBottom: 30,
  },
  topicHeader: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: 20,
    position: "relative",
  },
  topicTitle: {
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
  topicGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    width: "100%",
  },
  topicBox: {
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
  topicText: {
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
  noTopics: {
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
