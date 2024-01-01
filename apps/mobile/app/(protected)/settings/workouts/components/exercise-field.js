import { NumberInput } from '@components/Form';
import { StyleSheet, View } from 'react-native';

import ExercisesDropdown from '@components/UI/ExercisesDropdown';

const WorkoutExerciseField = ({ id, index }) => {
  return (
    <View style={styles.container}>
      <ExercisesDropdown name={`exercises.${index}.exercise`} />

      <NumberInput
        name={`exercises.${index}.setsCount`}
        label="Total Sets"
        maxLength={2}
        containerStyle={{
          width: 45,
        }}
        defaultValue={3}
        rules={{ required: 'Total Sets is required!' }}
        containerStyles={styles.numberInputContainer}
        labelStyles={styles.numberLabel}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // gap: 10,
  },

  numberLabel: {
    flexGrow: 1,
  },
  numberInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
});

export default WorkoutExerciseField;
