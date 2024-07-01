import EmptyState from '@components/EmptyState';
import { useExercisesStore } from '@hooks';
import { Divider } from '@rneui/themed';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import UserWorkoutTracker from './components/user-workout-tracker';
import TrackWorkoutHeader from './components/header';

const EditUserWorkoutsScreen = () => {
  const { user_workout_id = '' } = useLocalSearchParams<{
    user_workout_id: string;
  }>()!;

  const { getUserWorkoutById, createNewUserWorkoutModel } = useExercisesStore();
  const userWorkout = getUserWorkoutById(user_workout_id)!;

  const workout = userWorkout.workout;

  if (!userWorkout || !workout) {
    return (
      <EmptyState
        title="Workout not found"
        description="Unable to find workout."
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <TrackWorkoutHeader userWorkout={userWorkout} />
      <Divider />
      <View style={styles.mainContainer}>
        <UserWorkoutTracker userWorkout={userWorkout} />
      </View>
    </SafeAreaView>
  );
};

export default EditUserWorkoutsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  mainContainer: {
    flex: 8,
  },
});
