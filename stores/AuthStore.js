import { types, onSnapshot, getSnapshot, flow } from 'mobx-state-tree';
import { AsyncStorage } from 'react-native';

import { supabase } from '@lib/supabase';
import { User } from '@models/User';

export const AuthStore = types
  .model('AuthStore', {
    identifier: types.optional(types.identifier, 'AuthStore'),
    user: types.maybeNull(User),
  })
  .views((self) => ({
    get isLoggedIn() {
      return self.user !== null;
    },
  }))
  .actions((self) => ({
    setUser: (user) => {
      self.user = user;
    },
    afterCreate: flow(function* () {
      const { session } = yield supabase.auth.getSession();

      supabase.auth.onAuthStateChange((_event, session) => {
        if (!session) {
          self.setUser(null);
          return;
        }
        const { user, ...rest } = session;

        const authUser = {
          ...user,
          ...rest,
        };

        self.setUser(authUser);
      });

      if (!session) {
        self.setUser(null);
        return;
      }

      const { data } = session;
      const { user, ...rest } = data;

      const authUser = {
        ...user,
        ...rest,
      };

      console.log('here');
      self.setUser(authUser);
    }),

    signOut: flow(function* () {
      yield supabase.auth.signOut({ scope: 'local' });
    }),
  }));
