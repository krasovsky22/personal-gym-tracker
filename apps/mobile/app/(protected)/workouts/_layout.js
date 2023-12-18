import { View, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';

// export const unstable_settings = {
//   initialRouteName: 'index',
// };

export default function SettingsLayout() {
  return (
    <View style={styles.container}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});
