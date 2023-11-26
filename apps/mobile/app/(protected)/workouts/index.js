import * as z from 'zod';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider, useFieldArray } from 'react-hook-form';
import { Button, Divider, useTheme, Icon } from '@rneui/themed';
import { View, Text, StyleSheet, FlatList } from 'react-native';

import { useExercisesStore } from '@hooks';
import { ExercisesDropdown, WorkoutSet } from '@components';

const TEMP_SETS = [{ id: 1 }, { id: 2 }, { id: 3 }];

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

function WorkoutsScreen() {
  const { theme } = useTheme();
  const { saveExerciseSets } = useExercisesStore();

  const { ...methods } = useForm({
    defaultValues: {
      exercise: '',
      sets: [],
    },
    resolver: zodResolver(schema),
  });

  const {
    fields: setsField,
    append,
    remove,
  } = useFieldArray({
    control: methods.control,
    name: 'sets',
  });

  console.log('asd', setsField);

  const onSubmit = async (formData) => {
    const { exercise, sets } = formData;
    const exerciseSets = formData.sets.map((set, index) => ({
      ...set,
      set_order: index,
      exercise_id: exercise,
    }));
    return saveExerciseSets(exerciseSets);
  };

  const onError = ({ sets }, e) => {
    return console.log('errors', sets);
  };

  const removeSetById = (id) => {
    remove(id);
  };

  const addSet = () => {
    append({ weight: '1', repeats: '2', isNew: true });
  };

  console.log('eee', methods.formState);

  return (
    <View style={styles.container}>
      <FormProvider {...methods}>
        <Text>Workouts Page</Text>
        <ExercisesDropdown name="exercise" />

        <Divider />
        <FlatList
          data={setsField}
          renderItem={({ item, index }) => (
            <View
              style={{ gap: 5, flexDirection: 'row', alignItems: 'center' }}
            >
              <View style={{ flexGrow: 1 }}>
                <WorkoutSet id={item.id} index={index + 1} />
              </View>
              <Button
                size="sm"
                type="clear"
                title="Remove"
                onPress={() => removeSetById(item.id)}
              >
                <Icon name="delete" color={theme.colors.error} />
              </Button>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
        <Button title="Add Set" onPress={addSet} />
        <Button
          title="Save"
          onPress={methods.handleSubmit(onSubmit, onError)}
        />
      </FormProvider>
    </View>
  );
}

export default WorkoutsScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  list: {
    flex: 1,
    width: '100%',
    display: 'flex',
    borderTopWidth: 1,
  },
  content: {
    gap: 1,
    fontSize: '12',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    verticalAlign: 'middle',
    justifyContent: 'space-between',
  },
});
