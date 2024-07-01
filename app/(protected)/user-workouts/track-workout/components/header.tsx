import React from 'react';
import { useTheme, Button } from '@rneui/themed';
import { UserWorkoutType } from '@models/UserWorkout';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useExercisesStore } from '@hooks';

type TrackWorkoutHeaderProps = {
  userWorkout: UserWorkoutType;
};
function TrackWorkoutHeader({ userWorkout }: TrackWorkoutHeaderProps) {
  const router = useRouter();
  const { theme } = useTheme();
  const { cancelUserWorkout } = useExercisesStore();

  const handleCancelClick = () => {
    router.replace('/(protected)/user-workouts');
    cancelUserWorkout();
  };

  return (
    <View style={styles.titleContainer}>
      <View style={{ flex: 1 }}>
        <Text>{userWorkout.workout?.name ?? ''}</Text>
        <Text>Check Workout Blah Blah</Text>
      </View>
      <View>
        <Button
          size="sm"
          title="Cancel"
          color={theme.colors.error}
          onPress={handleCancelClick}
        />
      </View>
    </View>
  );
}

export default TrackWorkoutHeader;

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    flexGrow: 1,
    flexDirection: 'row',
    marginHorizontal: 15,
    justifyContent: 'space-evenly',
  },
});
