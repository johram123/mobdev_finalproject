import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
  Image,
} from "react-native";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../lib/supabase_auth";
import { useFocusEffect, useRouter } from "expo-router";
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

  useFocusEffect(
    useCallback(() => {
      console.log("🟢 useFocusEffect: focused");

      return () => {
        console.log("🔴 useFocusEffect: unfocused");
      };
    }, [])
  );

  const fetchUserStreak = async (userId: string) => {
    const { data, error } = await supabase
      .from("users")
      .select("streaks")
      .eq("user_id", userId)
      .single();

    if (data) {
      setStreak(data.streaks || 0);
    } else {
      console.error("Error fetching user streak", error);
    }
  };

  const handleSignOut = async () => {
    await signOut();
  };

  const username = user?.email?.split("@")[0];

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
          ></Text>
        </View>
        <View style={styles.content}>
          <View style={styles.categoryContainer}>
            <Text style={[styles.styledText, { marginTop: 30 }]}>
              My Profile
            </Text>
            <Text>Streaks: {streak}</Text>
            <View style={[styles.imageContainer, { marginTop: 50 }]}>
              <Image
                source={require("../../assets/user.png")}
                style={styles.userImage}
              />
            </View>

            <Text style={[styles.styledText, { marginTop: 20 }]}>
              {username || "Firstname"}
            </Text>
            <Text style={styles.styledText}>{"Lastname"}</Text>

            {/* buttons */}
            <TouchableOpacity
              style={[styles.textButton, { marginTop: 130 }]}
              onPress={() => router.push("/content/editProfile")} // Navigate to EditProfile page
            >
              <View style={styles.buttonContent}>
                <Text style={styles.styledText}>Edit Profile</Text>
                <Image
                  source={require("../../assets/arrow.png")}
                  style={styles.arrowIcon}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.textButton}>
              <View style={styles.buttonContent}>
                <Text style={styles.styledText}>Settings</Text>
                <Image
                  source={require("../../assets/arrow.png")}
                  style={styles.arrowIcon}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleSignOut}>
              <Text style={[styles.logOutText, { marginTop: 80 }]}>
                Log Out
              </Text>
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
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#d3d3d3",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  userImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  textButton: {
    alignSelf: "flex-start",
    marginLeft: 40,
    marginVertical: 5,
  },
  logOutText: {
    fontSize: 16,
    color: "#d3d3d3",
    textDecorationLine: "underline",
    textAlign: "center",
    fontFamily: "Unbounded_Regular",
  },
  buttonContent: {
    flexDirection: "row", // Aligns text and arrow horizontally
    alignItems: "center", // Centers the text and arrow vertically
    justifyContent: "space-between", // Pushes text to the left and arrow to the right
    width: "100%", // Ensures the content spans the full width of the parent
    paddingRight: 20, // Adds padding to the right for spacing
  },
  arrowIcon: {
    width: 16, // Adjust the width of the arrow icon
    height: 16, // Adjust the height of the arrow icon
  },
});

export default Profile;
