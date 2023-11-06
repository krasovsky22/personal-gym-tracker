import React from 'react';
import { types, onSnapshot, getSnapshot } from 'mobx-state-tree';
import { AuthStore } from './AuthStore';
import { AsyncStorage } from 'react-native';

export const RootStore = types
  .model('RootStore', {
    identifier: types.optional(types.identifier, 'RootStore'),
    authStore: types.optional(AuthStore, () => AuthStore.create()),
    // navigationStore: types.optional(NavigationStore, () =>
    //   NavigationStore.create({
    //     repoDetailScreenParams: {},
    //     userScreenParams: {},
    //   })
    // ),
  })
  .actions((self) => ({
    async save() {
      try {
        const transformedSnapshot = getSnapshot(self);
        const json = JSON.stringify(transformedSnapshot);

        await AsyncStorage.setItem('appStatePersistenceKey', json);
      } catch (err) {
        console.warn('unexpected error ' + err);
      }
    },
  }));

export const RootStoreContext = React.createContext(null);
export const StoreProvider = RootStoreContext.Provider;
