import { useEffect } from 'react';
import { Link } from 'expo-router';
import * as z from 'zod';
import { usePathname } from 'expo-router';
import { observer } from 'mobx-react-lite';
import { zodResolver } from '@hookform/resolvers/zod';
import { SafeAreaView, View, Text, StyleSheet, FlatList } from 'react-native';
import { ListItem, Button } from '@rneui/themed';
import { FormProvider, useForm, useFieldArray } from 'react-hook-form';

import { useExercisesStore } from '@hooks';
import { AsyncButton } from '@components';
import WorkoutsDropdown from './components/WorkoutsDropdown';

const ROUTE_PATH = '/workouts';

// const renderRow = ({ item }) => {
//   return (
//     <SafeAreaView style={styles.list}>
//       <ListItem
//         bottomDivider
//         //   onPress={() => item.link && router.push(item.link)}
//       >
//         <ListItem.Content style={styles.content}>
//           <ListItem.Title>{item.exerciseName}</ListItem.Title>
//           <ListItem.Subtitle>
//             <View
//               style={{
//                 alignItems: 'flex-end',
//               }}
//             >
//               <Text>Total Sets: {item.totalSets}</Text>
//               <Text>Max Weight: {item.maxWeight}</Text>
//             </View>
//           </ListItem.Subtitle>
//         </ListItem.Content>
//         <ListItem.Chevron />
//       </ListItem>
//     </SafeAreaView>
//   );
// };

const schema = z.object({
  workout: z.string().min(1, { message: 'Workout is Required' }),
});

const WorkoutsScreen = () => {
  const pathName = usePathname();
  const { loadUserWorkouts, createUserWorkout } = useExercisesStore();
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

  const onSubmit = async (formData) => {
    console.log(JSON.stringify(formData, null, 2));
    const { workout } = formData;

    await createUserWorkout(workout);

    console.log('created');
  };

  const onError = (errors, e) => {
    return console.log('ERRORS ', JSON.stringify(errors, null, 2));
  };

  //   useEffect(() => {
  //     loadWorkout();
  //   }, []);
  //   const { loadWorkout } = useExercisesStore();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <Text>1</Text>
      </View>
      <View style={styles.createWorkoutContainer}>
        <FormProvider {...methods}>
          <WorkoutsDropdown name="workout" />
          <AsyncButton
            color="success"
            title="Create"
            onPress={methods.handleSubmit(onSubmit, onError)}
            containerStyle={{
              width: '100%',
              zIndex: 1,
              elevation: 3,
            }}
          />
        </FormProvider>
      </View>
      {/* <FlatList
        data={trackedExercisesSummary}
        keyExtractor={(a) => a.exerciseId}
        renderItem={renderRow}
      /> */}
      {/* <Link href={{ pathname: '/workouts/edit-workout-exercise' }}>
        <Button color="error" title="Track Workout" />
      </Link> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
  },
  topContainer: {
    flex: 1,
    backgroundColor: 'pink',
  },
  createWorkoutContainer: {
    flex: 1,
    gap: 1,
    zIndex: 1,
    backgroundColor: 'orange',
  },
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
