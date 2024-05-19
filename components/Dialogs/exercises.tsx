import { View, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState, useMemo } from 'react';
import { Dialog, Input, ListItem } from '@rneui/themed';

import { useExercisesStore } from '@hooks';
import { ExerciseType } from '@models/Exercise';

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
