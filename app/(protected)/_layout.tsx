import { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { observer } from 'mobx-react-lite';
import { Redirect, Tabs } from 'expo-router';
import { Icon, useTheme } from '@rneui/themed';
import * as SplashScreen from 'expo-splash-screen';
import { default as MaterialIcon } from 'react-native-vector-icons/MaterialCommunityIcons';

import useStore from '@hooks/useStore';
import useAuthStore from '@hooks/useAuthStore';
import { RootStoreType } from '@stores/RootStore';

// Keep the splash screen visible while we fetch resources
// SplashScreen.preventAutoHideAsync();

function ProtectedLayout() {
  const [appIsReady, setAppIsReady] = useState(false);
  const { theme } = useTheme();
  const { isLoggedIn } = useAuthStore();
  const { isInitialized, initialize } = useStore<RootStoreType>();

  useEffect(() => {
    isLoggedIn && initialize();
  }, [isLoggedIn]);

  useEffect(() => {
    if (isInitialized) {
      setAppIsReady(true);
    }
  }, [isInitialized]);

  const onLayoutRootView = useCallback(async () => {
    if (isInitialized) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
        await SplashScreen.hideAsync();
    }
  }, [isInitialized]);

  if (!isLoggedIn) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <Tabs
        screenOptions={{
          headerShown: false,
          unmountOnBlur: true,
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
            tabBarLabel: 'Home',
            tabBarIcon: () => <Icon name="home" color={theme.colors.primary} />,
          }}
        />
        <Tabs.Screen
          name="workouts"
          options={{
            title: 'Workout',
            tabBarLabel: 'Workout',
            tabBarIcon: () => (
              <MaterialIcon
                name="dumbbell"
                color={theme.colors.warning}
                size={25}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Settings',
            tabBarLabel: 'Settings',
            tabBarIcon: () => (
              <Icon name="settings" color={theme.colors.primary} />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default observer(ProtectedLayout);
