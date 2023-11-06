import React from 'react';
import { RootStoreContext } from '@stores/RootStore';

function useStore() {
  const store = React.useContext(RootStoreContext);
  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider');
  }
  return store;
}

export default useStore;
