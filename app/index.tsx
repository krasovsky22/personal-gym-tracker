import { Redirect } from 'expo-router';

import useAuthStore from '@hooks/useAuthStore';
import { observer } from 'mobx-react-lite';

function App() {
  const { isLoggedIn } = useAuthStore();

  if (!isLoggedIn) {
    <Redirect href="/(auth)/sign-in" />;
  }

  return <Redirect href="/(protected)/home" />;
}

export default observer(App);
