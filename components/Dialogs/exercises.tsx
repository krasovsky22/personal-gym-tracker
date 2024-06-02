import { View, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState, useMemo } from 'react';
import { Dialog, Input, ListItem } from '@rneui/themed';

import { useExercisesStore } from '@hooks';
import { ExerciseType } from '@models/Exercise';
import { useFormContext } from 'react-hook-form';

type ExercisesDialogProps = {
  title?: string;
  children: React.ReactNode;
  handleSelect: (exercise: ExerciseType) => unknown;
};

function ExercisesDialog({
  title,
  children,
  handleSelect,
}: ExercisesDialogProps) {
  const [filterText, setFilterText] = useState('');
  const [visible, setVisible] = useState(false);
  const { sortedExercises } = useExercisesStore();

  const { getValues } = useFormContext();
  const selectedExercises =
    getValues()['exercises']?.map((exercise: any) => exercise.exercise_id) ??
    [];

  const filteredExercises = useMemo(() => {
    if (!filterText.length) {
      return sortedExercises;
    }

    return sortedExercises.filter((exercise) =>
      exercise.name.includes(filterText)
    );
  }, [filterText, sortedExercises]);

  const toggleDialog = () => {
    setVisible(!visible);
  };

  const handleSelectExercise = (exercise: ExerciseType) => {
    handleSelect(exercise);
    toggleDialog();
  };

  console.log(selectedExercises);
  return (
    <View>
      <TouchableOpacity onPress={toggleDialog}>{children}</TouchableOpacity>

      <Dialog
        isVisible={visible}
        onBackdropPress={toggleDialog}
        overlayStyle={{
          width: '90%',
          height: '90%',
          top: 0,
          //   overflow: 'scroll',
        }}
      >
        {title && <Dialog.Title title="Select Title" />}
        <View>
          <Input
            placeholder="Search"
            onChangeText={setFilterText}
            leftIcon={{ name: 'magnify', type: 'material-community' }}
          />
        </View>
        <ScrollView>
          {filteredExercises.map((exercise) => (
            <ListItem
              key={exercise.id}
              disabled={selectedExercises.includes(exercise.id)}
              disabledStyle={{ opacity: 0.5 }}
              containerStyle={{
                borderRadius: 8,
              }}
              onPress={() => handleSelectExercise(exercise)}
            >
              <ListItem.Content>
                <ListItem.Title style={{ fontWeight: '700' }}>
                  {exercise.name}
                </ListItem.Title>
                <ListItem.Subtitle>Placeholder Description</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          ))}
        </ScrollView>
      </Dialog>
    </View>
  );
}

export default ExercisesDialog;
