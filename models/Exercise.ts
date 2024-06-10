import { types, Instance, SnapshotIn, SnapshotOut } from 'mobx-state-tree';

export const Exercise = types
  .model('Exercise', {
    id: types.maybeNull(types.identifier),
    name: types.string,
    icon_url:
      'https://uxwing.com/wp-content/themes/uxwing/download/fitness-gym-yoga-spa/gym-dumbbell-icon.svg',
    created_at: types.maybeNull(types.string),
  })
  .actions((self) => ({
    setName: (name: string) => {
      self.name = name;
    },
  }));

export interface ExerciseType extends Instance<typeof Exercise> {}
export interface ExerciseSnapshotInType extends SnapshotIn<typeof Exercise> {}
export interface ExerciseSnapshotOutType extends SnapshotOut<typeof Exercise> {}
