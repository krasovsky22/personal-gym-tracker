import useExercisesStore from '@hooks/useExercisesStore';
import { Divider } from '@rneui/themed';
import { observer } from 'mobx-react-lite';
import { useCallback, useEffect, useMemo } from 'react';
import { useController } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';
import MultiSelect from 'react-native-multiple-select';

const ExercisesDropdown = ({ name }) => {
  const { field, fieldState } = useController({
    name: name,
  });
  const { exercises, loadExercises } = useExercisesStore();

  useEffect(() => {
    loadExercises();
  }, []);

  const hasError = fieldState.error;

  const exercisesOptions = useMemo(() => {
    return exercises.map((exercise) => ({
      id: exercise.id,
      name: exercise.name,
    }));
  }, [exercises.length]);

  const handleOnExerciseChange = useCallback((selectedOptions) => {
    field.onChange(selectedOptions?.[0] ?? null);
  }, []);

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
      {hasError && <Text>ERROR: {fieldState.error.message}</Text>}
      <Divider />
    </View>
  );
};

const styles = StyleSheet.create({});
export default observer(ExercisesDropdown);
