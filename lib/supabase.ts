import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

// Replace with your Supabase URL and anon key
const supabaseUrl = "https://zwfhofxvqyahgeuqcemh.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3ZmhvZnh2cXlhaGdldXFjZW1oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQxMTg3MzcsImV4cCI6MjA1OTY5NDczN30.zH_NFHnYxrYAfzoai__6smaKb3FrLDj2sLtGJKgXe6w";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
