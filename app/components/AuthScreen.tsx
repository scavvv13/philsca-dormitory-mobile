import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { supabase } from "@/lib/supabase";
import * as WebBrowser from "expo-web-browser";

import { MaterialCommunityIcons } from "@expo/vector-icons";

// Initialize WebBrowser for OAuth
WebBrowser.maybeCompleteAuthSession();

export default function AuthScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const handleAuth = async () => {
    setLoading(true);
    setErrorMessage("");

    try {
      if (isLogin) {
        // Sign in
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;
      } else {
        // Sign up
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) throw error;
      }
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white"
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 justify-center p-8">
          <View className="mb-8 items-center">
            <Text className="text-3xl font-bold text-blue-500 mb-2">
              {isLogin ? "Welcome Back" : "Create Account"}
            </Text>
            <Text className="text-gray-500 text-center">
              {isLogin
                ? "Sign in to access your account"
                : "Sign up to get started with our app"}
            </Text>
          </View>

          {errorMessage ? (
            <View className="bg-red-50 p-3 rounded-lg mb-4">
              <Text className="text-red-500">{errorMessage}</Text>
            </View>
          ) : null}

          <View className="mb-4">
            <Text className="text-gray-700 mb-2 font-medium">Email</Text>
            <TextInput
              className="bg-gray-100 p-4 rounded-lg text-gray-800"
              placeholder="your.email@example.com"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          <View className="mb-6">
            <Text className="text-gray-700 mb-2 font-medium">Password</Text>
            <TextInput
              className="bg-gray-100 p-4 rounded-lg text-gray-800"
              placeholder="Your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
            />
          </View>

          <TouchableOpacity
            className={`p-4 rounded-lg items-center mb-4 ${
              loading ? "bg-blue-300" : "bg-blue-500"
            }`}
            onPress={handleAuth}
            disabled={loading}
          >
            <Text className="text-white font-medium">
              {loading ? "Please wait..." : isLogin ? "Sign In" : "Sign Up"}
            </Text>
          </TouchableOpacity>

          <View className="flex-row items-center my-4">
            <View className="flex-1 h-px bg-gray-300" />
            <Text className="mx-4 text-gray-500">OR</Text>
            <View className="flex-1 h-px bg-gray-300" />
          </View>

          <TouchableOpacity
            className="items-center"
            onPress={() => setIsLogin(!isLogin)}
          >
            <Text className="text-blue-500">
              {isLogin
                ? "Don't have an account? Sign Up"
                : "Already have an account? Sign In"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
