import { Link } from 'expo-router';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Button } from '@rneui/themed';

const WorkoutsScreen = () => {
  return (
    <View>
      <Text>TestView</Text>
      <Link href={{ pathname: '/workouts/edit-workout-exercise' }}>
        Track Workout
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  list: {
    flex: 1,
    width: '100%',
    display: 'flex',
    borderTopWidth: 1,
  },
  content: {
    gap: 1,
    fontSize: '12',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    verticalAlign: 'middle',
    justifyContent: 'space-between',
  },
});

export default WorkoutsScreen;
