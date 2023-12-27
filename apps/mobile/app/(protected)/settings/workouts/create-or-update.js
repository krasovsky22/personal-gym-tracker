import * as z from 'zod';
import { useEffect, useState } from 'react';
import { Button } from '@rneui/themed';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import { FormProvider, useForm } from 'react-hook-form';
import { View, Text, StyleSheet } from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';

import { AsyncButton } from '@components';
import { useExercisesStore } from '@hooks';
import { TextInput } from '@components/Form';

const schema = z.object({
  name: z.string().min(1, { message: 'Workout Name is Required' }),
  //   sets: z
  //     .array(
  //       z.object({
  //         weight: z.string().min(1, { message: 'Set Weight is Required' }),
  //         repeats: z.string().min(1, { message: 'Set Repeats is Required' }),
  //       })
  //     )
  //     .min(1, { message: 'At least 1 set is required' }),
});

function CreateWorkoutScreen() {
  const { workout_id } = useLocalSearchParams();

  const onSubmit = async (formData) => {
    console.log('submit', formData);
  };

  const onError = (errors, e) => {
    return console.log('ERRORS ', errors);
  };

  //   useEffect(() => {
  //     if (exercise_id) {
  //       const exercise = getExerciseById(exercise_id);
  //       if (exercise) {
  //         setName(exercise.name);
  //       }
  //     }
  //   }, [exercise_id]);

  const router = useRouter();

  const { ...methods } = useForm({
    defaultValues: {
      name: '',
    },
    resolver: zodResolver(schema),
  });

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{ title: workout_id ? 'Update Workout' : 'Create Workout' }}
      />
      <FormProvider {...methods}>
        <View style={styles.list}>
          <TextInput
            name="name"
            label="Name"
            placeholder="Workout Name"
            rules={{ required: 'Workout name is required!' }}
          />
        </View>

        <View style={styles.bottomContainer}>
          <View style={{ flex: 1 }}>
            <Button
              color="error"
              title="Cancel"
              onPress={() => router.back()}
              containerStyle={{
                width: '100%',
              }}
            />
          </View>
          <View style={{ flex: 1 }}>
            <AsyncButton
              color="success"
              title="Save"
              onPress={methods.handleSubmit(onSubmit, onError)}
              containerStyle={{
                width: '100%',
              }}
            />
          </View>
        </View>
      </FormProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    marginLeft: 10,
    marginRight: 10,
    flex: 1,
  },

  list: {
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
