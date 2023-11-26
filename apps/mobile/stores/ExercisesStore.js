import { types, flow, destroy } from 'mobx-state-tree';

import { supabase } from '@lib/supabase';
import { Exercise } from '@models/Exercise';
import { WorkoutSet } from '@models/WorkoutSet';

const SETS_TABLE_NAME = 'sets';
const EXERCISE_TABLE_NAME = 'exercises';

export const ExercisesStore = types
  .model('ExercisesStore', {
    identifier: types.optional(types.identifier, 'ExercisesStore'),
    exercises: types.array(Exercise),
    workoutSets: types.array(WorkoutSet),
  })
  .views((self) => ({
    getExerciseById: (id) => {
      return self.exercises.find((exercise) => exercise.id);
    },
  }))
  .actions((self) => ({
    saveExercise: flow(function* (exercise) {
      console.log('saving', exercise);
      if (exercise.id) {
        const { data } = yield supabase
          .from(EXERCISE_TABLE_NAME)
          .update({ ...exercise })
          .eq('id', exercise.id)
          .select();

        console.log('update', data);
        exercise.setName(exercise.name);
        return;
      }

      // insert new one
      const { data } = yield supabase
        .from(EXERCISE_TABLE_NAME)
        .insert({ ...exercise })
        .select();

      self.exercises.push(data[0]);
    }),

    deleteExercise: flow(function* (exercise) {
      yield supabase.from(EXERCISE_TABLE_NAME).delete().eq('id', exercise.id);

      destroy(exercise);
    }),

    loadExercises: flow(function* () {
      try {
        const { data } = yield supabase.from(EXERCISE_TABLE_NAME).select(`*`);

        self.exercises = data;
      } catch (error) {
        console.log('ERROR', error);
      }
    }),

    loadWorkout: flow(function* () {
      try {
        const { data } = yield supabase.from(SETS_TABLE_NAME).select(`*`);

        self.exercises = data;
      } catch (error) {
        console.log('ERROR', error);
      }
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
