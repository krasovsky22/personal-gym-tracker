import { useExercisesStore } from '@hooks';
import { UserWorkoutType } from '@models/UserWorkout';
import { UserWorkoutExerciseSetType } from '@models/UserWorkoutExerciseSet';
import { Card, CheckBox, Divider, Icon, useTheme } from '@rneui/themed';
import { Observer } from 'mobx-react-lite';
import { StyleSheet, FlatList, View, Text, TextInput } from 'react-native';
import { Avatar } from '@components/UI';

type UserWorkoutTrackerType = {
  userWorkout: UserWorkoutType;
};
const UserWorkoutTracker = ({ userWorkout }: UserWorkoutTrackerType) => {
  const { theme } = useTheme();
  const { saveUserWorkoutModel } = useExercisesStore();

  const onUserWorkoutSetToggle = async (
    userWorkoutSet: UserWorkoutExerciseSetType
  ) => {
    userWorkoutSet.toggleCompleted();

    await saveUserWorkoutModel(userWorkout);
  };

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

                  <Observer>
                    {() => (
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

                        {item.isCompleted ? (
                          <Icon
                            size={36}
                            name="check-circle-outline"
                            type="material-community"
                            color={theme.colors.success}
                          />
                        ) : (
                          <Avatar rounded uri={item.exercise?.icon_url ?? ''} />
                        )}
                      </View>
                    )}
                  </Observer>
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
                          style={[
                            styles.setRowContainer,
                            { marginBottom: 10, paddingVertical: 10 },
                            {
                              backgroundColor: exerciseSet.completed
                                ? theme.colors.primarylightest
                                : theme.colors.background,
                            },
                          ]}
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
                            editable={!exerciseSet.completed}
                            keyboardType="numeric"
                            style={[
                              styles.setRowCell,
                              styles.textInputStyle,
                              { backgroundColor: theme.colors.grey5 },
                            ]}
                            value={exerciseSet.repeats?.toString() ?? ''}
                            onChangeText={(value) =>
                              exerciseSet.setRepeats(+value)
                            }
                          />
                          {/* KG */}
                          <TextInput
                            editable={!exerciseSet.completed}
                            selectTextOnFocus={true}
                            keyboardType="numeric"
                            maxLength={6}
                            style={[
                              styles.setRowCell,
                              styles.textInputStyle,
                              { backgroundColor: theme.colors.grey5 },
                            ]}
                            value={exerciseSet.weight ?? ''}
                            onChangeText={(value) =>
                              exerciseSet.setWeight(value)
                            }
                          />

                          <View style={styles.setRowCell}>
                            <CheckBox
                              checked={exerciseSet.completed}
                              size={24}
                              iconType="material-community"
                              checkedIcon="check-circle"
                              checkedColor={
                                exerciseSet.completed
                                  ? theme.colors.success
                                  : theme.colors.warning
                              }
                              style={{
                                marginLeft: 'auto',
                                marginRight: 'auto',
                              }}
                              uncheckedIcon="checkbox-blank-outline"
                              onPress={() =>
                                onUserWorkoutSetToggle(exerciseSet)
                              }
                            />
                          </View>
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
    alignItems: 'center',
  },

  textInputStyle: {
    height: '100%',
    fontWeight: 'bold',
    fontSize: 20,
  },

  userWorkoutSetHeaderText: {},
});
