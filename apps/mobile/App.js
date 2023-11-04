import { greeting } from 'cool-package';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from '@rneui/base';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hello {greeting}</Text>
      <Text>Open up App.js to start working on your app!</Text>
      <Button title="Hello World" />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
