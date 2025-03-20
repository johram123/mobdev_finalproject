import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import Signin from "../components/signin";
import CreateAcc from "../components/createacc"; 
import { useState } from "react";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<string>("Signin"); 
  const [username, setUsername] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); 

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {currentScreen === "Signin" ? (
        <Signin
          booleanToggle={setIsLoggedIn} 
          setUsername={setUsername}
          navigateToCreateAcc={() => setCurrentScreen("CreateAcc")} 
        />
      ) : (
        <CreateAcc navigateBack={() => setCurrentScreen("Signin")} /> 
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
});