import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  ListItem,
  lightColors,
  Text,
  Card,
  useTheme,
} from '@rneui/themed';
import { usePathname } from 'expo-router';
import { Observer, observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import * as z from 'zod';

import { AsyncButton } from '@components';
import { useExercisesStore } from '@hooks';
import TrackWorkoutDialog from './components/track-workout-dialog';

const ROUTE_PATH = '/workouts';

const schema = z.object({
  workout: z.string().min(1, { message: 'Workout is Required' }),
});

const WorkoutsScreen = () => {
  const pathName = usePathname();
  const { theme } = useTheme();
  const { workouts, userWorkouts, loadUserWorkouts } = useExercisesStore();

  const { ...methods } = useForm({
    defaultValues: {
      workout: '',
    },
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (pathName === ROUTE_PATH) {
      loadUserWorkouts();
    }
  }, [pathName]);

  //   const onSubmit = async (formData) => {
  //     console.log(JSON.stringify(formData, null, 2));
  //     const { workout } = formData;

  //     await createUserWorkout(workout);

  //     console.log('created');
  //   };

  //   const onError = (errors, e) => {
  //     return console.log('ERRORS ', JSON.stringify(errors, null, 2));
  //   };

  //   useEffect(() => {
  //     loadWorkout();
  //   }, []);
  //   const { loadWorkout } = useExercisesStore();

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
                    containerStyle={{ backgroundColor: theme.colors.white }}
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
  //   createWorkoutContainer: {
  //     flex: 1,
  //     gap: 1,
  //     zIndex: 1,
  //   },

  workoutCardContainer: {},

  //   list: {
  //     flex: 1,
  //     width: '100%',
  //     display: 'flex',
  //     borderTopWidth: 1,
  //     borderColor: lightColors.greyOutline,
  //   },
  //   list: {
  //     flex: 1,
  //     width: '100%',
  //     display: 'flex',
  //     borderTopWidth: 1,
  //   },
  //   content: {
  //     gap: 1,
  //     fontSize: '12',
  //     display: 'flex',
  //     flexDirection: 'row',
  //     alignItems: 'center',
  //     verticalAlign: 'middle',
  //     justifyContent: 'space-between',
  //   },
});

export default observer(WorkoutsScreen);
