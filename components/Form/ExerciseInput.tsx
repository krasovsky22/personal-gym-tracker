import { observer } from 'mobx-react-lite';
import { useController } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';

import { Avatar } from '@components/UI';
import { Icon, useTheme } from '@rneui/themed';
import { ExercisesDialog } from '@components/Dialogs';
import useExercisesStore from '@hooks/useExercisesStore';
import HiddenInput, { HiddenInputType } from './HiddenInput';

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
    <View style={{ flex: 1 }}>
      <HiddenInput {...props} />

      <View style={styles.exerciseContainer}>
        <View style={styles.exerciseDescriptionContainer}>
          {exercise && (
            <>
              <Avatar rounded uri={exercise?.icon_url ?? ''} />
              <Text style={styles.exerciseNameText}>{exercise?.name}</Text>
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
          <Icon
            name="plus-box"
            type="material-community"
            size={40}
            color={error?.message ? theme.colors.error : theme.colors.warning}
          />
        </ExercisesDialog>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  selectExerciseButton: {
    // flex: 1,
    // width: '100%',
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

  exerciseNameText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },

  exerciseDescriptionContainer: {
    flexDirection: 'row',
    gap: 1,
    flex: 1,
    justifyContent: 'space-between',
    marginHorizontal: 10,
    alignItems: 'center',
  },
});

export default observer(ExercisesInput);
