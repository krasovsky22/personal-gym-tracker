import { Input, ListItem } from '@rneui/themed';
import { useRouter } from 'expo-router';
import { Observer, observer } from 'mobx-react-lite';
import { useMemo, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { AsyncButton } from '@components';
import { AddNewFab } from '@components/UI';
import { useExercisesStore } from '@hooks';
import { WorkoutType } from '@models/Workout';

const WorkoutsScreen = () => {
  const [filterText, setFilterText] = useState<string>('');
  const router = useRouter();
  const { workouts, deleteWorkout } = useExercisesStore();

  const filteredWorkouts = useMemo(() => {
    if (!filterText.length) {
      return workouts;
    }

    return workouts.filter((workout) =>
      workout.name.toLowerCase().includes(filterText.toLowerCase())
    );
  }, [filterText, workouts.length]);

  const handleDeleteWorkout = async (workout: WorkoutType) => {
    await deleteWorkout(workout);
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
          data={filteredWorkouts}
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
                      handleDeleteWorkout(item);
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
