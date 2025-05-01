import { Redirect } from "expo-router";

export default function Home() {
  // Redirects to dashboard if authenticated
  return <Redirect href="/dashboard" />;
}
