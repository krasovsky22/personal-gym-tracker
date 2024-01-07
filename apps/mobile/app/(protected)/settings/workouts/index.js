import { toJS } from 'mobx';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { View, StyleSheet, FlatList } from 'react-native';
import { Button, ListItem } from '@rneui/themed';
import { Stack, useRouter } from 'expo-router';

import { AsyncButton } from '@components';
import { useExercisesStore } from '@hooks';

const WorkoutsScreen = () => {
  const router = useRouter();
  const { workouts, loadWorkouts } = useExercisesStore();

  useEffect(() => {
    loadWorkouts();
  }, []);

  const deleteWorkout = () => {};

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Workout Management' }} />
      <View style={styles.list}>
        <FlatList
          data={toJS(workouts)}
          keyExtractor={(a) => a.id}
          renderItem={({ item }) => (
            <View>
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
                  onPress={() =>
                    router.push(
                      `/settings/exercises/create-or-update?exercise_id=${item.id}`
                    )
                  }
                />
              </ListItem>
            </View>
          )}
        />
      </View>
      <View style={styles.bottomContainer}>
        <Button
          title="Create Workout"
          onPress={() => router.push('/settings/workouts/create-or-update')}
        ></Button>
      </View>
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

  bottomContainer: {
    backgroundColor: 'orange',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default observer(WorkoutsScreen);
