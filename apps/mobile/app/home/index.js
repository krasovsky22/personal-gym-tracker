import { Tabs } from 'expo-router';
import React from 'react';

import { Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={{ backgroundColor: 'orange', flex: 1, marginTop: 30 }}>
      {/* <Tabs.Screen
        options={{
          title: 'My home',
          //   headerStyle: {
          //     height: 80, // Specify the height of your custom header
          //   },
        }}
      /> */}
      <Text>Home screen</Text>
    </View>
  );
}
