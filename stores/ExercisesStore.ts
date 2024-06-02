// import { supabase } from '@lib/supabase';
import {
  flow,
  types,
  destroy,
  Instance,
  SnapshotIn,
  SnapshotOut,
} from 'mobx-state-tree';

import {
  Workout,
  WorkoutSnapshotInType,
  WorkoutSnapshotOutType,
  WorkoutType,
} from '@models/Workout';
import { Exercise } from '@models/Exercise';
import { UserWorkout } from '@models/UserWorkout';

// import fetchSets from '@lib/queries/fetchSets';
import {
  insertWorkout,
  fetchWorkouts,
  insertWorkoutExercises,
  removeWorkoutExercises,
  WorkoutExerciseRowType,
  WorkoutExerciseRowInsertType,
  WorkoutExerciseRowUpdateType,
} from '@lib/queries/workouts';
import {
  fetchUserWorkouts,
  createUserWorkout,
} from '@lib/queries/userWorkouts';
import {
  loadExercises,
  updateExercise,
  insertExercise,
  deleteExercise,
} from '@lib/queries/exercises';
import { WorkoutExercise } from '@models/WorkoutExercise';
// import { SETS_TABLE_NAME } from '@lib/constants';

export const ExercisesStore = types
  .model('ExercisesStore', {
    identifier: types.optional(types.identifier, 'ExercisesStore'),
    isInitialized: types.optional(types.boolean, false),
    workouts: types.array(Workout),
    exercises: types.array(Exercise),
    userWorkouts: types.array(UserWorkout),
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

    // get trackedExercisesSummary() {
    //   const summary = self.workoutSets.reduce((carry, workoutSet) => {
    //     const { weight, exercise } = workoutSet;
    //     const exerciseId = exercise.id;

    //     carry[exerciseId] ??= {
    //       exerciseId,
    //       totalSets: 0,
    //       maxWeight: 0,
    //       exerciseName: exercise.name,
    //     };

    //     carry[exerciseId].totalSets += 1;
    //     if (carry[exerciseId].maxWeight < +weight) {
    //       carry[exerciseId].maxWeight = +weight;
    //     }

    //     return carry;
    //   }, {});

    //   return Object.values(summary);
    // },
  }))
  .actions((self) => ({
    loadWorkouts: flow(function* () {
      const workouts = yield fetchWorkouts();

      self.workouts = workouts;
    }),
  }))
  .actions((self) => ({
    afterCreate: flow(function* () {
      const { success, data } = yield loadExercises();
      if (success) {
        self.exercises = data;
      }

      yield self.loadWorkouts();

      self.isInitialized = true;
    }),

    saveExercise: flow(function* (exercise) {
      if (exercise.id) {
        const { success } = yield updateExercise(exercise);

        if (success) {
          exercise.setName(exercise.name);
        }

        return;
      }

      // insert new one
      const { success, data } = yield insertExercise(exercise);
      if (success) {
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

    loadUserWorkouts: flow(function* () {
      const userWorkoutsData = yield fetchUserWorkouts();
      userWorkoutsData.forEach((userWorkoutData) => {
        console.log(userWorkoutData);
        const userWorkout = {
          ...userWorkoutData,
          workout: userWorkoutData.workout_id,
        };
      });
    }),

    createUserWorkout: flow(function* (workoutId) {
      yield createUserWorkout({ workout_id: workoutId });
    }),
  }));

export interface ExercisesStoreType extends Instance<typeof ExercisesStore> {}
export interface ExercisesStoreSnapshotInType
  extends SnapshotIn<typeof ExercisesStore> {}
export interface ExercisesStoreSnapshotOutType
  extends SnapshotOut<typeof ExercisesStore> {}
