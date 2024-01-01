import * as z from 'zod';
import { useState } from 'react';
import uuid from 'react-native-uuid';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Icon, useTheme, Card } from '@rneui/themed';
import { FormProvider, useForm, useFieldArray } from 'react-hook-form';

import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView, StyleSheet, View, TouchableOpacity } from 'react-native';
import DraggableFlatList, {
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

function CreateWorkoutScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const { saveWorkout } = useExercisesStore();
  const { workout_id } = useLocalSearchParams();

  const [workoutExercises, setWorkoutExercises] = useState([]);

  const { ...methods } = useForm({
    defaultValues: {
      name: '',
      exercises: [],
    },
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

  const removeWorkoutExercise = (id) => {
    const newList = workoutExercises.filter(
      (workoutExercise) => workoutExercise.id !== id
    );

    setWorkoutExercises(newList);
  };

  const onSubmit = async (formData) => {
    console.log(JSON.stringify(formData, null, 2));
    await saveWorkout(formData);
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
        <View style={styles.list}>
          <TextInput
            name="name"
            label="Name"
            placeholder="Workout Name"
            rules={{ required: 'Workout name is required!' }}
          />

          <SafeAreaView style={{ flex: 1 }}>
            <DraggableFlatList
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

          <Button
            color="secondary"
            title="Add Exercise"
            onPress={addWorkoutExercise}
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
