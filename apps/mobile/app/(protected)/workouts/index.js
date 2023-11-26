import { useState } from 'react';
import { useForm, Controller, FormProvider } from 'react-hook-form';
import { Button, Divider, useTheme, Icon } from '@rneui/themed';
import { View, Text, StyleSheet, VirtualizedList } from 'react-native';

import { ExercisesDropdown, WorkoutSet } from '@components';

const TEMP_SETS = [{ id: 1 }, { id: 2 }, { id: 3 }];

function WorkoutsScreen() {
  const { theme } = useTheme();
  const { ...methods } = useForm();

  const [sets, setSets] = useState(TEMP_SETS);

  const onSubmit = (data) => console.log('submit', data);

  const onError = (errors, e) => {
    return console.log('errors', errors);
  };

  const removeSetById = (id) => {
    const newSets = sets.filter((set) => set.id !== id);
    setSets(newSets);
  };

  const addSet = () => {
    const newSets = [...sets, { id: sets[sets.length - 1].id + 1 }];
    setSets(newSets);
  };

  return (
    <View style={styles.container}>
      <FormProvider {...methods}>
        <Text>Workouts Page</Text>
        <ExercisesDropdown />

        <Divider />
        <VirtualizedList
          initialNumToRender={sets.length}
          data={TEMP_SETS}
          renderItem={({ index, item }) => (
            <View
              style={{ gap: 5, flexDirection: 'row', alignItems: 'center' }}
            >
              <View style={{ flexGrow: 1 }}>
                <WorkoutSet index={index + 1} />
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
          getItemCount={() => sets.length}
          getItem={(_data, index) => sets[index]}
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
