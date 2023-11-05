import 'react-native-url-polyfill/auto';
import { useState, useEffect } from 'react';
import { supabase } from '@lib/supabase';
import Auth from '@components/Auth';
import Account from '@components/Account';
import { View } from 'react-native';

export default function Home() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <View flex={1}>
      <View marginTop="auto" marginBottom="auto">
        {session && session.user ? (
          <Account key={session.user.id} session={session} />
        ) : (
          <Auth />
        )}
      </View>
    </View>
  );
}
