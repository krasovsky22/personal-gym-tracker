import { useExercisesStore } from '@hooks';
import EmptyState from '@components/EmptyState';
import { useLocalSearchParams } from 'expo-router';
import { useTheme } from '@rneui/themed';
import { SafeAreaView, View, StyleSheet } from 'react-native';

import TrackWorkoutHeader from './components/header';
import UserWorkoutTracker from './components/user-workout-tracker';

const WorkoutsScreen = () => {
  const { theme } = useTheme();
  const { workout_id = '' } = useLocalSearchParams<{ workout_id: string }>()!;
  const { getWorkoutById, createNewUserWorkoutModel } = useExercisesStore();
  const workout = getWorkoutById(workout_id)!;

  if (!workout) {
    return (
      <EmptyState
        title="Workout not found"
        description="Unable to find workout."
      />
    );
  }

  const userWorkout = createNewUserWorkoutModel(workout);

  return (
    <SafeAreaView style={styles.container}>
      <TrackWorkoutHeader userWorkout={userWorkout} />

      <View style={styles.mainContainer}>
        <UserWorkoutTracker userWorkout={userWorkout} />
      </View>
    </SafeAreaView>
  );
};

export default WorkoutsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    gap: 5,
  },
  mainContainer: {
    flex: 8,
  },
});
