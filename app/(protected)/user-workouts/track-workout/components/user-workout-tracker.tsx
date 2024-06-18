import { UserWorkoutType } from '@models/UserWorkout';
import { StyleSheet, FlatList, View, Text } from 'react-native';

type UserWorkoutTrackerType = {
  userWorkout: UserWorkoutType;
};
const UserWorkoutTracker = ({ userWorkout }: UserWorkoutTrackerType) => {
  console.log('user workout', userWorkout);
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <FlatList
          data={userWorkout.userWorkoutExercises}
          keyExtractor={(a) => a.id!}
          renderItem={({ item }) => (
            <View>
              <Text>{item.exercise?.name}</Text>
              {/* <FlatList
                data={item.userWorkoutExerciseSets}
                renderItem={({ item: exerciseSet }) => (
                  <View style={{ flex: 1 }}>
                    <Text>Weight: </Text>
                    <Text>{exerciseSet.weight}</Text>
                    <Text>Repeats: </Text>
                    <Text>{exerciseSet.repeats}</Text>
                  </View>
                )}
              /> */}
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default UserWorkoutTracker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {},
});
