import { toJS } from 'mobx';
import { View, StyleSheet, FlatList } from 'react-native';
import { FAB, ListItem } from '@rneui/themed';
import { observer } from 'mobx-react-lite';
import { Stack, useRouter } from 'expo-router';

import { AddNewFab } from '@components/UI';
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
        <AddNewFab url="/settings/exercises/create-or-update" />
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
});

export default observer(ExercisesScreen);
