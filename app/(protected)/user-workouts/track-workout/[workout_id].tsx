import EmptyState from '@components/EmptyState';
import { useExercisesStore } from '@hooks';
import { UserWorkout } from '@models/UserWorkout';
import { useLocalSearchParams } from 'expo-router';
import { cast } from 'mobx-state-tree';
import { View, Text, StyleSheet } from 'react-native';
import UserWorkoutTracker from './components/user-workout-tracker';

const WorkoutsScreen = () => {
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
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text>Title</Text>
      </View>
      <View style={styles.mainContainer}>
        <UserWorkoutTracker userWorkout={userWorkout} />
      </View>
    </View>
  );
};

export default WorkoutsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    height: 30,
    flex: 1,
  },
  mainContainer: {
    flex: 3,
  },
});
