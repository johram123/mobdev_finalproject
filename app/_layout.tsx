import { Slot } from "expo-router";
import { AuthContextProvider } from "../lib/supabase_auth";

export default function Layout() {
  return (
    <AuthContextProvider>
      <Slot />
    </AuthContextProvider>
  );
}
