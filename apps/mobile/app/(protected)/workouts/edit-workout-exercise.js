import { useState } from 'react';
import { Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Tab, TabView, Text } from '@rneui/themed';

import { useExercisesStore } from '@hooks';
import { ExerciseWorkoutForm } from '@components';

const TEMP_SETS = [
  { id: 1, weight: '', repeats: '' },
  { id: 2, weight: '', repeats: '' },
  { id: 3, weight: '', repeats: '' },
];

function EditWorkoutExerciseScreen() {
  const [index, setIndex] = useState(0);
  const { saveExerciseSets } = useExercisesStore();
  const handleSubmit = async (exerciseWorkout) => {
    console.log('handle submit', exerciseWorkout);

    return saveExerciseSets(exerciseWorkout);
  };

  //   const onSubmit = async (formData) => {
  //     const { exercise, sets } = formData;
  //     const exerciseSets = formData.sets.map((set, index) => ({
  //       ...set,
  //       set_order: index,
  //       exercise_id: exercise,
  //     }));
  //     return saveExerciseSets(exerciseSets);
  //   };

  return (
    <>
      <Stack.Screen
        options={{ headerShown: true, title: 'Track New Workout' }}
      />
      <View style={styles.container}>
        <Tab
          scrollable
          value={index}
          onChange={(e) => setIndex(e)}
          indicatorStyle={{
            backgroundColor: 'white',
            height: 3,
          }}
          variant="primary"
        >
          <Tab.Item
            title="Recent"
            titleStyle={{ fontSize: 12 }}
            icon={{ name: 'timer', type: 'ionicon', color: 'white' }}
          />
          <Tab.Item
            title="favorite"
            titleStyle={{ fontSize: 12 }}
            icon={{ name: 'heart', type: 'ionicon', color: 'white' }}
          />
          <Tab.Item
            title="cart"
            titleStyle={{ fontSize: 12 }}
            icon={{ name: 'cart', type: 'ionicon', color: 'white' }}
          />
        </Tab>
        <TabView value={index} onChange={setIndex} animationType="spring">
          <TabView.Item style={{ backgroundColor: 'red', width: '100%' }}>
            <ExerciseWorkoutForm
              handleSubmitForm={handleSubmit}
              sets={TEMP_SETS}
            />
          </TabView.Item>
          <TabView.Item style={{ backgroundColor: 'blue', width: '100%' }}>
            <ExerciseWorkoutForm
              handleSubmitForm={handleSubmit}
              sets={TEMP_SETS}
            />
          </TabView.Item>
          <TabView.Item style={{ backgroundColor: 'green', width: '100%' }}>
            <ExerciseWorkoutForm
              handleSubmitForm={handleSubmit}
              sets={TEMP_SETS}
            />
          </TabView.Item>
        </TabView>
      </View>
    </>
  );
}

export default EditWorkoutExerciseScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
});
