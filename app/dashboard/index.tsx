import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useSession } from "./../context/SessionContext";
import { supabase } from "../../lib/supabase";
import { useState, useEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function Dashboard() {
  const { session, setSession } = useSession();
  const [userEmail, setUserEmail] = useState<string>("");

  useEffect(() => {
    if (session?.user?.email) {
      setUserEmail(session.user.email);
    }
  }, [session]);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error.message);
    } else {
      setSession(null);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1">
        <View className="px-4 pt-12 pb-8 bg-blue-500">
          <View className="flex-row justify-between items-center">
            <Text className="text-2xl font-bold text-white">Dashboard</Text>
            <TouchableOpacity
              onPress={handleSignOut}
              className="p-2 bg-white rounded-full"
            >
              <MaterialCommunityIcons name="logout" size={24} color="#3b82f6" />
            </TouchableOpacity>
          </View>
          <Text className="text-white mt-2">Welcome, {userEmail}</Text>
        </View>

        <View className="p-4">
          <View className="bg-white rounded-lg shadow-md p-6 mb-4">
            <Text className="text-lg font-semibold mb-2">Getting Started</Text>
            <Text className="text-gray-600">
              Your app is now set up with Supabase authentication!
            </Text>
          </View>

          <View className="bg-white rounded-lg shadow-md p-6">
            <Text className="text-lg font-semibold mb-2">Next Steps</Text>
            <Text className="text-gray-600 mb-4">
              Here are some things you might want to do next:
            </Text>

            {[1, 2, 3].map((step, idx) => (
              <View key={step} className="flex-row items-center mb-3">
                <View className="w-8 h-8 bg-blue-100 rounded-full items-center justify-center mr-3">
                  <Text className="text-blue-500 font-semibold">{step}</Text>
                </View>
                <Text className="flex-1 text-gray-700">
                  {
                    [
                      "Create more screens and link them in the navigation",
                      "Set up your Supabase database tables",
                      "Implement data fetching from Supabase",
                    ][idx]
                  }
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    router.push("/dashboard/profile");
                  }}
                  className="p-2 bg-blue-500 rounded-full"
                >
                  <Text>prfile</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
