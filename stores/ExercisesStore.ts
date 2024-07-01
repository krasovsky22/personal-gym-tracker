import {
  Instance,
  SnapshotIn,
  SnapshotOut,
  applySnapshot,
  cast,
  destroy,
  flow,
  types,
} from 'mobx-state-tree';

import { Exercise, ExerciseSnapshotInType } from '@models/Exercise';
import {
  UserWorkout,
  UserWorkoutSnapshotInType,
  UserWorkoutType,
} from '@models/UserWorkout';
import { Workout, WorkoutSnapshotInType, WorkoutType } from '@models/Workout';

import {
  deleteExercise,
  fetchExercises,
  insertExercise,
} from '@lib/queries/exercises';
import {
  UserWorkExerciseRowInsertType,
  UserWorkExerciseSetRowInsertType,
  UserWorkRowInsertType,
  UserWorkoutCompleteType,
  fetchUserWorkouts,
  insertUserWorkout,
  insertUserWorkoutExercise,
  insertUserWorkoutExerciseSet,
} from '@lib/queries/userWorkouts';
import {
  WorkoutExerciseRowInsertType,
  deleteWorkout,
  fetchWorkouts,
  insertWorkout,
  insertWorkoutExercises,
  removeWorkoutExercises,
} from '@lib/queries/workouts';
import {
  UserWorkoutExerciseSetSnapshotInType,
  UserWorkoutExerciseSetType,
} from '@models/UserWorkoutExerciseSet';
import { UserWorkoutExerciseSnapshotInType } from '@models/UserWorkoutExercise';
import { toJS } from 'mobx';

export const ExercisesStore = types
  .model('ExercisesStore', {
    identifier: types.optional(types.identifier, 'ExercisesStore'),
    isInitialized: types.optional(types.boolean, false),
    workouts: types.array(Workout),
    exercises: types.array(Exercise),
    userWorkouts: types.array(UserWorkout),
    newUserWorkout: types.maybeNull(UserWorkout),
    // workoutSets: types.array(WorkoutSet),
  })
  .views((self) => ({
    get sortedExercises() {
      return self.exercises.slice().sort((a, b) => {
        if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) {
          return -1;
        }
        if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) {
          return 1;
        }
        return 0;
      });
    },
    getWorkoutById: (id: string) => {
      return self.workouts.find((workout) => workout.id === id);
    },
    getExerciseById: (id: string) => {
      return self.exercises.find((exercise) => {
        return exercise.id === id;
      });
    },

    getUserWorkoutById: (id: string) => {
      return self.userWorkouts.find((userWorkout) => userWorkout.id === id);
    },
  }))
  .actions((self) => ({
    cancelUserWorkout: flow(function* () {
      if (self.newUserWorkout?.isNew) {
        destroy(self.newUserWorkout);
        self.newUserWorkout = null;
      }
    }),
    loadExercises: flow(function* () {
      const { data } = yield fetchExercises();
      self.exercises = cast(data);
    }),

    loadWorkouts: flow(function* () {
      const workouts = yield fetchWorkouts();

      self.workouts = cast(workouts);
    }),

    loadUserWorkouts: flow(function* () {
      const { data, success } = yield fetchUserWorkouts();
      if (!success) {
        console.error('UNABLE TO FETCH USER WORKOUTS');
      }

      const userWorkoutsData: UserWorkoutSnapshotInType[] = data.map(
        (userWorkoutData: UserWorkoutCompleteType) => {
          const workoutExercises: UserWorkoutExerciseSnapshotInType[] =
            userWorkoutData.userWorkoutExercises.map((userWorkoutExercise) => {
              const userWorkoutExerciseSets: UserWorkoutExerciseSetSnapshotInType[] =
                userWorkoutExercise.userWorkoutExerciseSets.map(
                  (userWorkoutExerciseSet) => {
                    return {
                      ...userWorkoutExerciseSet,
                      weight: userWorkoutExerciseSet.weight.toString(),
                    };
                  }
                );
              // .sort(
              //   (a, b) =>
              //     new Date(b.created_at).getTime() -
              //     new Date(a.created_at).getTime()
              // );

              return {
                ...userWorkoutExercise,
                userWorkoutExerciseSets,
                exercise: userWorkoutExercise.exercise_id,
              };
            });
          //   .sort(
          //     (a, b) =>
          //       new Date(b.created_at).getTime() -
          //       new Date(a.created_at).getTime()
          //   );
          return {
            ...userWorkoutData,
            workout: userWorkoutData.workout_id,
            workoutDate: userWorkoutData.workout_date,
            userWorkoutExercises: workoutExercises,
          };
        }
      );

      self.userWorkouts = cast(userWorkoutsData);
    }),
  }))
  .actions((self) => ({
    afterCreate: flow(function* () {
      yield self.loadExercises();

      yield self.loadWorkouts();

      yield self.loadUserWorkouts();

      self.isInitialized = true;
    }),

    saveExercise: flow(function* (
      exercise: ExerciseSnapshotInType,
      exerciseId?: string
    ) {
      const { success, data } = yield insertExercise({
        id: exerciseId,
        name: exercise.name,
      });

      if (success) {
        if (exerciseId) {
          const exerciseModel = self.getExerciseById(exerciseId)!;
          applySnapshot(exerciseModel, data);

          return;
        }

        self.exercises.push(data);
      }
    }),

    deleteExercise: flow(function* (exerciseId) {
      const { success } = yield deleteExercise(exerciseId);

      if (success) {
        const exercise = self.exercises.find(
          (exercise) => exercise.id === exerciseId
        );
        destroy(exercise);
      }
    }),

    // loadWorkout: flow(function* () {
    //   const data = yield fetchSets();
    //   const exercises = data.reduce((carry, exerciseSet) => {
    //     carry[exerciseSet.exercises.id] ??= exerciseSet.exercises;

    //     return carry;
    //   }, {});

    //   const workoutSets = data.map((workoutSet) => ({
    //     ...workoutSet,
    //     weight: workoutSet.weight.toString(),
    //     exercise: workoutSet.exercises.id,
    //   }));

    //   self.exercises = Object.values(exercises);
    //   self.workoutSets = workoutSets;
    // }),

    // saveExerciseSets: flow(function* (exercises) {
    //   console.log('saving', exercises);
    //   const { data } = yield supabase
    //     .from(SETS_TABLE_NAME)
    //     .upsert(exercises)
    //     .select();

    //   data.forEach((workoutSet) => {
    //     const { id, exercise_id, set_order, weight, repeats, workout_date } =
    //       workoutSet;

    //     const exercise = {
    //       id: +id,
    //       repeats: +repeats,
    //       exercise: exercise_id,
    //       set_order: +set_order,
    //       workout_date: workout_date,
    //       weight: (+weight).toFixed(2),
    //     };

    //     self.workoutSets.push(exercise);
    //   });
    // }),

    deleteWorkout: flow(function* (workout: WorkoutType) {
      const { success } = yield deleteWorkout(workout.id!);

      if (success) {
        destroy(workout);
      }
    }),

    saveWorkout: flow(function* (
      workoutSnapshot: WorkoutSnapshotInType,
      workoutId?: string
    ) {
      try {
        const { data: workoutRowData } = yield insertWorkout({
          id: workoutId,
          name: workoutSnapshot.name,
        });

        const workoutExercisesToInsertOrUpdate: WorkoutExerciseRowInsertType[] =
          workoutSnapshot.workoutExercises?.map((workoutExercise) => {
            const insertData: WorkoutExerciseRowInsertType = {
              exercise_id: workoutExercise.exercise as string,
              workout_id: workoutRowData.id,
              order: workoutExercise.order,
              sets_count: workoutExercise.sets_count,
            };

            return insertData;
          }) ?? [];

        if (workoutId) {
          const workoutModel = self.getWorkoutById(workoutId);

          // set ids for data we need to insert to db, to ensure updates
          workoutModel?.workoutExercises?.forEach((exerciseModel) => {
            const exerciseToInsert = workoutExercisesToInsertOrUpdate.find(
              (exerciseToInsert) => {
                return (
                  exerciseModel.exercise?.id === exerciseToInsert.exercise_id
                );
              }
            );

            if (exerciseToInsert) {
              exerciseToInsert.id = exerciseModel.id!;
            }
          });

          const workoutExercisesToRemove: string[] =
            workoutModel?.workoutExercises
              .filter((workoutModelExercise) => {
                return (
                  workoutSnapshot?.workoutExercises?.some(
                    ({ exercise }) =>
                      workoutModelExercise?.exercise?.id === exercise
                  ) === false
                );
              })
              .map((WorkoutExerciseModel) => WorkoutExerciseModel.id!) ?? [];

          yield removeWorkoutExercises(workoutExercisesToRemove);
        }

        yield insertWorkoutExercises(workoutExercisesToInsertOrUpdate);
      } catch (error) {
        console.log('SAVE WORKOUT ERROR', error);
      }

      yield self.loadWorkouts();
    }),

    createNewUserWorkoutModel: (workout: WorkoutType) => {
      const newUserWorkoutSnapshot: UserWorkoutSnapshotInType = {
        workout: workout.id!,
        userWorkoutExercises: workout.workoutExercises.map(
          (workoutExercise) => {
            const setsCount = workoutExercise.sets_count ?? 3;
            return {
              exercise: workoutExercise.exercise?.id!,
              userWorkoutExerciseSets: Array.from(
                { length: setsCount },
                (v, i) => i
              ).map(() => {
                return {};
              }),
            };
          }
        ),
      };

      self.newUserWorkout = cast(newUserWorkoutSnapshot);

      return self.newUserWorkout!;
    },

    saveUserWorkoutModel: async (userWorkout: UserWorkoutType) => {
      // create user workout row
      const userWorkoutData: UserWorkRowInsertType = {
        workout_id: userWorkout.workout?.id!,
      };

      if (!userWorkout.isNew) {
        userWorkoutData.id = userWorkout.id;
      }

      const { data: userWorkoutRow } = await insertUserWorkout(userWorkoutData);
      if (!userWorkoutRow) {
        return;
      }

      userWorkout.setFromSnapshot(userWorkoutRow);

      for await (const userWorkoutExercise of userWorkout.userWorkoutExercises) {
        const userWorkoutExerciseData: UserWorkExerciseRowInsertType = {
          user_workout_id: userWorkoutRow.id,
          completed: userWorkoutExercise.completed,
          exercise_id: userWorkoutExercise.exercise?.id!,
        };

        if (!userWorkoutExercise.isNew) {
          userWorkoutExerciseData.id = userWorkoutExercise.id;
        }
        const { data: userWorkoutExerciseRow } =
          await insertUserWorkoutExercise(userWorkoutExerciseData);

        if (userWorkoutExerciseRow) {
          userWorkoutExercise.setFromSnapshot(userWorkoutExerciseRow);
        }

        for await (const userWorkoutExerciseSet of userWorkoutExercise.userWorkoutExerciseSets) {
          const userWorkoutExerciseSetData: UserWorkExerciseSetRowInsertType = {
            weight: +(userWorkoutExerciseSet.weight || 0),
            repeats: userWorkoutExerciseSet.repeats || 0,
            completed: userWorkoutExerciseSet.completed,
            user_workout_exercise_id: userWorkoutExercise.id,
          };

          if (!userWorkoutExerciseSet.isNew) {
            userWorkoutExerciseSetData.id = userWorkoutExerciseSet.id;
          }

          const { data: userWorkoutExerciseSetRow } =
            await insertUserWorkoutExerciseSet(userWorkoutExerciseSetData);

          if (userWorkoutExerciseSetRow) {
            userWorkoutExerciseSet.setFromSnapshot(userWorkoutExerciseSetRow);
          }
        }
      }
      //   const responses = yield Promise.all(
      //     userWorkout.userWorkoutExercises.map(async (userWorkoutExercise) => {
      //       const userWorkoutExerciseData: UserWorkExerciseRowInsertType = {
      //         user_workout_id: userWorkoutRow.id,
      //         completed: userWorkoutExercise.completed,
      //         exercise_id: userWorkoutExercise.exercise?.id!,
      //       };

      //       if (!userWorkoutExercise.isNew) {
      //         userWorkoutExerciseData.id = userWorkoutExercise.id;
      //       }
      //       const { data: userWorkoutExerciseRow } =
      //         await insertUserWorkoutExercise(userWorkoutExerciseData);

      //       if (userWorkoutExerciseRow) {
      //         userWorkoutExercise.setFromSnapshot(userWorkoutExerciseRow);
      //       }

      //       return await Promise.all(
      //         userWorkoutExercise.userWorkoutExerciseSets.map(
      //           async (userWorkoutExerciseSet) => {
      //             const userWorkoutExerciseSetData: UserWorkExerciseSetRowInsertType =
      //               {
      //                 weight: +(userWorkoutExerciseSet.weight || 0),
      //                 repeats: userWorkoutExerciseSet.repeats || 0,
      //                 completed: userWorkoutExerciseSet.completed,
      //                 user_workout_exercise_id: userWorkoutExercise.id,
      //               };

      //             if (!userWorkoutExerciseSet.isNew) {
      //               userWorkoutExerciseSetData.id = userWorkoutExerciseSet.id;
      //             }

      //             const { data: userWorkoutExerciseSetRow } =
      //               await insertUserWorkoutExerciseSet(
      //                 userWorkoutExerciseSetData
      //               );

      //             if (userWorkoutExerciseSetRow) {
      //               userWorkoutExerciseSet.setFromSnapshot(
      //                 userWorkoutExerciseSetRow
      //               );
      //             }
      //           }
      //         )
      //       );
      //     })
      //   );
    },
  }));

export interface ExercisesStoreType extends Instance<typeof ExercisesStore> {}
export interface ExercisesStoreSnapshotInType
  extends SnapshotIn<typeof ExercisesStore> {}
export interface ExercisesStoreSnapshotOutType
  extends SnapshotOut<typeof ExercisesStore> {}
