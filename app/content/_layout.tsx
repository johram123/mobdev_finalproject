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
          height: "10%",
          borderTopWidth: 0,
          elevation: 0,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: "",
          tabBarIcon: () => <Image source={require("../../assets/home.png")} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "",
          tabBarIcon: () => <Image source={require("../../assets/user.png")} />,
        }}
      />
      <Tabs.Screen
        name="editProfile"
        options={{
          href: null, 
        }}
      />
      <Tabs.Screen
        name="Settings"
        options={{
          href: null, 
        }}
      />
    </Tabs>
  );
}
