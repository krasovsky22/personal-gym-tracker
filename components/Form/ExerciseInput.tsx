import { StyleSheet, Text, View } from 'react-native';
import { observer } from 'mobx-react-lite';
import { useController, useFormContext } from 'react-hook-form';

import { ExercisesDialog } from '@components/Dialogs';
import useExercisesStore from '@hooks/useExercisesStore';
import HiddenInput, { HiddenInputType } from './HiddenInput';
import { Icon, useTheme } from '@rneui/themed';

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

      <View style={styles.exerciseContainer}>
        <View style={styles.exerciseDescriptionContainer}>
          {exercise && (
            <>
              <Icon
                name="weight-lifter"
                type="material-community"
                color="#517fa4"
                size={50}
              />
              <Text style={{ flex: 5, textAlign: 'center', fontSize: 20 }}>
                {exercise?.name}
              </Text>
            </>
          )}
        </View>

        {error?.message && (
          <Text style={[styles.errorText, { color: theme.colors.error }]}>
            {error.message}
          </Text>
        )}
        <ExercisesDialog
          title="Select Exercise"
          handleSelect={(exercise) => {
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

  exerciseContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },

  exerciseDescriptionContainer: {
    flexDirection: 'row',
    gap: 1,
    flex: 1,
    height: 40,
    justifyContent: 'space-between',
    marginHorizontal: 10,
    alignItems: 'center',
  },
});

export default observer(ExercisesInput);
