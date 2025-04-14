import { Tabs } from "expo-router";
import { Image } from "react-native";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: true,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#0484D1",
          justifyContent: "center",
          alignItems: "center",
          height: "5%",
          borderTopWidth: 0,

          elevation: 0,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: "",
          tabBarIcon: () => (
            <Image
              source={require("../../assets/home.png")}
              style={{
                width: 50,
                height: 80,
                alignSelf: "center",
              }}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "",
          tabBarIcon: () => (
            <Image
              source={require("../../assets/user.png")}
              style={{
                width: 30,
                height: 30,
                alignSelf: "center",
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="topicpage"
        options={{
          href: null, // 💡 makes this page accessible via navigation but not in tabs
        }}
      />

      <Tabs.Screen
        name="addset"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="editProfile"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen name="flashcard" options={{ href: null }} />
    </Tabs>
  );
}
