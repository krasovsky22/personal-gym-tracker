import { types } from 'mobx-state-tree';
import { WorkoutExercise } from './WorkoutExercise';

export const Workout = types
  .model('Workout', {
    id: types.identifier,
    name: types.string,
    workoutExercises: types.array(WorkoutExercise),
    created_at: types.string,
  });
