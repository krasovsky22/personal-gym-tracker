import { Instance, SnapshotIn, SnapshotOut, types } from 'mobx-state-tree';

import { Exercise } from './Exercise';
import {
  NewUserWorkoutExerciseSet,
  UserWorkoutExerciseSet,
} from './UserWorkoutExerciseSet';


export const NewUserWorkoutExercise = types.model({
  exercise: types.safeReference(Exercise),
  userWorkoutExerciseSets: types.array(NewUserWorkoutExerciseSet),
  completed: types.optional(types.boolean, false),
});

export const UserWorkoutExercise = types
  .compose(
    types.model({
      id: types.identifier,
      created_at: types.maybeNull(types.string),
      userWorkoutExerciseSets: types.array(UserWorkoutExerciseSet),
    }),
    NewUserWorkoutExercise
  )
  .named('UserWorkoutExercise');

export interface NewUserWorkoutExerciseType
  extends Instance<typeof NewUserWorkoutExercise> {}
export interface NewUserWorkoutExerciseSnapshotInType
  extends SnapshotIn<typeof NewUserWorkoutExercise> {}
export interface NewUserWorkoutExerciseSnapshotOutType
  extends SnapshotOut<typeof NewUserWorkoutExercise> {}

export interface UserWorkoutExerciseType
  extends Instance<typeof UserWorkoutExercise> {}
export interface UserWorkoutExerciseSnapshotInType
  extends SnapshotIn<typeof UserWorkoutExercise> {}
export interface UserWorkoutExerciseSnapshotOutType
  extends SnapshotOut<typeof UserWorkoutExercise> {}
