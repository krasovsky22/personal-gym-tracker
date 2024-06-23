import { Instance, SnapshotIn, SnapshotOut, types } from 'mobx-state-tree';

import { Exercise } from './Exercise';
import { UserWorkoutExerciseSet } from './UserWorkoutExerciseSet';
import { NewModel } from './NewModel';

export const UserWorkoutExercise = types
  .compose(
    types.model({
      exercise: types.safeReference(Exercise),
      completed: types.optional(types.boolean, false),
      userWorkoutExerciseSets: types.array(UserWorkoutExerciseSet),
    }),
    NewModel
  )
  .named('UserWorkoutExercise');

export interface UserWorkoutExerciseType
  extends Instance<typeof UserWorkoutExercise> {}
export interface UserWorkoutExerciseSnapshotInType
  extends SnapshotIn<typeof UserWorkoutExercise> {}
export interface UserWorkoutExerciseSnapshotOutType
  extends SnapshotOut<typeof UserWorkoutExercise> {}
