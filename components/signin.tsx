import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  TouchableOpacity,
} from "react-native";
import {
  useFonts,
  Unbounded_400Regular,
  Unbounded_700Bold,
} from "@expo-google-fonts/unbounded";

import React, { useState } from "react";

type SigninProps = {
  booleanToggle: (isLoggedIn: boolean) => void;
  setUsername: (username: string) => void;
  navigateToCreateAcc: () => void;
};

const Signin: React.FC<SigninProps> = ({
  booleanToggle,
  setUsername,
  navigateToCreateAcc,
}) => {
  let [fontsLoaded] = useFonts({
    Unbounded_Regular: Unbounded_400Regular,
    Unbounded_Bold: Unbounded_700Bold,
  });

  const [username, setUserInput] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = () => {
    if (username && password) {
      setUsername(username);
      booleanToggle(true);
    } else {
      alert("Please enter both username and password.");
    }
  };

  return (
    <View style={style.container}>
      <Text style={style.title}>Skim</Text>
      <View style={style.inputContainer}>
        <View style={style.inputGroup}>
          <Text style={style.heading}>Email</Text>
          <TextInput
            style={style.input}
            value={username}
            onChangeText={setUserInput}
          />
        </View>
        <View style={style.inputGroup}>
          <Text style={style.heading}>Password</Text>
          <TextInput
            style={style.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
      </View>
      <TouchableOpacity style={style.loginButton} onPress={handleSubmit}>
        <Text style={style.loginButtonText}>Log in</Text>
      </TouchableOpacity>
      <View style={style.footer}>
        <Text style={style.footerText}>I don't have an account</Text>
        <TouchableOpacity onPress={navigateToCreateAcc}>
          <Text style={style.signUpText}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 100,
  },
  inputContainer: {
    marginTop: 170,
  },
  inputGroup: {
    width: 300,
    marginVertical: 10,
  },
  heading: {
    fontSize: 20,
    fontFamily: "Unbounded_Bold",
    marginBottom: 5,
  },
  input: {
    width: 300,
    padding: 10,
    backgroundColor: "#d3d3d3",
    borderColor: "#d3d3d3",
    borderWidth: 1,
    borderRadius: 15,
  },
  title: {
    fontSize: 80,
    marginBottom: 20,
    color: "#04b4d1",
    fontFamily: "Unbounded_Bold",
  },
  loginButton: {
    marginTop: 70,
    borderRadius: 25,
    backgroundColor: "#04b4d1",
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    width: 300,
  },
  loginButtonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  footer: {
    marginTop: 20,
    alignItems: "center",
  },
  footerText: {
    fontFamily: "Unbounded_regular",
    fontSize: 16,
    color: "#000",
  },
  signUpText: {
    fontFamily: "Unbounded_regular",
    fontSize: 16,
    color: "#04b4d1",
    fontWeight: "bold",
  },
});

export default Signin;
