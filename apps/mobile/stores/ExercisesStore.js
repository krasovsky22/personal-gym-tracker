import { types, flow, destroy } from 'mobx-state-tree';

import { supabase } from '@lib/supabase';
import { Exercise } from '@models/Exercise';

const TABLE_NAME = 'exercises';

export const ExercisesStore = types
  .model('ExercisesStore', {
    identifier: types.optional(types.identifier, 'ExercisesStore'),
    exercises: types.array(Exercise),
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
          .from(TABLE_NAME)
          .update({ ...exercise })
          .eq('id', exercise.id)
          .select();

        console.log('update', data);
        exercise.setName(exercise.name);
        return;
      }

      // insert new one
      const { data } = yield supabase
        .from(TABLE_NAME)
        .insert({ ...exercise })
        .select();

      self.exercises.push(data[0]);
    }),

    deleteExercise: flow(function* (exercise) {
      yield supabase.from(TABLE_NAME).delete().eq('id', exercise.id);

      destroy(exercise);
    }),
    loadExercises: flow(function* () {
      try {
        const { data } = yield supabase.from(TABLE_NAME).select(`*`);

        self.exercises = data;
      } catch (error) {
        console.log('ERROR', error);
      }
    }),
  }));
