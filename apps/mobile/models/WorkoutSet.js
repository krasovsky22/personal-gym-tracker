import { types } from 'mobx-state-tree';

import { Exercise } from './Exercise';

export const WorkoutSet = types.model('WorkoutSet', {
  id: types.identifierNumber,
  weight: types.string,
  repeats: types.number,
  set_order: types.number,
  workout_date: types.string,
  exercise: types.safeReference(Exercise),
});
//   .actions((self) => ({}));
