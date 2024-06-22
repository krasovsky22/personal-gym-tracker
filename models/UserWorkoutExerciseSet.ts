import {
  Instance,
  SnapshotIn,
  SnapshotOut,
  flow,
  types,
} from 'mobx-state-tree';

export const NewUserWorkoutExerciseSet = types
  .model({
    weight: types.maybeNull(types.string),
    repeats: types.maybeNull(types.number),
    completed: types.optional(types.boolean, false),
  })
  .actions((self) => ({
    setWeight: (value: string) => {
      self.weight = value;
    },

    setRepeats: (value: number) => {
      self.repeats = value;
    },

    toggleCompleted: () => {
      self.completed = !self.completed;
    },
  }))
  .actions((self) => ({
    save: flow(function* () {}),
  }));

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
