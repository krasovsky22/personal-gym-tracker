import { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { observer } from 'mobx-react-lite';
import { Redirect, Tabs } from 'expo-router';
import { Icon, useTheme } from '@rneui/themed';
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

  if (!isLoggedIn) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  if (!isInitialized) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size={'large'} />
        <Text>Initializing App...</Text>
      </View>
    );
  }

  return (
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default observer(ProtectedLayout);
