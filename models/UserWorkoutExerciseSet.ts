import {
  Instance,
  SnapshotIn,
  SnapshotOut,
  flow,
  types,
} from 'mobx-state-tree';
import { NewModel } from './NewModel';

export const UserWorkoutExerciseSet = types
  .compose(
    types.model({
      weight: types.maybeNull(types.string),
      repeats: types.maybeNull(types.number),
      completed: types.optional(types.boolean, false),
    }),
    NewModel
  )
  .named('UserWorkoutExerciseSet')
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

export interface UserWorkoutExerciseSetType
  extends Instance<typeof UserWorkoutExerciseSet> {}
export interface UserWorkoutExerciseSetSnapshotInType
  extends SnapshotIn<typeof UserWorkoutExerciseSet> {}
export interface UserWorkoutExerciseSetSnapshotOutType
  extends SnapshotOut<typeof UserWorkoutExerciseSet> {}
