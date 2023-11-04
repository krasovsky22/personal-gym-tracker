import { Stack, Tabs } from 'expo-router';
import { View } from 'react-native';

export default function Layout() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false, title: 'My home' }} />
      <Tabs />
    </>
  );
}
