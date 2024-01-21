// import { supabase } from '@lib/supabase';
import { types, flow, destroy } from 'mobx-state-tree';

import { Workout } from '@models/Workout';
import { Exercise } from '@models/Exercise';
import { UserWorkout } from '@models/UserWorkout';

// import fetchSets from '@lib/queries/fetchSets';
import { createWorkout, fetchWorkouts } from '@lib/queries/workouts';
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
// import { SETS_TABLE_NAME } from '@lib/constants';

export const ExercisesStore = types
  .model('ExercisesStore', {
    identifier: types.optional(types.identifier, 'ExercisesStore'),
    workouts: types.array(Workout),
    exercises: types.array(Exercise),
    userWorkouts: types.array(UserWorkout),
    // workoutSets: types.array(WorkoutSet),
  })
  .views((self) => ({
    getExerciseById: (id) => {
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
    afterCreate: flow(function* () {
      const { success, data } = yield loadExercises();
      if (success) {
        self.exercises = data;
      }

      yield self.loadWorkouts();
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

    loadWorkouts: flow(function* () {
      const workouts = yield fetchWorkouts();

      self.workouts = workouts;
    }),

    saveWorkout: flow(function* (workout) {
      const { success, data } = yield createWorkout(workout);

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
