import { Instance, SnapshotIn, SnapshotOut, types } from 'mobx-state-tree';

import { Exercise } from './Exercise';
import { UserWorkoutExerciseSet } from './UserWorkoutExerciseSet';

export const UserWorkoutExercise = types.model('UserWorkoutExercise', {
  id: types.maybeNull(types.identifier),
  exercise: types.safeReference(Exercise),
  created_at: types.maybeNull(types.string),
  //   userWorkoutExerciseSets: types.array(UserWorkoutExerciseSet),
  completed: types.optional(types.boolean, false),
});

export interface UserWorkoutExerciseType
  extends Instance<typeof UserWorkoutExercise> {}
export interface UserWorkoutExerciseSnapshotInType
  extends SnapshotIn<typeof UserWorkoutExercise> {}
export interface UserWorkoutExerciseSnapshotOutType
  extends SnapshotOut<typeof UserWorkoutExercise> {}
