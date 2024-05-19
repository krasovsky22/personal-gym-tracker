import * as z from 'zod';
import uuid from 'react-native-uuid';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Icon, useTheme, Card } from '@rneui/themed';
import {
  FormProvider,
  useForm,
  useFieldArray,
  SubmitHandler,
} from 'react-hook-form';

import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';

import { AsyncButton } from '@components';
import { useExercisesStore } from '@hooks';
import { TextInput } from '@components/Form';

import WorkoutExerciseField from './components/exercise-field';
import { FlatList } from 'react-native-gesture-handler';
import WorkoutForm from './components/workout-form';

// const schema = z.object({
//   name: z.string().min(1, { message: 'Workout Name is Required' }),
//   exercises: z
//     .array(
//       z.object({
//         exercise: z.string().min(1, { message: 'Exercise is Required' }),
//         setsCount: z.number().min(1, { message: 'Number of sets is Required' }),
//       })
//     )
//     .min(1, { message: 'At least 1 set is required' }),
// });

// function getFormDefaultValue(workout) {
//   if (!workout) {
//     return {
//       name: '',
//       exercises: [],
//     };
//   }

//   return {
//     name: workout.name,
//     exercises: workout.workoutExercises.map((workoutExercise) => ({
//       setsCount: workoutExercise.sets_count,
//       exercise: workoutExercise.exercise.id,
//     })),
//   };
// }

function CreateWorkoutScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const { getWorkoutById, saveWorkout } = useExercisesStore();
  const { workout_id } = useLocalSearchParams<{ workout_id: string }>();

  const workout = getWorkoutById(workout_id!);
  //   const defaultValues = getFormDefaultValue(workout);

  //   const { ...methods } = useForm({
  //     defaultValues,
  //     resolver: zodResolver(schema),
  //   });

  //   const { control } = methods;

  //   const { fields, append, move, remove } = useFieldArray({
  //     control,
  //     name: 'exercises',
  //   });

  //   const addWorkoutExercise = () => {
  //     append({ id: `new-${uuid.v4()}` });
  //   };

  //   const onSubmit : SubmitHandler<ExerciseFormValuesType></ExerciseFormValuesType> = async (formData) => {
  //     await saveWorkout(formData, workout_id);

  //     return router.back();
  //   };

  //   const onError = (errors, e) => {
  //     return console.log('ERRORS ', JSON.stringify(errors, null, 2));
  //   };

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
