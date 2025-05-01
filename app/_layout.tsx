import { Slot, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Session } from "@supabase/supabase-js";
import { SessionProvider } from "./context/SessionContext";
import AuthScreen from "./components/AuthScreen";
import { View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  const [initializing, setInitializing] = useState(true);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // Check for an existing session when the app loads
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setInitializing(false);
    });

    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setInitializing(false);
      }
    );

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  // Show a loading screen while checking authentication
  if (initializing) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-lg font-medium text-gray-800">Loading...</Text>
        <StatusBar style="auto" />
      </View>
    );
  }

  return (
    <SessionProvider value={{ session, setSession }}>
      {session ? (
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      ) : (
        <AuthScreen />
      )}
      <StatusBar style="auto" />
    </SessionProvider>
  );
}
