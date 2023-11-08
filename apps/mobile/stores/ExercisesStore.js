import { types, flow } from 'mobx-state-tree';

import { supabase } from '@lib/supabase';
import { Exercise } from '@models/Exercise';

const TABLE_NAME = 'exercises';

export const ExercisesStore = types
  .model('ExercisesStore', {
    identifier: types.optional(types.identifier, 'ExercisesStore'),
    exercises: types.array(Exercise),
  })
  .views((self) => ({}))
  .actions((self) => ({
    saveExercise: flow(function* (exercise) {
      const { data } = yield supabase
        .from(TABLE_NAME)
        .insert({ ...exercise })
        .select();

      self.exercises.push(data[0]);
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
