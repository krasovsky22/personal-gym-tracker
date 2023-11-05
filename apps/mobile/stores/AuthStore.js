import { types, onSnapshot, getSnapshot } from 'mobx-state-tree';
import { AsyncStorage } from 'react-native';

export const AuthStore = types
  .model('AuthStore', {
    identifier: types.optional(types.identifier, 'AuthStore'),
  })
  .actions((self) => ({}));
