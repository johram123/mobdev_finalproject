import React, { useState } from "react";
import { Alert, ActivityIndicator, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { deleteCategory } from "../lib/category";

interface DeleteHandlerProps {
  categoryId: number;
  onDeleteSuccess: () => void;
}

export default function DeleteHandler({ categoryId, onDeleteSuccess }: DeleteHandlerProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this category?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            setIsDeleting(true);
            try {
              await deleteCategory(categoryId);
              onDeleteSuccess();
            } catch (error) {
              console.error("Error deleting category:", error);
              Alert.alert("Error", "Failed to delete category");
            } finally {
              setIsDeleting(false);
            }
          },
        },
      ]
    );
  };

  return (
    <TouchableOpacity onPress={handleDelete} disabled={isDeleting}>
      {isDeleting ? (
        <ActivityIndicator size="small" color="#aaa" />
      ) : (
        <AntDesign name="close" size={20} color="#aaa" />
      )}
    </TouchableOpacity>
  );
}