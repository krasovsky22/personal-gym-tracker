import { useExercisesStore } from '@hooks';
import { Card } from '@rneui/themed';
import { Link } from 'expo-router';
import {
  Platform,
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';

function HomeScreen() {
  const { userWorkouts } = useExercisesStore();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.newsContainer}>
        <Text>Home Screen</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <Text>Previous Workouts</Text>
        <View style={{ flex: 1, width: '100%' }}>
          <FlatList
            data={userWorkouts}
            keyExtractor={(a) => a.id}
            renderItem={({ item }) => (
              <Card>
                <Card.Title>{item.workout?.name}</Card.Title>
                <Text>Completed - {item.workoutDateString}</Text>
                <Text>Exercises - {item.userWorkoutExercises.length}</Text>
                <Link
                  href={`/(protected)/user-workouts/track-workout/edit?user_workout_id=${item.id}`}
                >
                  Edit
                </Link>
              </Card>
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'ios' ? 0 : 30,
    flex: 1,
  },

  newsContainer: {
    flex: 1,
  },

  buttonsContainer: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
    flexWrap: 'wrap',
  },
});

export default HomeScreen;
