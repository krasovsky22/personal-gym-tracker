import { types } from 'mobx-state-tree';

export const Exercise = types
  .model('Exercise', {
    id: types.identifier,
    name: types.string,
    created_at: types.string,
  })
  .actions((self) => ({
    setName: (name) => {
      self.name = name;
    },
  }));
