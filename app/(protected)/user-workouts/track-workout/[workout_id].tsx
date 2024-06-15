import EmptyState from '@components/EmptyState';
import { useExercisesStore } from '@hooks';
import { useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';

const WorkoutsScreen = () => {
  const { workout_id = '' } = useLocalSearchParams<{ workout_id: string }>()!;
  const { getWorkoutById } = useExercisesStore();
  const workout = getWorkoutById(workout_id)!;

  if (!workout) {
    return (
      <EmptyState
        title="Workout not found"
        description="Unable to find workout."
      />
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text>Title</Text>
      </View>
      <View style={styles.mainContainer}>
        <Text>Track Workout {workout.name}</Text>
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
