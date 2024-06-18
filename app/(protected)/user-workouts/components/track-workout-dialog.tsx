import { CloseButton } from '@components/UI';
import { WorkoutType } from '@models/Workout';
import {
  Dialog,
  Button,
  Card,
  ListItem,
  Avatar,
  useTheme,
} from '@rneui/themed';
import { useRouter } from 'expo-router';
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
  const router = useRouter();
  const { theme } = useTheme();
  const [visible, setVisible] = useState(false);

  const toggleDialog = () => {
    setVisible(!visible);
  };

  return (
    <>
      <TouchableOpacity onPress={toggleDialog}>{children}</TouchableOpacity>

      <Dialog
        isVisible={visible}
        onBackdropPress={toggleDialog}
        overlayStyle={{
          width: '90%',
          top: '30%',
          position: 'absolute',
        }}
      >
        <View
          style={[
            styles.dialogTitleContainer,
            { backgroundColor: theme.colors.primarylight },
          ]}
        >
          <CloseButton onPress={toggleDialog} minified />
          <Dialog.Title title={workout.name} titleStyle={styles.dialogTitle} />
          <Button
            onPress={() => router.push(`/settings/workouts/${workout.id}`)}
            type="clear"
            title="Edit"
          ></Button>
        </View>

        <Card.Divider />

        <View>
          <TouchableOpacity
            onPress={() => {
              toggleDialog();
              return router.push(`/user-workouts/track-workout/${workout.id}`);
            }}
          >
            <FlatList
              data={workout.workoutExercises}
              renderItem={({ item }) => (
                <ListItem>
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
          </TouchableOpacity>
        </View>
      </Dialog>
    </>
  );
}

export default TrackWorkoutDialog;

const styles = StyleSheet.create({
  dialogTitleContainer: {
    // backgroundColor: 'lightgrey',
    flex: 1,
    marginTop: -20,
    marginLeft: -20,
    marginRight: -20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  dialogTitle: {
    marginVertical: 'auto',
  },

  dialogBody: {
    // backgroundColor: 'orange',
  },
});
