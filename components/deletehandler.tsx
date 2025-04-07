import React, { useState } from "react";
import { Alert, ActivityIndicator, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { deleteCategory } from "../lib/category";
import { deleteTopic } from "../lib/topics";
import { deleteSet } from "../lib/set";

interface DeleteHandlerProps {
  rowId: string;
  onDeleteSuccess: () => void;
  page: string;
}

export default function DeleteHandler({
  rowId,
  onDeleteSuccess,
  page,
}: DeleteHandlerProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    Alert.alert("Confirm Delete", "Are you sure you want to delete?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          setIsDeleting(true);
          try {
            console.log("Deleting:", rowId, page);
            if (page === "category") {
              await deleteCategory(rowId);
            } else if (page === "topic") {
              await deleteTopic(rowId);
            } else if (page === "set") {
              await deleteSet(rowId);
            } else {
              console.log("Unknown page type:", page);
            }
            await onDeleteSuccess();
          } catch (error) {
            console.error("Error deleting:", error);
            Alert.alert("Error", "Failed to delete");
          } finally {
            setIsDeleting(false);
          }
        },
      },
    ]);
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
