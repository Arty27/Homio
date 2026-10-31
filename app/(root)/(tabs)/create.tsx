import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function create() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View>
        <Text>Coming Soon! Thank you for your patience</Text>
      </View>
    </SafeAreaView>
  );
}
