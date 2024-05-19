import { types } from 'mobx-state-tree';

import { Workout } from './Workout';

export const UserWorkout = types.model('UserWorkout', {
  id: types.identifierNumber,
  workout: types.safeReference(Workout),
  workoutDate: types.string,
  completed: types.optional(types.boolean, false),
});
//   .actions((self) => ({}));
