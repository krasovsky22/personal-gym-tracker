import { toJS } from 'mobx';
import { View, StyleSheet, FlatList } from 'react-native';
import { useTheme, FAB, ListItem, Icon, Button } from '@rneui/themed';
import { observer } from 'mobx-react-lite';
import { Stack, useRouter } from 'expo-router';

import { AddNewFab } from '@components/UI';
import { AsyncButton } from '@components';
import useExercisesStore from '@hooks/useExercisesStore';

function ExercisesScreen() {
  const router = useRouter();
  const { theme } = useTheme();
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
              <ListItem.Swipeable
                bottomDivider
                leftWidth={80}
                rightWidth={90}
                minSlideWidth={40}
                leftContent={(action) => (
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
                    onPress={() =>
                      router.push(`/settings/exercises/${item.id}`)
                    }
                  />
                )}
                rightContent={(action) => (
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
