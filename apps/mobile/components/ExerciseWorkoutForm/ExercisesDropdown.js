import useExercisesStore from '@hooks/useExercisesStore';
import { Divider } from '@rneui/themed';
import { observer } from 'mobx-react-lite';
import { useMemo } from 'react';
import { useController } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';

const ExercisesDropdown = ({ name }) => {
  const { field, fieldState } = useController({
    name: name,
  });
  const { exercises } = useExercisesStore();

  const hasError = fieldState.error;

  const exercisesOptions = useMemo(() => {
    return exercises.map((exercise) => ({
      key: exercise.id,
      value: exercise.name,
    }));
  }, [exercises.length]);

  return (
    <View>
      <Text>Exercise</Text>
      <SelectList data={exercisesOptions} setSelected={field.onChange} />
      {hasError && <Text>ERROR: {fieldState.error.message}</Text>}
      <Divider />
    </View>
  );
};

const styles = StyleSheet.create({});
export default observer(ExercisesDropdown);
