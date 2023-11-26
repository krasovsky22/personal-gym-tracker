import useExercisesStore from '@hooks/useExercisesStore';
import { Divider } from '@rneui/themed';
import { observer } from 'mobx-react-lite';
import { useCallback, useEffect, useMemo } from 'react';
import { useController } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';
import MultiSelect from 'react-native-multiple-select';

const ExercisesDropdown = () => {
  const { field } = useController({
    name: 'exercise',
    rules: [],
    defaultValue: null,
  });
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

  const handleOnExerciseChange = useCallback((selectedOptions) => {
    field.onChange(selectedOptions?.[0] ?? null);
  }, []);

  console.log('field', exercises, exercisesOptions);

  return (
    <View>
      <Text>Exercise</Text>
      <MultiSelect
        single
        uniqueKey="id"
        selectedItems={[field.value]}
        items={exercisesOptions}
        onSelectedItemsChange={handleOnExerciseChange}
      />
      <Divider />
    </View>
  );
};

const styles = StyleSheet.create({});
export default observer(ExercisesDropdown);
