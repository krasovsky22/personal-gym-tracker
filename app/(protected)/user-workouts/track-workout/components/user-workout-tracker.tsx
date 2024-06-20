import { NewUserWorkoutType, UserWorkoutType } from '@models/UserWorkout';
import { StyleSheet, FlatList, View, Text } from 'react-native';

type UserWorkoutTrackerType = {
  userWorkout: UserWorkoutType | NewUserWorkoutType;
};
const UserWorkoutTracker = ({ userWorkout }: UserWorkoutTrackerType) => {
  console.log('user workout', userWorkout);
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <FlatList
          data={userWorkout.userWorkoutExercises}
          renderItem={({ item }) => (
            <View style={styles.userWorkoutContainer}>
              <View style={styles.userWorkoutContainerTitle}>
                <Text>{item.exercise?.name}</Text>
                <Text>Placeholder</Text>
              </View>

              <View style={styles.userWorkoutSetsHeader}>
                <Text style={styles.userWorkoutSetHeaderText}>SET</Text>
                <Text style={styles.userWorkoutSetHeaderText}>PREV</Text>
                <Text style={styles.userWorkoutSetHeaderText}>REP</Text>
                <Text style={styles.userWorkoutSetHeaderText}>KG</Text>
                <Text style={styles.userWorkoutSetHeaderText}></Text>
              </View>
              <FlatList
                data={item.userWorkoutExerciseSets}
                renderItem={({ item: exerciseSet }) => (
                  <View style={styles.setRowContainer}>
                    <Text>Weight: </Text>
                    <Text>{exerciseSet.weight}</Text>
                    <Text>Repeats: </Text>
                    <Text>{exerciseSet.repeats}</Text>
                  </View>
                )}
              />
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
  titleContainer: {
    flex: 1,
  },
  userWorkoutContainer: {
    backgroundColor: 'orange',
  },

  userWorkoutContainerTitle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  userWorkoutSetsHeader: {
    backgroundColor: 'green',
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    textAlign: 'center',
  },

  setRowContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'pink',
    justifyContent: 'space-evenly',
  },

  userWorkoutSetHeaderText: {
    flex: 1,
  },
});
