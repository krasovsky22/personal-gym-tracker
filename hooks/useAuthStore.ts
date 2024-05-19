import { AuthStoreType } from '@stores/AuthStore';
import useStore from './useStore';

const useAuthStore = () =>
  useStore<AuthStoreType>('authStore') as AuthStoreType;

export default useAuthStore;
