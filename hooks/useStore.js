import React from 'react';
import { RootStoreContext } from '@stores/RootStore';

function useStore(storeName = null) {
  const store = React.useContext(RootStoreContext);
  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider');
  }

  if (storeName === null) {
    return store;
  }

  const requestedStore = store?.[storeName] ?? null;
  if (requestedStore === null) {
    throw new Error(
      'Requested cStore cannot be null, please add a context provider'
    );
  }

  return requestedStore;
}

export default useStore;
