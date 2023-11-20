import { useState } from 'react';
import { Button, Divider, lightColors, Icon } from '@rneui/themed';
import { View, Text, StyleSheet, VirtualizedList } from 'react-native';

import { ExercisesDropdown, WorkoutSet } from '@components';

const getItem = (_data, index) => {
  console.log('asdasd', _data, index);
  return {
    id: Math.random().toString(12).substring(0),
    title: `Item ${index + 1}`,
  };
};

// const getItemCount = (_data) => 3;
const TEMP_SETS = [{ id: 1 }, { id: 2 }, { id: 3 }];

function WorkoutsScreen() {
  const [sets, setSets] = useState(TEMP_SETS);

  const removeSetById = (id) => {
    const newSets = sets.filter((set) => set.id !== id);
    setSets(newSets);
  };

  return (
    <View style={styles.container}>
      <Text>Workouts Page</Text>
      <ExercisesDropdown />
      <Divider />
      <VirtualizedList
        initialNumToRender={sets.length}
        data={TEMP_SETS}
        renderItem={({ index, item }) => (
          <View style={{ gap: 5, flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flexGrow: 1 }}>
              <WorkoutSet index={index + 1} />
            </View>
            <Button
              size="sm"
              type="clear"
              title="Remove"
              onPress={() => removeSetById(item.id)}
            >
              <Icon name="delete" color="error" />
            </Button>
          </View>
        )}
        keyExtractor={(item) => item.id}
        getItemCount={() => sets.length}
        getItem={(_data, index) => sets[index]}
      />
      <Button title="Add Set" onPress={() => setTotalSets(totalSets + 1)} />
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
    borderColor: lightColors.greyOutline,
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
