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

function ProtectedLayout() {
  const { theme } = useTheme();
  const { isLoggedIn } = useAuthStore();
  const { isInitialized, initialize } = useStore<RootStoreType>();

  useEffect(() => {
    isLoggedIn && initialize();
  }, [isLoggedIn]);

  if (!isInitialized) {
    return <Text>Loading app...</Text>;
  }

  if (!isLoggedIn) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.primarylightest },
      ]}
    >
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
          name="user-workouts"
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
