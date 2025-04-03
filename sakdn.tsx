"use client"

import { useState } from "react"
import { View, Text, TextInput, Modal, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from "react-native"
import { createCategory } from "../lib/category"
import { useFonts, Unbounded_400Regular, Unbounded_700Bold } from "@expo-google-fonts/unbounded"

interface CategoryHandlerProps {
  isVisible: boolean
  onClose: () => void
  onCategoryAdded: () => void
}

export default function CategoryHandler({ isVisible, onClose, onCategoryAdded }: CategoryHandlerProps) {
  const [categoryName, setCategoryName] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
    if (categoryName === "") {
     
      Alert.alert("Error", "Category name cannot be empty.")
      return
    }

    try {
      await createCategory({ category_Name: categoryName })
      setCategoryName("")
      onCategoryAdded()
      onClose()
    } catch (error) {
      console.error("Error creating category:", error)
      Alert.alert("Error", "Failed to create category. Please try again.")
    } finally {
      setIsLoading(false)
    }

    try {
      await insertUser({ name, email });
      loadTable();
      Alert.alert("User successfully inserted.");
    } catch (error) {
      Alert.alert((error as Error).message);
    } finally {
      setEmail("");
      setName("");
    }
  }

  return (
    <Modal visible={isVisible} transparent={true} animationType="slide" onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Create New Category</Text>

          <TextInput
            style={styles.input}
            placeholder="Category Name"
            value={categoryName}
            onChangeText={setCategoryName}
            autoFocus
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose} disabled={isLoading}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, styles.createButton]} onPress={handleSubmit} disabled={isLoading}>
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
  )
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
})

