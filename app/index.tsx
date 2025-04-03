import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, View, Text } from "react-native";
import Signin from "../components/signin";
import CreateAcc from "../components/createacc";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { useAuth } from "../lib/supabase_auth";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<string>("Signin");
  const [username, setUsername] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/content/home");
    }
  }, [user]);

  console.log("Current Screen: ", currentScreen);

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
