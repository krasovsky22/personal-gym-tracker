import React from 'react';
import { AsyncStorage } from 'react-native';
import { types, getSnapshot } from 'mobx-state-tree';
import { AuthStore } from './AuthStore';
import { ExercisesStore } from './ExercisesStore';

export const RootStore = types
  .model('RootStore', {
    identifier: types.optional(types.identifier, 'RootStore'),
    authStore: types.optional(AuthStore, () => AuthStore.create()),
    exercisesStore: types.maybeNull(ExercisesStore),
    // navigationStore: types.optional(NavigationStore, () =>
    //   NavigationStore.create({
    //     repoDetailScreenParams: {},
    //     userScreenParams: {},
    //   })
    // ),
  })
  .actions((self) => ({
    initialize() {
      if (self.authStore.isLoggedIn && self.exercisesStore === null) {
        self.exercisesStore = ExercisesStore.create();
      }
    },
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
