import { useAuth } from "@clerk/expo";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
  const router = useRouter();
  const { signOut } = useAuth();
  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace("/sign-in");
    } catch (error) {
      console.error("Error Signing out:", error);
    }
  };
  return (
    <SafeAreaView>
      <View>
        <Text>Profile</Text>
        <TouchableOpacity
          className="w-full bg-blue-600 justify-center mb-4 py-4"
          onPress={handleSignOut}
        >
          <Text className="text-white font-semibold text-base">Sign Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
