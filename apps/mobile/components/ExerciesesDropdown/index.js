import { useMemo, useEffect, useState } from 'react';
import MultiSelect from 'react-native-multiple-select';
import { Divider, Input } from '@rneui/themed';
import { View, Text, StyleSheet } from 'react-native';
import useExercisesStore from '@hooks/useExercisesStore';

const ExercisesDropdown = () => {
  const [selectedExerciseId, setSelectedExerciseId] = useState([]);
  const { exercises, loadExercises } = useExercisesStore();

  useEffect(() => {
    loadExercises();
  }, []);

  const exercisesOptions = useMemo(() => {
    return exercises.map((exercise) => ({
      id: exercise.id,
      name: exercise.name,
    }));
  }, [exercises.length]);

  console.log(selectedExerciseId);
  return (
    <View>
      <Text>Exercise</Text>
      <MultiSelect
        single
        uniqueKey="id"
        selectedItems={selectedExerciseId}
        items={exercisesOptions}
        onSelectedItemsChange={setSelectedExerciseId}
      />
      <Divider />
    </View>
  );
};

const styles = StyleSheet.create({
  setContainer: {
    flexDirection: 'row',
    gap: 10,
    padding: 5,
  },
  inputGroup: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    gap: 10,
  },

  label: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
export default ExercisesDropdown;
