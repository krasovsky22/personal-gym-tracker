import { Redirect, Stack, Tabs } from 'expo-router';
import { View } from 'react-native';
import useAuthStore from '@hooks/useAuthStore';
import { observer } from 'mobx-react-lite';

function Layout() {
  const { isLoggedIn } = useAuthStore();

  console.log('layout is logged in - asdasd', isLoggedIn);

  if (!isLoggedIn) {
    return <Redirect href="/auth/sign-in" />;
  }

  return (
    <>
      <Stack.Screen options={{ title: 'My home' }} />
      <Tabs
        screenOptions={{
          headerShown: false,
        }}
      />
    </>
  );
}

export default observer(Layout);
