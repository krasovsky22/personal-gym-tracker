import React from 'react';
import { RootStoreContext, RootStoreType } from '@stores/RootStore';

function useStore<T>(storeName?: keyof RootStoreType): T | RootStoreType {
  const store = React.useContext(RootStoreContext);
  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider');
  }

  if (!storeName) {
    return store;
  }

  const requestedStore = store?.[storeName] ?? null;
  if (requestedStore === null) {
    throw new Error(
      'Requested cStore cannot be null, please add a context provider'
    );
  }

  return requestedStore as T;
}

export default useStore;
