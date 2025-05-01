import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { useSession } from "./../context/SessionContext";
import { router } from "expo-router";
import { useState, useEffect } from "react";

export default function Profile() {
  const { session } = useSession();
  const [userDetails, setUserDetails] = useState({
    email: "",
    id: "",
  });

  useEffect(() => {
    if (session?.user) {
      setUserDetails({
        email: session.user.email ?? "",
        id: session.user.id,
      });
    }
  }, [session]);

  return (
    <SafeAreaView className="flex-1 bg-white p-4">
      <View className="bg-white rounded-lg shadow-md p-6 mb-4">
        <Text className="text-xl font-bold mb-4">User Profile</Text>

        <View className="mb-4">
          <Text className="text-gray-500 text-sm">Email</Text>
          <Text className="text-gray-800">{userDetails.email}</Text>
        </View>

        <View className="mb-4">
          <Text className="text-gray-500 text-sm">User ID</Text>
          <Text className="text-gray-800">{userDetails.id}</Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => router.back()}
        className="bg-blue-500 p-4 rounded-lg items-center"
      >
        <Text className="text-white font-medium">Back to Dashboard</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
