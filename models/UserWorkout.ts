import { Instance, SnapshotIn, SnapshotOut, types } from 'mobx-state-tree';

import { Workout } from './Workout';
import {
  NewUserWorkoutExercise,
  UserWorkoutExercise,
} from './UserWorkoutExercise';

export const NewUserWorkout = types.model({
  workout: types.safeReference(Workout),
  userWorkoutExercises: types.array(NewUserWorkoutExercise),
  completed: types.optional(types.boolean, false),
});

export const UserWorkout = types
  .compose(
    types.model({
      id: types.identifier,
      userWorkoutExercises: types.array(UserWorkoutExercise),
      created_at: types.maybeNull(types.string),
    }),
    NewUserWorkout
  )
  .named('UserWorkout');

export interface NewUserWorkoutType extends Instance<typeof NewUserWorkout> {}
export interface NewUserWorkoutSnapshotInType
  extends SnapshotIn<typeof NewUserWorkout> {}
export interface NewUserWorkoutSnapshotOutType
  extends SnapshotOut<typeof NewUserWorkout> {}

export interface UserWorkoutType extends Instance<typeof UserWorkout> {}
export interface UserWorkoutSnapshotInType
  extends SnapshotIn<typeof UserWorkout> {}
export interface UserWorkoutSnapshotOutType
  extends SnapshotOut<typeof UserWorkout> {}
