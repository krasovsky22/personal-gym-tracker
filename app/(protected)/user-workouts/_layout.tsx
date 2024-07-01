import { SafeAreaView, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';

// export const unstable_settings = {
//   initialRouteName: 'index',
// };

export default function WorkoutsLayout() {
  return (
    <SafeAreaView style={styles.container}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
});
