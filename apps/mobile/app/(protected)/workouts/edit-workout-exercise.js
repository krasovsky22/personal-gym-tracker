import { Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { useExercisesStore } from '@hooks';
import { ExerciseWorkoutForm } from '@components';

const TEMP_SETS = [
  { id: 1, weight: '', repeats: '' },
  { id: 2, weight: '', repeats: '' },
  { id: 3, weight: '', repeats: '' },
];

function EditWorkoutExerciseScreen() {
  const { saveExerciseSets } = useExercisesStore();
  const handleSubmit = async (exerciseWorkout) => {
    console.log('handle submit', exerciseWorkout);

    return saveExerciseSets(exerciseWorkout);
  };

  //   const onSubmit = async (formData) => {
  //     const { exercise, sets } = formData;
  //     const exerciseSets = formData.sets.map((set, index) => ({
  //       ...set,
  //       set_order: index,
  //       exercise_id: exercise,
  //     }));
  //     return saveExerciseSets(exerciseSets);
  //   };

  return (
    <>
      <Stack.Screen
        options={{ headerShown: true, title: 'Track New Workout' }}
      />
      <View style={styles.container}>
        <ExerciseWorkoutForm handleSubmitForm={handleSubmit} sets={TEMP_SETS} />
      </View>
    </>
  );
}

export default EditWorkoutExerciseScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
});
