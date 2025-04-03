import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text, Button } from "react-native";
import { useEffect } from "react";
import { useAuth } from "../../lib/supabase_auth";
import { useRouter } from "expo-router";

const Profile = () => {
  const { user, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
  };

  const username = user?.email?.split("@")[0];

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome {username}</Text>
      <Button title="Sign Out" onPress={handleSignOut} color="#0484D1" />
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
