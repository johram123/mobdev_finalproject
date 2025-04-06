import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text, Button } from "react-native";
import { useEffect, useState } from "react";
import { useAuth } from "../../lib/supabase_auth";
import { useRouter } from "expo-router";
import supabase from "../../lib/supabase";

const Profile = () => {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [streak, setStreak] = useState<number>(0);

  useEffect(() => {
    if (!user) {
      router.push("/");
    } else {
      fetchUserStreak(user.id);
    }
  }, [user]);

  const fetchUserStreak = async (userId: string) => {
    const { data, error } = await supabase
      .from('users')
      .select('streaks')
      .eq('user_id', userId)
      .single();

    if (data) {
      setStreak(data.streaks || 0);
    } else {
      console.error('Error fetching user streak', error);
    }
  };

  const handleSignOut = async () => {
    await signOut();
  };

  const username = user?.email?.split("@")[0];

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome {username}</Text>
      <Text>Streaks: {streak}</Text>
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
