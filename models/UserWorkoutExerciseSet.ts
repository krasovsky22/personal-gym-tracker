import { Instance, SnapshotIn, SnapshotOut, types } from 'mobx-state-tree';


export const NewUserWorkoutExerciseSet = types.model({
  weight: types.optional(types.float, 0.1),
  repeats: types.optional(types.number, 0),
});

export const UserWorkoutExerciseSet = types
  .compose(
    types.model({
      id: types.identifier,
      created_at: types.maybeNull(types.string),
    }),
    NewUserWorkoutExerciseSet
  )
  .named('UserWorkoutExerciseSet');

export interface NewUserWorkoutExerciseSetType
  extends Instance<typeof NewUserWorkoutExerciseSet> {}
export interface NewUserWorkoutExerciseSetSnapshotInType
  extends SnapshotIn<typeof NewUserWorkoutExerciseSet> {}
export interface NewUserWorkoutExerciseSetSnapshotOutType
  extends SnapshotOut<typeof NewUserWorkoutExerciseSet> {}

export interface UserWorkoutExerciseSetType
  extends Instance<typeof UserWorkoutExerciseSet> {}
export interface UserWorkoutExerciseSetSnapshotInType
  extends SnapshotIn<typeof UserWorkoutExerciseSet> {}
export interface UserWorkoutExerciseSetSnapshotOutType
  extends SnapshotOut<typeof UserWorkoutExerciseSet> {}
