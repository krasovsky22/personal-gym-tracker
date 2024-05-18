import { useEffect, useState } from 'react';
import { Button, Input } from '@rneui/themed';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';

import { AsyncButton } from '@components';
import { useExercisesStore } from '@hooks';

function AddExerciseScreen() {
  const { exercise_id } = useLocalSearchParams();
  const { saveExercise, getExerciseById } = useExercisesStore();
  const [name, setName] = useState('');

  const handleSave = async () => {
    await saveExercise({
      id: exercise_id,
      name,
    });
    return router.back();
  };

  useEffect(() => {
    if (exercise_id) {
      const exercise = getExerciseById(exercise_id);
      if (exercise) {
        setName(exercise.name);
      }
    }
  }, [exercise_id]);

  const router = useRouter();

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Exercises Management' }} />
      <View style={styles.list}>
        <Text>ExercisesScreen</Text>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Name</Text>
          <Input
            placeholder="Exercise Name"
            onChangeText={setName}
            value={name}
          ></Input>
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <AsyncButton color="success" title="Save" onPress={handleSave} />
        <Button
          color="error"
          title="Cancel"
          onPress={() => router.back()}
        ></Button>
      </View>
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

export default AddExerciseScreen;
