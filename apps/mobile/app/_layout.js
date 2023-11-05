import { Stack } from 'expo-router';
import { Provider } from 'mobx-react';
import { Platform } from 'react-native';
import { lightColors, createTheme, ThemeProvider } from '@rneui/themed';

import { RootStore } from '@stores/RootStore';

const theme = createTheme({
  lightColors: {
    ...Platform.select({
      default: lightColors.platform.android,
      ios: lightColors.platform.ios,
    }),
  },
});

const rootStore = RootStore.create({});

export default function Layout() {
  return (
    <ThemeProvider theme={theme}>
      <Provider rootStore={rootStore}>
        <Stack screenOptions={{ headerShown: false }} />
      </Provider>
    </ThemeProvider>
  );
}
