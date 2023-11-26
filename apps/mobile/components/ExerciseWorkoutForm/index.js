import * as z from 'zod';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Button, Divider, Icon } from '@rneui/themed';
import { StyleSheet, Text, View } from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';

import ExercisesDropdown from './ExercisesDropdown';
import WorkoutSetList from './WorkoutSetList';

const schema = z.object({
  exercise: z.string().min(1, { message: 'exercise is Required' }),
  sets: z
    .array(
      z.object({
        weight: z.string().min(1, { message: 'Set Weight is Required' }),
        repeats: z.string().min(1, { message: 'Set Repeats is Required' }),
      })
    )
    .min(1, { message: 'At least 1 set is required' }),
});

const ExerciseWorkoutForm = ({ handleSubmitForm, sets }) => {
  const { ...methods } = useForm({
    defaultValues: {
      exercise: '',
      sets,
    },
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    const subscription = methods.watch((value, { name, type }) =>
      console.log('watcher', value, name, type)
    );
    return () => subscription.unsubscribe();
  }, [methods.watch]);

  const onSubmit = async (formData) => {
    const { exercise, sets } = formData;
    const exerciseSets = sets.map((set, index) => ({
      ...set,
      set_order: index,
      exercise_id: exercise,
    }));
    return handleSubmitForm(exerciseSets);
  };

  const onError = (error) => {
    console.log('error', JSON.stringify(error, null, 2));
  };

  return (
    <FormProvider {...methods}>
      <Text>Workouts Page</Text>
      <ExercisesDropdown name="exercise" />

      <Divider />

      <WorkoutSetList />
      <Button title="Save" onPress={methods.handleSubmit(onSubmit, onError)} />
    </FormProvider>
  );
};

export default ExerciseWorkoutForm;

const styles = StyleSheet.create({});
