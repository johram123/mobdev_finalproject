import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text } from "react-native";
import Signin from "../components/signin";
import CreateAcc from "../components/createacc";
import { useState } from "react";

const Profile = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome, User!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
});

export default Profile;
