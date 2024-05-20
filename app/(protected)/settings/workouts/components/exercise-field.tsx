import { NumberInput, ExerciseInput } from '@components/Form';
import { StyleSheet, View } from 'react-native';

type WorkoutExerciseFieldType = {
  index: number;
};

function WorkoutExerciseField({ index }: WorkoutExerciseFieldType) {
  return (
    <View style={styles.container}>
      <ExerciseInput name={`exercises.${index}.exercise_id`} />

      <NumberInput
        name={`exercises.${index}.setsCount`}
        label="Total Sets"
        maxLength={2}
        containerStyle={{
          width: 45,
        }}
        rules={{ required: 'Total Sets is required!' }}
        containerStyles={styles.numberInputContainer}
        labelStyles={styles.numberLabel}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    marginBottom: 10,
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
