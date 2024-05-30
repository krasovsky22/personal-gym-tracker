import { useState, useMemo } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { useTheme, ListItem, Button, Input } from '@rneui/themed';
import { Observer, observer } from 'mobx-react-lite';
import { useRouter } from 'expo-router';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AddNewFab } from '@components/UI';
import { AsyncButton } from '@components';
import useExercisesStore from '@hooks/useExercisesStore';

function ExercisesScreen() {
  const [filterText, setFilterText] = useState<string>('');
  const router = useRouter();
  const { theme } = useTheme();
  const { sortedExercises, deleteExercise } = useExercisesStore();

  const filteredExercises = useMemo(() => {
    if (!filterText.length) {
      return sortedExercises;
    }

    return sortedExercises.filter((exercise) =>
      exercise.name.includes(filterText)
    );
  }, [filterText, sortedExercises]);

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
          ListEmptyComponent={
            <View>
              <Text>No Exercises found</Text>
            </View>
          }
          renderItem={({ item }) => (
            <Observer>
              {() => (
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
                      icon={<Icon name="pencil" size={30} />}
                      onPress={() =>
                        router.push(`/settings/exercises/${item.id}`)
                      }
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
                      icon={<Icon name="delete-outline" size={30} />}
                      onPress={() => {
                        return deleteExercise(item.id);
                      }}
                    />
                  )}
                >
                  <Icon name="label-important-outline" />
                  <ListItem.Content>
                    <ListItem.Title>{item.name}</ListItem.Title>
                    <ListItem.Subtitle>
                      Placeholder Description
                    </ListItem.Subtitle>
                  </ListItem.Content>
                  <ListItem.Chevron />
                </ListItem.Swipeable>
              )}
            </Observer>
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
    flex: 1,
  },
});

export default observer(ExercisesScreen);
