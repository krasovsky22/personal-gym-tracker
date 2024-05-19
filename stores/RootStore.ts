import React from 'react';
import {
  flow,
  types,
  Instance,
  SnapshotIn,
  SnapshotOut,
  getSnapshot,
} from 'mobx-state-tree';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AuthStore } from './AuthStore';
import { ExercisesStore } from './ExercisesStore';

export const RootStore = types
  .model('RootStore', {
    identifier: types.optional(types.identifier, 'RootStore'),
    authStore: types.optional(AuthStore, () => AuthStore.create()),
    exercisesStore: types.optional(ExercisesStore, () =>
      ExercisesStore.create()
    ),
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

export interface RootStoreType extends Instance<typeof RootStore> {}
export interface RootStoreSnapshotInType extends SnapshotIn<typeof RootStore> {}
export interface RootStoreSnapshotOutType
  extends SnapshotOut<typeof RootStore> {}

export const RootStoreContext = React.createContext<RootStoreType | null>(null);
export const StoreProvider = RootStoreContext.Provider;
