import { StyleSheet, Text, View } from 'react-native';
import { observer } from 'mobx-react-lite';
import { useController } from 'react-hook-form';

import { ExercisesDialog } from '@components/Dialogs';
import useExercisesStore from '@hooks/useExercisesStore';
import HiddenInput, { HiddenInputType } from './HiddenInput';
import { useTheme } from '@rneui/themed';

type ExercisesInputType = HiddenInputType & {
  name: string;
  defaultValue?: string;
};
function ExercisesInput(props: ExercisesInputType) {
  const { theme } = useTheme();
  const { name, defaultValue } = props;
  const { getExerciseById } = useExercisesStore();

  const {
    field,
    fieldState: { error },
  } = useController({ name, defaultValue });

  const exercise = getExerciseById(field.value);

  return (
    <View>
      <HiddenInput {...props} />

      {exercise && (
        <Text>
          {exercise?.id}-{exercise?.name}
        </Text>
      )}
      {error?.message && (
        <Text style={[styles.errorText, { color: theme.colors.error }]}>
          {error.message}
        </Text>
      )}
      <ExercisesDialog
        title="Select Exercise"
        handleSelect={(exercise) => {
          console.log('selected', exercise);
          return field.onChange(exercise.id);
        }}
      >
        <Text
          style={[
            styles.selectExerciseButton,
            {
              backgroundColor: error?.message
                ? theme.colors.error
                : theme.colors.warning,
            },
          ]}
        >
          Select Exercise
        </Text>
      </ExercisesDialog>
    </View>
  );
}

const styles = StyleSheet.create({
  selectExerciseButton: {
    flex: 1,
    width: '100%',
    textAlign: 'center',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },

  errorText: {
    textAlign: 'center',
  },
});

export default observer(ExercisesInput);
