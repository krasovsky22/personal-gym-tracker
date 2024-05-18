import { View, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';

import ExerciseForm from './components/exercise-form';

function CreateExerciseScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Create New Exercise' }} />
      <ExerciseForm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
  },
});

export default CreateExerciseScreen;
