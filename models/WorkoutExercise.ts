import { types } from 'mobx-state-tree';
import { Exercise } from './Exercise';

export const WorkoutExercise = types.model('WorkoutExercise', {
  id: types.maybeNull(types.identifier),
  order: types.number,
  exercise: types.safeReference(Exercise),
  sets_count: types.number,
  created_at: types.maybeNull(types.string),
});
