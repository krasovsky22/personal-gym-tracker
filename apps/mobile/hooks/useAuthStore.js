import React from 'react';
import { RootStoreContext } from '@stores/RootStore';

function useAuthStore() {
  const { authStore } = React.useContext(RootStoreContext);
  if (authStore === null) {
    throw new Error('Store cannot be null, please add a context provider');
  }
  return authStore;
}

export default useAuthStore;
