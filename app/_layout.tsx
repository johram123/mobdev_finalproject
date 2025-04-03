import { Slot } from "expo-router";
import { AuthContextProvider } from "../lib/supabase_auth";
import {
  useFonts,
  Unbounded_400Regular,
  Unbounded_700Bold,
} from "@expo-google-fonts/unbounded";
import { ActivityIndicator, View } from "react-native";

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Unbounded_400Regular,
    Unbounded_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0484D1" />
      </View>
    );
  }
  return (
    <AuthContextProvider>
      <Slot />
    </AuthContextProvider>
  );
}
