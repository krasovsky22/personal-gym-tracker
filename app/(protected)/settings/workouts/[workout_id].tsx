import { useExercisesStore } from '@hooks';
import { StyleSheet, View } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';

import WorkoutForm from './components/workout-form';

function CreateWorkoutScreen() {
  const { getWorkoutById } = useExercisesStore();
  const { workout_id } = useLocalSearchParams<{ workout_id: string }>();

  const workout = getWorkoutById(workout_id!);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Edit Workout' }} />
      <WorkoutForm workout={workout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    marginRight: 10,
    flex: 1,
  },

  list: {
    flexGrow: 1,
    marginBottom: 10,
  },

  cardWrapper: {
    width: '100%',
  },
  cardContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    flexGrow: 1,
  },

  bottomContainer: {
    display: 'flex',
    gap: 30,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default CreateWorkoutScreen;
