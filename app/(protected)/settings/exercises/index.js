import { toJS } from 'mobx';
import { useState, useMemo } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useTheme, FAB, ListItem, Icon, Button, Input } from '@rneui/themed';
import { observer } from 'mobx-react-lite';
import { Stack, useRouter } from 'expo-router';

import { AddNewFab } from '@components/UI';
import { AsyncButton } from '@components';
import useExercisesStore from '@hooks/useExercisesStore';

function ExercisesScreen() {
  const [filterText, setFilterText] = useState('');
  const router = useRouter();
  const { theme } = useTheme();
  const { exercises, deleteExercise } = useExercisesStore();

  const filteredExercises = useMemo(() => {
    const exercisesObjects = toJS(exercises);

    if (!filterText.length) {
      return exercisesObjects;
    }

    return exercisesObjects.filter((exercise) =>
      exercise.name.includes(filterText)
    );
  }, [filterText, exercises.length]);

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
          data={filteredExercises}
          keyExtractor={(a) => a.id}
          renderItem={({ item }) => (
            <ListItem.Swipeable
              bottomDivider
              leftWidth={80}
              rightWidth={90}
              minSlideWidth={40}
              leftContent={() => (
                <Button
                  containerStyle={{
                    flex: 1,
                    justifyContent: 'center',
                    backgroundColor: theme.colors.warning,
                  }}
                  type="clear"
                  icon={{
                    name: 'pencil',
                    type: 'material-community',
                  }}
                  onPress={() => router.push(`/settings/exercises/${item.id}`)}
                />
              )}
              rightContent={() => (
                <AsyncButton
                  containerStyle={{
                    flex: 1,
                    justifyContent: 'center',
                    backgroundColor: theme.colors.error,
                  }}
                  type="clear"
                  icon={{ name: 'delete-outline' }}
                  onPress={() => {
                    return deleteExercise(item.id);
                  }}
                />
              )}
            >
              <Icon name="label-important-outline" type="material" />
              <ListItem.Content>
                <ListItem.Title>{item.name}</ListItem.Title>
                <ListItem.Subtitle>Placeholder Description</ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem.Swipeable>
          )}
        />
        <AddNewFab url="/settings/exercises/new" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    display: 'flex',
    flex: 1,
  },

  list: {
    flexGrow: 1,
  },
});

export default observer(ExercisesScreen);
