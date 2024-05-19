import { types, Instance, SnapshotIn, SnapshotOut } from 'mobx-state-tree';

export const User = types.model('User', {
  id: types.identifier,
  email: types.string,

  access_token: types.string,
  refresh_token: types.string,
  expires_at: types.number,
  expires_in: types.number,
  token_type: types.string,
});

export interface UserType extends Instance<typeof User> {}
export interface UserSnapshotInType extends SnapshotIn<typeof User> {}
export interface UserSnapshotOutType extends SnapshotOut<typeof User> {}
