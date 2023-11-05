import { Stack } from 'expo-router';
import { Platform } from 'react-native';
import { lightColors, createTheme, ThemeProvider } from '@rneui/themed';

const theme = createTheme({
  lightColors: {
    ...Platform.select({
      default: lightColors.platform.android,
      ios: lightColors.platform.ios,
    }),
  },
});

export default function Layout() {
  return (
    <ThemeProvider theme={theme}>
      <Stack screenOptions={{ headerShown: false }} />
    </ThemeProvider>
  );
}
