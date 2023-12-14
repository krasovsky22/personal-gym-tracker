import { useEffect } from 'react';
import { Link } from 'expo-router';
import { observer } from 'mobx-react-lite';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { ListItem } from '@rneui/themed';

import { useExercisesStore } from '@hooks';

const renderRow = ({ item }) => {
  return (
    <View style={styles.list}>
      <ListItem
        bottomDivider
        //   onPress={() => item.link && router.push(item.link)}
      >
        <ListItem.Content style={styles.content}>
          {/* <Icon name={item.icon} size={30} /> */}
          <ListItem.Title>{item.exerciseName}</ListItem.Title>
          <ListItem.Subtitle>
            <View
              style={{
                alignItems: 'flex-end',
              }}
            >
              <Text>Total Sets: {item.totalSets}</Text>
              <Text>Max Weight: {item.maxWeight}</Text>
            </View>
          </ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    </View>
  );
};

const WorkoutsScreen = () => {
  useEffect(() => {
    loadWorkout();
  }, []);
  const { trackedExercisesSummary, loadWorkout } = useExercisesStore();

  console.log('summary', trackedExercisesSummary);
  return (
    <View style={styles.container}>
      <Text>TestView</Text>
      <FlatList
        data={trackedExercisesSummary}
        keyExtractor={(a) => a.exerciseId}
        renderItem={renderRow}
      />
      <Link href={{ pathname: '/workouts/edit-workout-exercise' }}>
        Track Workout
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
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

export default observer(WorkoutsScreen);
