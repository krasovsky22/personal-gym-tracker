import { NumberInput, ExerciseInput } from '@components/Form';
import { Icon } from '@rneui/base';
import { Button, useTheme } from '@rneui/themed';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

type WorkoutExerciseFieldType = {
  index: number;
  totalExercises: number;
  onRemoveClick: (index: number) => void;
  onSortingClick: (direction: 'UP' | 'DOWN', index: number) => void;
};

function WorkoutExerciseField({
  index,
  onRemoveClick,
  totalExercises,
  onSortingClick,
}: WorkoutExerciseFieldType) {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.sortingContainer}>
        {index > 0 && (
          <TouchableOpacity onPress={() => onSortingClick('UP', index)}>
            <Icon name={'arrow-up-bold'} type={'material-community'} />
          </TouchableOpacity>
        )}
        {index < totalExercises && (
          <TouchableOpacity onPress={() => onSortingClick('DOWN', index)}>
            <Icon name={'arrow-down-bold'} type={'material-community'} />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.exerciseContainer}>
        <ExerciseInput name={`exercises.${index}.exercise_id`} />

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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

          <View style={styles.deleteButtonContainer}>
            <TouchableOpacity onPress={() => onRemoveClick(index)}>
              <Icon
                name="delete"
                type="material-community"
                color={theme.colors.error}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    marginBottom: 10,
  },

  sortingContainer: {
    justifyContent: 'space-evenly',
  },

  exerciseContainer: {
    flex: 1,
  },

  deleteButtonContainer: {},

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
