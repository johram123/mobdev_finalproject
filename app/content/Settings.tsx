import { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import supabase from "../../lib/supabase";

const Settings = () => {
  const router = useRouter();
  const [streaks, setStreaks] = useState<number | null>(null);

  useEffect(() => {
    const fetchStreaks = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error("Failed to get user:", userError?.message);
        return;
      }

      const { data, error } = await supabase
        .from("users")
        .select("streaks")
        .eq("user_id", user.id)
        .single();

      if (error) {
        console.error("Failed to fetch streaks:", error.message);
        return;
      }

      setStreaks(data.streaks);
    };

    fetchStreaks();
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, backgroundColor: "#0484D1" }}>
        <View>
          <Text
            style={{
              fontSize: 26,
              fontFamily: "Unbounded_Bold",
              marginLeft: 20,
              marginBottom: 20,
            }}
          >
          </Text>
        </View>
        <View style={styles.content}>
          <View style={styles.categoryContainer}>
            <Text style={[styles.styledText, { marginTop: 30 }]}>Settings Page</Text>

            {streaks !== null && (
              <Text style={[styles.styledText, { marginTop: 20 }]}>
                Days logged in: {streaks}
              </Text>
            )}

            <TouchableOpacity
              style={[styles.textButton, { marginTop: 50 }]}
              onPress={() => router.push("/content/profile")}
            >
              <View style={styles.buttonContent}>
                <Text style={styles.styledText}>Back to Profile</Text>
                <Image source={require("../../assets/arrow.png")} style={styles.arrowIcon} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    zIndex: -1,
  },
  styledText: {
    fontSize: 20,
    fontFamily: "Unbounded_Regular",
    color: "#0484D1",
  },
  content: {
    flex: 5,
    alignItems: "center",
    zIndex: 1,
  },
  categoryContainer: {
    width: "100%",
    height: "90%",
    flexDirection: "column",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    alignItems: "center",
    backgroundColor: "white",
    paddingTop: 20,
    paddingBottom: 30,
  },
  textButton: {
    alignSelf: "flex-start",
    marginLeft: 40,
    marginVertical: 5,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingRight: 20,
  },
  arrowIcon: {
    width: 16,
    height: 16,
  },
});

export default Settings;
