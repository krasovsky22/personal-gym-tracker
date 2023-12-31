import * as z from 'zod';
import { useState } from 'react';
import uuid from 'react-native-uuid';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Icon, useTheme, Card } from '@rneui/themed';
import { FormProvider, useForm } from 'react-hook-form';

import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import {
  SafeAreaView,
  StyleSheet,
  View,
  VirtualizedList,
  Text,
} from 'react-native';

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
  const { theme } = useTheme();
  const { workout_id } = useLocalSearchParams();
  const [totalExercises, setTotalExercises] = useState([]);

  const { saveWorkout } = useExercisesStore();

  const addExercise = () => {
    setTotalExercises([...totalExercises, { id: `new-${uuid.v4()}` }]);
  };

  const removeExercise = (id) => {
    const newList = totalExercises.filter((exercise) => exercise.id !== id);

    setTotalExercises(newList);
  };

  const onSubmit = async (formData) => {
    await saveWorkout(formData);
  };

  const onError = (errors, e) => {
    return console.log('ERRORS ', errors);
  };

  const router = useRouter();

  const { ...methods } = useForm({
    defaultValues: {
      name: '',
      exercises: [],
    },
    resolver: zodResolver(schema),
  });

  console.log(totalExercises);

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
            <VirtualizedList
              initialNumToRender={totalExercises.length}
              getItemCount={() => totalExercises.length}
              getItem={(_data, index) => {
                return totalExercises[index];
              }}
              data={totalExercises}
              renderItem={({ item, index }) => (
                <Card containerStyle={styles.listItem}>
                  {/* <View> */}
                  <WorkoutExerciseField id={item.id} index={index} />
                  {/* </View> */}
                  <Button
                    size="sm"
                    type="outline"
                    title="Remove"
                    onPress={() => removeExercise(item.id)}
                    containerStyle={{
                      marginLeft: 'auto',
                    }}
                  >
                    <Icon name="delete" color={theme.colors.error} />
                    Delete
                  </Button>
                </Card>
              )}
              keyExtractor={(item) => item.id}
            />
          </SafeAreaView>

          <Button
            color="secondary"
            title="Add Exercise"
            onPress={addExercise}
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
