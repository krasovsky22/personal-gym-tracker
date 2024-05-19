import {
  flow,
  types,
  Instance,
  SnapshotIn,
  SnapshotOut,
} from 'mobx-state-tree';

import { supabase } from '@lib/supabase';
import { User, UserSnapshotInType } from '@models/User';

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
    setUser: (user: UserSnapshotInType | null) => {
      self.user = user;
    },
  }))
  .actions((self) => ({
    afterCreate: flow(function* () {
      const { session } = yield supabase.auth.getSession();

      supabase.auth.onAuthStateChange((_event, session) => {
        if (!session) {
          self.setUser(null);
          return;
        }
        const {
          user,
          access_token,
          refresh_token,
          expires_at,
          expires_in,
          token_type,
        } = session;
        const { id, email = '' } = user;

        const authUser = User.create({
          id,
          email,
          access_token,
          refresh_token,
          expires_at: +(expires_at ?? 0),
          expires_in,
          token_type,
        });

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

interface AuthStoreType extends Instance<typeof AuthStore> {}
interface AuthStoreSnapshotInType extends SnapshotIn<typeof AuthStore> {}
interface AuthStoreSnapshotOutType extends SnapshotOut<typeof AuthStore> {}
