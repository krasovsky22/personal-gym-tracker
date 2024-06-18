import { Instance, SnapshotIn, SnapshotOut, types } from 'mobx-state-tree';

export const UserWorkoutExerciseSet = types.model('UserWorkoutExerciseSet', {
  id: types.maybeNull(types.identifier),
  weight: types.optional(types.float, 0.1),
  repeats: types.optional(types.number, 0),
  created_at: types.maybeNull(types.string),
});

export interface UserWorkoutExerciseSetType
  extends Instance<typeof UserWorkoutExerciseSet> {}
export interface UserWorkoutExerciseSetSnapshotInType
  extends SnapshotIn<typeof UserWorkoutExerciseSet> {}
export interface UserWorkoutExerciseSetSnapshotOutType
  extends SnapshotOut<typeof UserWorkoutExerciseSet> {}
