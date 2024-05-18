import { View, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';

export default function SettingsLayout() {
  return (
    <View style={styles.container}>
      <Stack
        screenOptions={{
          headerStyle: {
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          },
        }}
      >
        <Stack.Screen options={{ title: 'Settings' }} name="index" />
        <Stack.Screen
          options={{ title: 'Exercises Management' }}
          name="exercises/index"
        />
        <Stack.Screen
          options={{ title: 'Workouts Management' }}
          name="workouts/index"
        />

        <Stack.Screen
          options={{ title: 'Account Management' }}
          name="account"
        />
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
