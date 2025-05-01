import { Stack } from "expo-router";

export default function DashboardLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: true,
          headerTitleAlign: "center",
          headerTintColor: "#0aca7a",
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 20,
          },
        }}
      />
      {/* Add more screens to your dashboard here */}
    </Stack>
  );
}
