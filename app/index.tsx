import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  useFonts,
  Unbounded_400Regular,
  Unbounded_700Bold,
} from "@expo-google-fonts/unbounded";
import { useState } from "react";

export default function App() {
  let [fontsLoaded] = useFonts({
    Unbounded_Regular: Unbounded_400Regular,
    Unbounded_Bold: Unbounded_700Bold,
  });

  return (
    <View style={styles.container}>
      <View style={styles.welcomeText}>
        <Text
          style={{ fontSize: 26, fontFamily: "Unbounded_Bold", marginLeft: 20 }}
        >
          Hello, User!
        </Text>
      </View>
      <View style={styles.content}>
        <Text style={{ backgroundColor: "blue" }}>My Category</Text>
        <View style={styles.categoryContainer}>
          <View style={styles.category}>
            <Text style={styles.textStyle}>Pysch 301</Text>
          </View>
          <View style={styles.category}>
            <Text style={styles.textStyle}>Math 300</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#0484D1",
  },
  welcomeText: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },
  categoryContainer: {
    width: "100%",
    height: "100%",
    flexDirection: "column",
    backgroundColor: "white",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  content: {
    flex: 6,
    backgroundColor: "red",
    justifyContent: "space-around",
    alignItems: "center",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  category: {
    backgroundColor: "#0484D1",
    width: "70%",
    height: "30%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  textStyle: {
    fontSize: 20,
    fontFamily: "Unbounded_Regular",
    color: "white",
  },
});
