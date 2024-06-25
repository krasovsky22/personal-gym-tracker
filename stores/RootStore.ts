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
import { ExercisesStore, ExercisesStoreType } from './ExercisesStore';

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
  .views((self) => ({
    get isInitialized() {
      return self.exercisesStore?.isInitialized;
    },
  }))
  .actions((self) => ({
    setExerciseStore: (store: ExercisesStoreType) => {
      self.exercisesStore = store;
    },
  }))
  .actions((self) => ({
    async initialize() {
      if (self.authStore.isLoggedIn && self.exercisesStore === null) {
        const store = await ExercisesStore.create();
        self.setExerciseStore(store);
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
