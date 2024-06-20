import { NewUserWorkoutType, UserWorkoutType } from '@models/UserWorkout';
import { Card, CheckBox, Divider, useTheme, Avatar } from '@rneui/themed';
import { Observer } from 'mobx-react-lite';
import { StyleSheet, FlatList, View, Text, TextInput } from 'react-native';

type UserWorkoutTrackerType = {
  userWorkout: UserWorkoutType | NewUserWorkoutType;
};
const UserWorkoutTracker = ({ userWorkout }: UserWorkoutTrackerType) => {
  const { theme } = useTheme();
  console.log('user workout', userWorkout);
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <FlatList
          data={userWorkout.userWorkoutExercises}
          renderItem={({ item, index: exerciseIndex }) => (
            <Card>
              <View style={styles.userWorkoutContainer}>
                <View style={styles.userWorkoutContainerTitle}>
                  <View style={{ gap: 5 }}>
                    <Text style={{ fontWeight: 'bold' }}>
                      {item.exercise?.name}
                    </Text>
                    <Text style={{ fontSize: 10, color: theme.colors.grey3 }}>
                      Categories Placeholder
                    </Text>
                  </View>

                  <View style={{ gap: 5 }}>
                    <Text
                      style={{
                        fontSize: 10,
                        color: theme.colors.grey3,
                        flexWrap: 'nowrap',
                      }}
                    >
                      {exerciseIndex + 1} of{' '}
                      {userWorkout.userWorkoutExercises.length}
                    </Text>
                    <Avatar
                      rounded
                      size={24}
                      source={{
                        uri: item.exercise?.icon_url,
                      }}
                    />
                  </View>
                </View>
                <Divider />

                <View style={styles.setRowContainer}>
                  <Text
                    style={[styles.setRowHeader, { color: theme.colors.grey3 }]}
                  >
                    SET
                  </Text>
                  <Text
                    style={[styles.setRowHeader, { color: theme.colors.grey3 }]}
                  >
                    PREV
                  </Text>
                  <Text
                    style={[styles.setRowHeader, { color: theme.colors.grey3 }]}
                  >
                    REP
                  </Text>
                  <Text
                    style={[styles.setRowHeader, { color: theme.colors.grey3 }]}
                  >
                    KG
                  </Text>
                  <Text
                    style={[styles.setRowHeader, { color: theme.colors.grey3 }]}
                  ></Text>
                </View>
                <FlatList
                  data={item.userWorkoutExerciseSets}
                  renderItem={({
                    item: exerciseSet,
                    index: exerciseSetIndex,
                  }) => (
                    <Observer>
                      {() => (
                        <View
                          style={[styles.setRowContainer, { marginBottom: 10 }]}
                        >
                          <Text
                            style={[
                              styles.setRowCell,
                              { color: theme.colors.primaryDarker },
                            ]}
                          >
                            {exerciseSetIndex + 1}
                          </Text>
                          <Text
                            style={[
                              styles.setRowCell,
                              { color: theme.colors.primaryDarker },
                            ]}
                          >
                            Prev
                          </Text>

                          {/* REPS */}
                          <TextInput
                            style={[
                              styles.setRowCell,
                              styles.textInputStyle,
                              { backgroundColor: theme.colors.greyOutline },
                            ]}
                            value={exerciseSet.repeats.toString()}
                            onChangeText={(value) =>
                              exerciseSet.setRepeats(+value)
                            }
                          />
                          {/* KG */}
                          <TextInput
                            keyboardType="numeric"
                            maxLength={6}
                            style={[
                              styles.setRowCell,
                              styles.textInputStyle,
                              { backgroundColor: theme.colors.greyOutline },
                            ]}
                            value={exerciseSet.weight.toString()}
                            onChangeText={(value) =>
                              exerciseSet.setWeight(value)
                            }
                          />

                          <Text style={styles.setRowCell}>
                            <CheckBox
                              checked
                              size={24}
                              iconType="material-community"
                              checkedIcon="check-circle"
                              checkedColor={theme.colors.success}
                              uncheckedIcon="checkbox-blank-outline"
                            />
                          </Text>
                        </View>
                      )}
                    </Observer>
                  )}
                />
              </View>
            </Card>
          )}
        />
      </View>
    </View>
  );
};

export default UserWorkoutTracker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    flex: 1,
    flexGrow: 1,
    justifyContent: 'space-evenly',
  },
  userWorkoutContainer: {},

  userWorkoutContainerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  userWorkoutSetsHeader: {
    flex: 1,
    backgroundColor: 'green',
  },

  setRowContainer: {
    flex: 1,
    gap: 10,
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  setRowHeader: {
    flex: 1,
    textAlign: 'center',
  },

  setRowCell: {
    flex: 1,
    width: 20,
    fontSize: 20,
    textAlign: 'center',
  },

  textInputStyle: {
    height: '100%',
    fontWeight: 'bold',
    fontSize: 20,
  },

  userWorkoutSetHeaderText: {},
});
