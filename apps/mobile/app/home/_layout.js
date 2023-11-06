import { Redirect, Stack, Tabs } from 'expo-router';
import useAuthStore from '@hooks/useAuthStore';
import { observer } from 'mobx-react-lite';

function Layout() {
  const { isLoggedIn } = useAuthStore();

  console.log('layout is logged in -', isLoggedIn);

  if (!isLoggedIn) {
    return <Redirect href="/auth/sign-in" />;
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false, title: 'My home' }} />
      <Tabs />
    </>
  );
}

export default observer(Layout);
