import 'react-native-url-polyfill/auto';

import { Stack } from 'expo-router';
import { Platform } from 'react-native';
import { lightColors, createTheme, ThemeProvider } from '@rneui/themed';

import { StoreProvider, RootStore } from '@stores/RootStore';

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
      <StoreProvider value={rootStore}>
        <Stack screenOptions={{ headerShown: false }} />
      </StoreProvider>
    </ThemeProvider>
  );
}
