import * as z from 'zod';
import uuid from 'react-native-uuid';
import { WorkoutType } from '@models/Workout';
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  useForm,
  FormProvider,
  useFieldArray,
  SubmitHandler,
  SubmitErrorHandler,
} from 'react-hook-form';
import AsyncButton from '@components/AsyncButton';
import { TextInput } from '@components/Form';
import { Button } from '@rneui/themed';
import { WorkoutExercise } from '@models/WorkoutExercise';
import WorkoutExerciseField from './exercise-field';

const schema = z.object({
  name: z.string().min(1, { message: 'Workout Name is Required' }),
  exercises: z
    .array(
      z.object({
        exercise_id: z.string().min(1, { message: 'Exercise is Required' }),
        setsCount: z.number().min(1, { message: 'Number of sets is Required' }),
      })
    )
    .min(1, { message: 'At least 1 set is required' }),
});

type WorkoutExerciseFormFieldType = {
  id?: string;
  exercise_id: string;
  setsCount: number;
};

type WorkoutFormValuesType = {
  name: string;
  exercises: WorkoutExerciseFormFieldType[];
};

type WorkoutFormProps = {
  workout?: WorkoutType;
};

function WorkoutForm({ workout }: WorkoutFormProps) {
  const { ...methods } = useForm<WorkoutFormValuesType>({
    defaultValues: {
      name: workout?.name ?? '',
      exercises:
        workout?.workoutExercises?.map((workoutExercise) => ({
          id: workoutExercise.id,
          exercise_id: workoutExercise.exercise?.id ?? '',
          setsCount: workoutExercise.sets_count,
        })) ?? [],
    },
    resolver: zodResolver(schema),
  });

  const { fields, append, move, remove } = useFieldArray({
    control: methods.control,
    name: 'exercises',
  });

  const addWorkoutExercise = () => {
    append({ id: `new-${uuid.v4()}`, exercise_id: '', setsCount: 0 });
  };

  const onSubmit: SubmitHandler<WorkoutFormValuesType> = async (formData) => {
    console.log(formData, workout);
  };

  const onError: SubmitErrorHandler<WorkoutFormValuesType> = (errors, _e) => {
    return console.log('ERRORS ', JSON.stringify(errors, null, 2));
  };

  return (
    <View style={styles.container}>
      <FormProvider {...methods}>
        <TextInput
          name="name"
          label="Name"
          placeholder="Exercise Name"
          rules={{ required: 'Workout name is required!' }}
        />

        <View style={styles.exercisesContainer}>
          <View style={styles.flatList}>
            <FlatList
              data={fields}
              keyExtractor={(a) => a.id}
              renderItem={({ index }) => {
                return <WorkoutExerciseField index={index} />;
              }}
            />
          </View>
          <View>
            <Button
              color="primary"
              title="Add Exercise"
              onPress={addWorkoutExercise}
            />
          </View>
        </View>

        <View style={styles.formFooter}>
          <AsyncButton
            color="success"
            title="Save"
            onPress={methods.handleSubmit(onSubmit, onError)}
          />
        </View>
      </FormProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  exercisesContainer: {
    flex: 1,
  },

  flatList: {
    flexGrow: 0,
  },

  //   list: {
  //     flexGrow: 1,
  //     marginBottom: 10,
  //   },

  //   cardWrapper: {
  //     width: '100%',
  //   },
  //   cardContainer: {
  //     flex: 1,
  //     width: '100%',
  //     flexDirection: 'row',
  //     flexGrow: 1,
  //   },

  //   bottomContainer: {
  //     display: 'flex',
  //     gap: 30,
  //     marginBottom: 10,
  //     flexDirection: 'row',
  //     justifyContent: 'space-between',
  //   },

  formFooter: {
    width: '80%',
    marginBottom: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});

export default WorkoutForm;
