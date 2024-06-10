import { CloseButton } from '@components/UI';
import { WorkoutType } from '@models/Workout';
import { Dialog, Button, Card, ListItem, Avatar } from '@rneui/themed';
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';

type TrackWorkoutDialogType = {
  workout: WorkoutType;
  children: React.ReactNode;
};

function TrackWorkoutDialog({ children, workout }: TrackWorkoutDialogType) {
  const [visible, setVisible] = useState(false);

  const toggleDialog = () => {
    setVisible(!visible);
  };

  return (
    <>
      <TouchableOpacity
        onPress={toggleDialog}
        // style={{ flex: 1, alignSelf: 'flex-end' }}
      >
        {children}
      </TouchableOpacity>

      <Dialog
        isVisible={visible}
        onBackdropPress={toggleDialog}
        overlayStyle={{
          width: '90%',
          top: '30%',
          position: 'absolute',
        }}
      >
        <View style={styles.dialogTitle}>
          <CloseButton onPress={toggleDialog} minified />
          <Dialog.Title title={workout.name} titleStyle={{ margin: 0 }} />
          <Button onPress={() => {}} type="clear" title="Edit"></Button>
        </View>

        <Card.Divider />

        <View style={styles.dialogBody}>
          <FlatList
            data={workout.workoutExercises}
            renderItem={({ item }) => (
              <ListItem bottomDivider>
                <Avatar
                  rounded
                  source={{
                    uri: item.exercise?.icon_url,
                  }}
                />
                <ListItem.Content>
                  <ListItem.Title style={{ fontWeight: 'bold' }}>
                    {item.sets_count} x {item.exercise?.name}
                  </ListItem.Title>
                  <ListItem.Subtitle>Sub Title</ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            )}
          />
        </View>
      </Dialog>
    </>
  );
}

export default TrackWorkoutDialog;

const styles = StyleSheet.create({
  dialogTitle: {
    flex: 1,
    paddingHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  dialogBody: {},
});
