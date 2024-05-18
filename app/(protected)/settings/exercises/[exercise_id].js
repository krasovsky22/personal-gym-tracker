import { View, Text, StyleSheet } from 'react-native';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';


import ExerciseForm from './components/exercise-form';

function ExerciseScreen() {
  const { exercise_id } = useLocalSearchParams();

  console.log(exercise_id);
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Edit Exercise' }} />
      <ExerciseForm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
  },

  formGroup: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },

  label: {
    fontWeight: 'bold',
    fontSize: 20,
    lineHeight: 20,
  },

  list: {
    flexGrow: 1,
  },

  bottomContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});

export default ExerciseScreen;
