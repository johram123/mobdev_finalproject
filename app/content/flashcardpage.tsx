import React from "react";
import { View, Text } from "react-native";
import { useSearchParams } from "expo-router/build/hooks";

export default function FlashcardPage() {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryId");
  const categoryName = searchParams.get("categoryName");

  return (
    <View>
      <Text>Hello, User!</Text>
      <Text>{categoryId}</Text>
      <Text>{categoryName}</Text>
    </View>
  );
}