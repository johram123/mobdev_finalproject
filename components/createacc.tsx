import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Button } from "react-native";

const CreateAccount: React.FC<{ navigateBack: any }> = ({ navigateBack }) => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleCreateAccount = () => {
    if (firstName && lastName && email && password) {
      alert("Account created successfully!");
    } else {
      alert("Please fill out all fields.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Skim</Text>
      <View style={[styles.inputContainer, styles.row]}>
        <View style={styles.namefield}>
          <Text style={styles.heading}>First Name</Text>
          <TextInput
            style={styles.inputName}
            value={firstName}
            onChangeText={setFirstName}
          />
        </View>
        <View style={styles.namefield}>
          <Text style={styles.heading}>Last Name</Text>
          <TextInput
            style={styles.inputName}
            value={lastName}
            onChangeText={setLastName}
          />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.heading}>Email</Text>
        <TextInput
          style={styles.inputCredentials}
          value={email}
          onChangeText={setEmail}
        />
        <View style={styles.credentialFields}>
          <Text style={styles.heading}>Password</Text>
          <TextInput
            style={styles.inputCredentials}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
      </View>
      <TouchableOpacity style={styles.createButton} onPress={handleCreateAccount}>
    <Text style={styles.createButtonText} >Create</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 100,
  },
  inputContainer: {
    marginTop: 20,
  },
  namefield: {
    width: 150,
    marginVertical: 10,
    
  },
  credentialFields: {
    width: 300,
    marginVertical: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#04b4d1",

  },
  inputName: {
    width: 125,
    padding: 10,
    backgroundColor: "#d3d3d3",
    borderColor: "#d3d3d3",
    borderWidth: 1,
    borderRadius: 15,
    
  },
  inputCredentials: {
    width: 300,
    padding: 10,
    backgroundColor: "#d3d3d3",
    borderColor: "#d3d3d3",
    borderWidth: 1,
    borderRadius: 15,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#04b4d1",
  },
  createButton: {
    marginTop: 30,
    borderRadius: 25,
    backgroundColor: "#04b4d1",
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    width: 300,
  },
  createButtonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 300,
  },
});

export default CreateAccount;