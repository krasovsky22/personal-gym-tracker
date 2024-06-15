import { Button, Card, Text, useTheme } from '@rneui/themed';
import { Observer, observer } from 'mobx-react-lite';
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';

import { useExercisesStore } from '@hooks';
import TrackWorkoutDialog from './components/track-workout-dialog';

const WorkoutsScreen = () => {
  const { theme } = useTheme();
  const { workouts } = useExercisesStore();

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text h2>Start Workout</Text>
      </View>
      <View style={styles.topContainer}>
        <Text h4>Quick Start</Text>
        <Button title="Start an empty Workout" />
      </View>
      <View style={styles.userWorkoutsTemplatesContainer}>
        <FlatList
          data={workouts}
          keyExtractor={(a) => a.id!}
          renderItem={({ item }) => (
            <Observer>
              {() => (
                <TrackWorkoutDialog workout={item}>
                  <Card
                    containerStyle={{
                      backgroundColor: theme.colors.white,
                      marginHorizontal: 0,
                    }}
                  >
                    <Card.Title h4>{item.name}</Card.Title>
                    <Card.Divider />
                    <View style={styles.workoutCardContainer}>
                      {item.workoutExercises.map((workoutExercise) => (
                        <Text key={workoutExercise.id}>
                          {workoutExercise.exercise?.name} x
                          {workoutExercise.sets_count}
                        </Text>
                      ))}
                    </View>
                  </Card>
                </TrackWorkoutDialog>
              )}
            </Observer>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
    gap: 10,
  },
  topContainer: {
    flex: 1,
  },

  userWorkoutsTemplatesContainer: {
    flex: 8,
  },

  workoutCardContainer: {},
});

export default observer(WorkoutsScreen);
