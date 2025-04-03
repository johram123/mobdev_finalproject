import { AuthContextProvider } from "../lib/supabase_auth";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AuthContextProvider>{children}</AuthContextProvider>;
}
