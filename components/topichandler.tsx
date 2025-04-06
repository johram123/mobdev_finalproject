"use client";

import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Modal,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { createCategory } from "../lib/category";
import {
  useFonts,
  Unbounded_400Regular,
  Unbounded_700Bold,
} from "@expo-google-fonts/unbounded";
import { createTopic } from "../lib/topics";

interface TopicHandlerProps {
  isVisible: boolean;
  onClose: () => void;
  onCategoryAdded: () => void;
  categoryId: string;
}

export default function TopicHandler({
  isVisible,
  onClose,
  onCategoryAdded,
  categoryId,
}: TopicHandlerProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [topicName, setTopicName] = useState("");

  const handleSubmit = async () => {
    if (topicName === "") {
      Alert.alert("Error", "Category name cannot be empty.");
      return;
    }

    setIsLoading(true);
    try {
      await createTopic({ topic_name: topicName, category_id: categoryId });
      setTopicName("");
      onCategoryAdded();
      onClose();
    } catch (error) {
      console.error("Error creating topic:", error);
      Alert.alert("Error", "Failed to create topic. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Create New Topic</Text>

          <TextInput
            style={styles.input}
            placeholder="Topic Name"
            value={topicName}
            onChangeText={setTopicName}
            autoFocus
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}
              disabled={isLoading}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.createButton]}
              onPress={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Create</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: "Unbounded_Bold",
    marginBottom: 20,
    color: "#0484D1",
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontFamily: "Unbounded_Regular",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    borderRadius: 10,
    padding: 12,
    elevation: 2,
    width: "48%",
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#ccc",
  },
  createButton: {
    backgroundColor: "#0484D1",
  },
  buttonText: {
    color: "white",
    fontFamily: "Unbounded_Regular",
    fontSize: 16,
  },
  category: {
    backgroundColor: "#0484D1",
    width: "70%",
    minHeight: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginVertical: 10,
    padding: 15,
    overflow: "hidden",
  },
  textStyle: {
    fontSize: 20,
    fontFamily: "Unbounded_Regular",
    color: "white",
    textAlign: "center",
    overflow: "hidden",
  },
});
