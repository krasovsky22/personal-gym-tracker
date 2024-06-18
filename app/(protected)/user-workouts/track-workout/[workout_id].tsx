import EmptyState from '@components/EmptyState';
import { useExercisesStore } from '@hooks';
import { Divider } from '@rneui/themed';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';

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
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text>Title</Text>
        <Text>{workout.name}</Text>
      </View>
      <Divider />
      <View style={styles.mainContainer}>
        <Text>Track Workout {workout.name}</Text>
      </View>
    </SafeAreaView>
  );
};

export default WorkoutsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  titleContainer: {
    height: 30,
    flex: 1,
  },
  mainContainer: {
    flex: 5,
  },
});
