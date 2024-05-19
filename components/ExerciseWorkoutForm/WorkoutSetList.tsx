import { Button, Icon, useTheme } from '@rneui/themed';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { VirtualizedList, StyleSheet, Text, View } from 'react-native';

import WorkoutSet from './WorkoutSet';

const WorkoutSetList = () => {
  const { theme } = useTheme();
  //   const { control } = useFormContext();

  const {
    fields: setsField,
    append,
    remove,
  } = useFieldArray({
    name: 'sets',
  });

  const addSet = () => {
    append({ weight: '', repeats: '' });
  };
  return (
    <View>
      <VirtualizedList
        initialNumToRender={setsField.length}
        getItemCount={() => setsField.length}
        getItem={(_data, index) => setsField[index]}
        // data={setsField}
        renderItem={({ item, index }) => (
          <View style={{ gap: 5, flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flexGrow: 1 }}>
              <WorkoutSet id={index} index={index + 1} />
            </View>
            <Button
              size="sm"
              type="clear"
              title="Remove"
              onPress={() => remove(index)}
            >
              <Icon name="delete" color={theme.colors.error} />
            </Button>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
      <Button title="Add Set" onPress={addSet} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default WorkoutSetList;
