import { useState, useEffect } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from "react-native";
import { useAuth } from "../../lib/supabase_auth";
import { useRouter } from "expo-router";

const EditProfile = () => {
  const { user, updateUser, refreshUser } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState("");

  
  useEffect(() => {
    if (user?.email) {
      const emailPrefix = user.email.split("@")[0]; 
      setUsername(emailPrefix);
    }
  }, [user]);

  const handleUpdate = async () => {
    try {
      
      if (!/^[a-zA-Z0-9]+$/.test(username)) {
        alert("Username can only contain alphanumeric characters.");
        return;
      }

   
      const fullEmail = `${username}@gmail.com`;

     
      if (fullEmail === user?.email) {
        alert("The new username is the same as the current username.");
        return;
      }

      await updateUser({ email: fullEmail });
      await refreshUser(); 
      alert("Username updated successfully!");
      router.push("/content/profile");
    } catch (error) {
      console.error("Error updating username:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, backgroundColor: "#0484D1" }}>
        <View style={styles.content}>
          <Text style={[styles.styledText, { marginTop: 30 }]}>Edit Username</Text>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            placeholder="Enter new username"
            placeholderTextColor="#d3d3d3"
          />
          <TouchableOpacity style={styles.saveButton} onPress={handleUpdate}>
            <Text style={styles.saveButtonText}>Change Username</Text>
          </TouchableOpacity>
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
  },
  content: {
    flex: 5,
    alignItems: "center",
    zIndex: 1,
    backgroundColor: "white",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    paddingTop: 20,
    paddingBottom: 30,
  },
  styledText: {
    fontSize: 20,
    fontFamily: "Unbounded_Bold",
    color: "#0484D1",
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "#0484D1",
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 20,
    paddingHorizontal: 10,
    fontSize: 16,
    fontFamily: "Unbounded_Regular",
    color: "#000",
  },
  saveButton: {
    marginTop: 20,
    backgroundColor: "#0484D1",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "Unbounded_Bold",
  },
});

export default EditProfile;