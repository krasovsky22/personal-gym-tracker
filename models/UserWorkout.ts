import { Instance, SnapshotIn, SnapshotOut, types } from 'mobx-state-tree';

import { Workout } from './Workout';

export const UserWorkout = types.model('UserWorkout', {
  id: types.identifier,
  workout: types.safeReference(Workout),
  workoutDate: types.string,
  completed: types.optional(types.boolean, false),
});
//   .actions((self) => ({}));

export interface UserWorkoutType extends Instance<typeof UserWorkout> {}
export interface UserWorkoutSnapshotInType
  extends SnapshotIn<typeof UserWorkout> {}
export interface UserWorkoutSnapshotOutType
  extends SnapshotOut<typeof UserWorkout> {}
