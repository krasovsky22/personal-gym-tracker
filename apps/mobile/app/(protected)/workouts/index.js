import * as z from 'zod';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider, useFieldArray } from 'react-hook-form';
import { Button, Divider, useTheme, Icon } from '@rneui/themed';
import { View, Text, StyleSheet, FlatList } from 'react-native';

import { ExercisesDropdown, WorkoutSet } from '@components';

const TEMP_SETS = [{ id: 1 }, { id: 2 }, { id: 3 }];

const schema = z.object({
  exercise: z.string().min(1, { message: 'exercise is Required' }),
  sets: z
    .array(
      z.object({
        weight: z.string({ description: 'weight is Required' }),
        repeat: z.string(),
      })
    )
    .min(1, { message: 'At least 1 sec is required' }),
});

function WorkoutsScreen() {
  const { theme } = useTheme();
  const { ...methods } = useForm({
    defaultValues: {
      exercise: '',
      sets: [],
    },
    resolver: zodResolver(schema),
  });

  //   const [sets, setSets] = useState(TEMP_SETS);

  const {
    fields: setsField,
    append,
    remove,
  } = useFieldArray({
    control: methods.control, // control props comes from useForm (optional: if you are using FormContext)
    name: 'sets', // unique name for your Field Array
  });

  console.log('asd', setsField);

  const onSubmit = (data) => console.log('submit', data);

  const onError = ({ sets }, e) => {
    return console.log('errors', sets);
  };

  const removeSetById = (id) => {
    remove(id);
  };

  const addSet = () => {
    append({ weight: '1', repeat: '2' });
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
