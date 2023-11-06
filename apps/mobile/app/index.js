import 'react-native-url-polyfill/auto';
import { useState, useEffect } from 'react';

import Auth from '@components/Auth';
import Account from '@components/Account';
import { View } from 'react-native';

import useAuthStore from '@hooks/useAuthStore';

export default function Home() {
  const [session, setSession] = useState(null);

  const { isLoggedIn } = useAuthStore();

  console.log('is Logged In', isLoggedIn);

  return (
    <View flex={1}>
      <View marginTop="auto" marginBottom="auto">
        {session?.user ? (
          <Account key={session.user?.id} session={session} />
        ) : (
          <Auth />
        )}
      </View>
    </View>
  );
}
