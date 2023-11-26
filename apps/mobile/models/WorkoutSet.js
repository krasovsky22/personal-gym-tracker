import { types } from 'mobx-state-tree';

import { Exercise } from './Exercise';

export const WorkoutSet = types.model('WorkoutSet', {
  id: types.identifier,
  weight: types.float,
  repeats: types.number,
  created_at: types.string,
  exercise: types.safeReference(Exercise),
});
//   .actions((self) => ({}));
