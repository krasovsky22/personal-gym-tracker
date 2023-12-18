import { supabase } from '@lib/supabase';
import { types, flow, destroy } from 'mobx-state-tree';

import { Exercise } from '@models/Exercise';
import { WorkoutSet } from '@models/WorkoutSet';

import fetchSets from '@lib/queries/fetchSets';
import {
  loadExercises,
  updateExercise,
  insertExercise,
  deleteExercise,
} from '@lib/queries/exercises';
import { SETS_TABLE_NAME } from '@lib/constants';

export const ExercisesStore = types
  .model('ExercisesStore', {
    identifier: types.optional(types.identifier, 'ExercisesStore'),
    exercises: types.array(Exercise),
    workoutSets: types.array(WorkoutSet),
  })
  .views((self) => ({
    getExerciseById: (id) => {
      return self.exercises.find((exercise) => {
        return exercise.id === id;
      });
    },

    get trackedExercisesSummary() {
      const summary = self.workoutSets.reduce((carry, workoutSet) => {
        const { weight, exercise } = workoutSet;
        const exerciseId = exercise.id;

        carry[exerciseId] ??= {
          exerciseId,
          totalSets: 0,
          maxWeight: 0,
          exerciseName: exercise.name,
        };

        carry[exerciseId].totalSets += 1;
        if (carry[exerciseId].maxWeight < +weight) {
          carry[exerciseId].maxWeight = +weight;
        }

        return carry;
      }, {});

      return Object.values(summary);
    },
  }))
  .actions((self) => ({
    afterCreate: flow(function* () {
      const { success, data } = yield loadExercises();
      if (success) {
        self.exercises = data;
      }
    }),

    saveExercise: flow(function* (exercise) {
      console.log(exercise);
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
        self.exercises.push(data[0]);
      }
    }),

    deleteExercise: flow(function* (exercise) {
      const { success } = yield deleteExercise(exercise.id);

      if (success) {
        destroy(exercise);
      }
    }),

    loadWorkout: flow(function* () {
      const data = yield fetchSets();
      const exercises = data.reduce((carry, exerciseSet) => {
        carry[exerciseSet.exercises.id] ??= exerciseSet.exercises;

        return carry;
      }, {});

      const workoutSets = data.map((workoutSet) => ({
        ...workoutSet,
        weight: workoutSet.weight.toString(),
        exercise: workoutSet.exercises.id,
      }));

      self.exercises = Object.values(exercises);
      self.workoutSets = workoutSets;
    }),

    saveExerciseSets: flow(function* (exercises) {
      console.log('saving', exercises);
      const { data } = yield supabase
        .from(SETS_TABLE_NAME)
        .upsert(exercises)
        .select();

      data.forEach((workoutSet) => {
        const { id, exercise_id, set_order, weight, repeats, workout_date } =
          workoutSet;

        const exercise = {
          id: +id,
          repeats: +repeats,
          exercise: exercise_id,
          set_order: +set_order,
          workout_date: workout_date,
          weight: (+weight).toFixed(2),
        };

        self.workoutSets.push(exercise);
      });
    }),
  }));
