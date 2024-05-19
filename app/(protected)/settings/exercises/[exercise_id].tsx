import { View, StyleSheet } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';

import { useExercisesStore } from '@hooks';
import ExerciseForm from './components/exercise-form';

function ExerciseScreen() {
  const { exercise_id = '' } = useLocalSearchParams<{ exercise_id: string }>();

  const { getExerciseById } = useExercisesStore();
  const exercise = getExerciseById(exercise_id)!;

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Edit Exercise' }} />
      <ExerciseForm exercise={exercise} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
  },
});

export default ExerciseScreen;
