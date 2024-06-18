import { Instance, SnapshotIn, SnapshotOut, types } from 'mobx-state-tree';

import { Workout } from './Workout';
import {
  UserWorkoutExercise,
  UserWorkoutExerciseSnapshotInType,
} from './UserWorkoutExercise';

export const UserWorkout = types
  .model('UserWorkout', {
    id: types.maybeNull(types.identifier),
    workout: types.safeReference(Workout),
    userWorkoutExercises: types.array(UserWorkoutExercise),
    completed: types.optional(types.boolean, false),
    created_at: types.maybeNull(types.string),
  })
  .actions((self) => ({
    addUserWorkoutExercise: (model: UserWorkoutExerciseSnapshotInType) => {
      self.userWorkoutExercises.push(model);
    },
  }));
export interface UserWorkoutType extends Instance<typeof UserWorkout> {}
export interface UserWorkoutSnapshotInType
  extends SnapshotIn<typeof UserWorkout> {}
export interface UserWorkoutSnapshotOutType
  extends SnapshotOut<typeof UserWorkout> {}
