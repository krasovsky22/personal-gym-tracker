import EmptyState from '@components/EmptyState';
import { useExercisesStore } from '@hooks';
import { Divider } from '@rneui/themed';
import { useLocalSearchParams } from 'expo-router';
import { cast } from 'mobx-state-tree';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import UserWorkoutTracker from './components/user-workout-tracker';
import { toJS } from 'mobx';

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

  console.log(toJS(userWorkout));

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text>{workout.name}</Text>
        <Text>Check Workout Blah Blah</Text>
      </View>
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
  titleContainer: {
    height: 30,
    paddingHorizontal: 15,
    flex: 1,
  },
  mainContainer: {
    flex: 8,
  },
});
