import { types, Instance, SnapshotIn, SnapshotOut } from 'mobx-state-tree';
import { WorkoutExercise } from './WorkoutExercise';

export const Workout = types.model('Workout', {
  id: types.identifier,
  name: types.string,
  workoutExercises: types.array(WorkoutExercise),
  created_at: types.string,
});

export interface WorkoutType extends Instance<typeof Workout> {}
export interface WorkoutSnapshotInType extends SnapshotIn<typeof Workout> {}
export interface WorkoutSnapshotOutType extends SnapshotOut<typeof Workout> {}
