import { toJS } from 'mobx';
import { useEffect, useState } from 'react';
import { Observer, observer } from 'mobx-react-lite';
import { View, StyleSheet, FlatList } from 'react-native';
import { Button, ListItem, Input } from '@rneui/themed';
import { Stack, useRouter } from 'expo-router';

import { AsyncButton } from '@components';
import { AddNewFab } from '@components/UI';
import { useExercisesStore } from '@hooks';
import { WorkoutType } from '@models/Workout';

const WorkoutsScreen = () => {
  const [filterText, setFilterText] = useState<string>('');
  const router = useRouter();
  const { workouts } = useExercisesStore();

  const deleteWorkout = (workout: WorkoutType) => {
    console.log('deleting workout', workout);
  };

  return (
    <View style={styles.container}>
      <View style={styles.list}>
        <View>
          <Input
            placeholder="Search"
            onChangeText={setFilterText}
            leftIcon={{ name: 'magnify', type: 'material-community' }}
          />
        </View>
        <FlatList
          data={workouts}
          renderItem={({ item }) => (
            <Observer>
              {() => (
                <ListItem bottomDivider>
                  <ListItem.Content>
                    <ListItem.Title>{item.name}</ListItem.Title>
                    <ListItem.Subtitle>
                      {item.workoutExercises.length} Exercises
                    </ListItem.Subtitle>
                  </ListItem.Content>
                  <AsyncButton
                    color="error"
                    title="Delete"
                    onPress={() => {
                      deleteWorkout(item);
                    }}
                  />
                  <AsyncButton
                    color="warning"
                    title="Edit"
                    onPress={() => router.push(`/settings/workouts/${item.id}`)}
                  />
                </ListItem>
              )}
            </Observer>
          )}
        />
      </View>

      <AddNewFab url="/settings/workouts/0" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
  },

  list: {
    flexGrow: 1,
  },

  listItemContent: {
    flex: 1,
    gap: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default observer(WorkoutsScreen);
