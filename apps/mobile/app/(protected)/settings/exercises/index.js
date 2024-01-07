import { toJS } from 'mobx';
import { View, StyleSheet, FlatList, TouchableOpacity, Text } from 'react-native';
import { Button, ListItem } from '@rneui/themed';
import { observer } from 'mobx-react-lite';
import { Stack, useRouter } from 'expo-router';

import { AsyncButton } from '@components';
import useExercisesStore from '@hooks/useExercisesStore';

function ExercisesScreen() {
  const router = useRouter();
  const { exercises, deleteExercise } = useExercisesStore();

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Exercises Management' }} />
      <View style={styles.list}>
        <FlatList
          data={toJS(exercises)}
          keyExtractor={(a) => a.id}
          renderItem={({ item }) => (
            <View>
              <ListItem bottomDivider>
                <ListItem.Content>
                  <ListItem.Title>{item.name}</ListItem.Title>
                </ListItem.Content>
                <AsyncButton
                  color="error"
                  title="Delete"
                  onPress={() => {
                    return deleteExercise(item.id);
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
        <TouchableOpacity
          onPress={() => router.push('/settings/exercises/create-or-update')}
          style={styles.fab}
        >
          <Text style={styles.fabIcon}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
  },

  list: {
    flexGrow: 1,
  },

  fab: {
    position: 'absolute',
    width: 25,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    backgroundColor: '#03A9F4',
    borderRadius: 15,
    elevation: 8,
  },
  fabIcon: {
    fontSize: 15,
    color: 'white',
  },
});

export default observer(ExercisesScreen);
