import { Instance, SnapshotIn, SnapshotOut, types } from 'mobx-state-tree';

import { Workout } from './Workout';
import { UserWorkoutExercise } from './UserWorkoutExercise';
import { NewModel } from './NewModel';

export const UserWorkout = types
  .compose(
    types.model({
      workout: types.safeReference(Workout),
      completed: types.optional(types.boolean, false),
      workoutDate: types.maybeNull(types.string),
      userWorkoutExercises: types.array(UserWorkoutExercise),
    }),
    NewModel
  )
  .named('UserWorkout');

export interface UserWorkoutType extends Instance<typeof UserWorkout> {}
export interface UserWorkoutSnapshotInType
  extends SnapshotIn<typeof UserWorkout> {}
export interface UserWorkoutSnapshotOutType
  extends SnapshotOut<typeof UserWorkout> {}
