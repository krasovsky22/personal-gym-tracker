import React from "react";
import { Redirect, Stack, Tabs } from "expo-router";

import { Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-orange">
      <Tabs.Screen options={{ headerShown: false, title: "Blah Blah" }} />
      <View flex={1} bg="orange" flexGrow={1}>
        <Text className="text-red">Home screen</Text>
      </View>
    </View>
  );
}
