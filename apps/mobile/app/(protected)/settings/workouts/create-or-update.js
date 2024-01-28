import * as z from 'zod';
import { useState } from 'react';
import uuid from 'react-native-uuid';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Icon, useTheme, Card } from '@rneui/themed';
import { FormProvider, useForm, useFieldArray } from 'react-hook-form';

import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView, StyleSheet, View, TouchableOpacity } from 'react-native';
import DraggableFlatList, {
  NestableScrollContainer,
  NestableDraggableFlatList,
  ScaleDecorator,
} from 'react-native-draggable-flatlist';

import { AsyncButton } from '@components';
import { useExercisesStore } from '@hooks';
import { TextInput } from '@components/Form';

import WorkoutExerciseField from './components/exercise-field';

const schema = z.object({
  name: z.string().min(1, { message: 'Workout Name is Required' }),
  exercises: z
    .array(
      z.object({
        exercise: z.string().min(1, { message: 'Exercise is Required' }),
        setsCount: z.number().min(1, { message: 'Number of sets is Required' }),
      })
    )
    .min(1, { message: 'At least 1 set is required' }),
});

function getFormDefaultValue(workout) {
  if (!workout) {
    return {
      name: '',
      exercises: [],
    };
  }

  return {
    name: workout.name,
    exercises: workout.workoutExercises.map((workoutExercise) => ({
      setsCount: workoutExercise.sets_count,
      exercise: workoutExercise.exercise.id,
    })),
  };
}

function CreateWorkoutScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const { getWorkoutById, saveWorkout } = useExercisesStore();
  const { workout_id } = useLocalSearchParams();

  //   const defaultValues = workout_id
  //     ? getWorkoutById(workout_id)
  //     : console.log('asdasd', workout_id);

  const workout = workout_id ? getWorkoutById(workout_id) : null;
  const defaultValues = getFormDefaultValue(workout);

  console.log(defaultValues);

  const { ...methods } = useForm({
    defaultValues,
    // defaultValues: {
    //   name: '',
    //   exercises: [],
    // },
    resolver: zodResolver(schema),
  });

  const { control } = methods;

  const { fields, append, move, remove } = useFieldArray({
    control,
    name: 'exercises',
  });

  const addWorkoutExercise = () => {
    append({ id: `new-${uuid.v4()}` });
  };

  const onSubmit = async (formData) => {
    console.log(JSON.stringify(formData, null, 2));
    await saveWorkout(formData);

    return router.back();
  };

  const onError = (errors, e) => {
    return console.log('ERRORS ', JSON.stringify(errors, null, 2));
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{ title: workout_id ? 'Update Workout' : 'Create Workout' }}
      />
      <FormProvider {...methods}>
        <NestableScrollContainer style={{ backgroundColor: 'seashell' }}>
          <TextInput
            name="name"
            label="Name"
            placeholder="Workout Name"
            rules={{ required: 'Workout name is required!' }}
          />

          <SafeAreaView style={{ flex: 1 }}>
            <NestableDraggableFlatList
              keyExtractor={(item) => item.id}
              onDragEnd={({ from, to }) => {
                move(from, to);
              }}
              data={fields}
              renderItem={({ item, drag, isActive, getIndex }) => (
                <ScaleDecorator>
                  <TouchableOpacity
                    onLongPress={drag}
                    disabled={isActive}
                    style={[
                      styles.rowItem,
                      {
                        backgroundColor: isActive
                          ? 'pink'
                          : item.backgroundColor,
                      },
                    ]}
                  >
                    <Card containerStyle={styles.listItem}>
                      <WorkoutExerciseField index={getIndex()} />

                      <Button
                        size="sm"
                        type="outline"
                        title="Remove"
                        onPress={() => remove(getIndex())}
                        containerStyle={{
                          marginLeft: 'auto',
                        }}
                      >
                        <Icon name="delete" color={theme.colors.error} />
                        Delete
                      </Button>
                    </Card>
                  </TouchableOpacity>
                </ScaleDecorator>
              )}
            />
          </SafeAreaView>

          <View style={{ marginTop: 10 }}>
            <Button
              color="secondary"
              title="Add Exercise"
              onPress={addWorkoutExercise}
            />
          </View>
        </NestableScrollContainer>

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
    marginLeft: 10,
    marginRight: 10,
    flex: 1,
  },

  list: {
    flexGrow: 1,
    marginBottom: 10,
  },

  listItem: {
    flex: 1,
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
