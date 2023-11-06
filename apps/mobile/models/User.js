import { types } from 'mobx-state-tree';

export const User = types.model('User', {
  id: types.identifier,
  email: types.string,

  access_token: types.string,
  refresh_token: types.string,
  expires_at: types.number,
  expires_in: types.number,
  token_type: types.string,
});
