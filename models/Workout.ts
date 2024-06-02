import { types, Instance, SnapshotIn, SnapshotOut } from 'mobx-state-tree';
import { WorkoutExercise } from './WorkoutExercise';

export const Workout = types
  .model('Workout', {
    id: types.maybeNull(types.identifier),
    name: types.string,
    workoutExercises: types.array(WorkoutExercise),
    created_at: types.maybeNull(types.string),
  })
  .actions((self) => ({
    setName: (value: string) => {
      self.name = value;
    },
  }));

export interface WorkoutType extends Instance<typeof Workout> {}
export interface WorkoutSnapshotInType extends SnapshotIn<typeof Workout> {}
export interface WorkoutSnapshotOutType extends SnapshotOut<typeof Workout> {}
