import 'react-native-url-polyfill/auto';

import Auth from '@components/Auth';
import Account from '@components/Account';
import { View } from 'react-native';

import useAuthStore from '@hooks/useAuthStore';
import { observer } from 'mobx-react-lite';

function Home() {
  const { isLoggedIn } = useAuthStore();

  console.log('is Logged In', isLoggedIn);

  return (
    <View flex={1}>
      <View marginTop="auto" marginBottom="auto">
        {isLoggedIn ? <Account /> : <Auth />}
      </View>
    </View>
  );
}

export default observer(Home);
