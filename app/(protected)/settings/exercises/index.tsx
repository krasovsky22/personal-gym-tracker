import { useRouter } from 'expo-router';
import { useState, useMemo } from 'react';
import { Observer, observer } from 'mobx-react-lite';
import { View, StyleSheet, FlatList } from 'react-native';
import { useTheme, ListItem, Button, Input } from '@rneui/themed';
import { default as MaterialIcon } from 'react-native-vector-icons/MaterialCommunityIcons';

import { AddNewFab, Avatar } from '@components/UI';
import { AsyncButton, EmptyState } from '@components';
import useExercisesStore from '@hooks/useExercisesStore';

function ExercisesScreen() {
  const [filterText, setFilterText] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { theme } = useTheme();
  const { sortedExercises, deleteExercise, loadExercises } =
    useExercisesStore();

  console.log(sortedExercises);

  const filteredExercises = useMemo(() => {
    if (!filterText.length) {
      return sortedExercises;
    }

    return sortedExercises.filter((exercise) =>
      exercise.name.includes(filterText)
    );
  }, [filterText, sortedExercises, sortedExercises.length]);

  const handleOnRefresh = async () => {
    setIsLoading(true);
    await loadExercises();
    setIsLoading(false);
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
          refreshing={isLoading}
          onRefresh={handleOnRefresh}
          data={filteredExercises}
          keyExtractor={(a) => a.id!}
          ListEmptyComponent={<EmptyState />}
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
                      icon={<MaterialIcon name="pencil" size={30} />}
                      type="clear"
                      onPress={() =>
                        router.push(`/settings/exercises/${item.id}`)
                      }
                    ></Button>
                  )}
                  rightContent={() => (
                    <AsyncButton
                      containerStyle={{
                        flex: 1,
                        justifyContent: 'center',
                        backgroundColor: theme.colors.error,
                      }}
                      type="clear"
                      icon={<MaterialIcon name="delete-outline" size={30} />}
                      onPress={() => {
                        return deleteExercise(item.id);
                      }}
                    ></AsyncButton>
                  )}
                >
                  <Avatar rounded uri={item.icon_url} />
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
