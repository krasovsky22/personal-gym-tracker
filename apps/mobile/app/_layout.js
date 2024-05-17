import 'react-native-url-polyfill/auto';

import { Stack } from 'expo-router';
import { Platform, SafeAreaView, StyleSheet } from 'react-native';
import { lightColors, createTheme, ThemeProvider } from '@rneui/themed';

import { StoreProvider, RootStore } from '@stores/RootStore';

const theme = createTheme({
  lightColors: {
    ...Platform.select({
      default: lightColors.white,
      ios: lightColors.platform.ios,
    }),
  },
  components: {
    Button: (props, theme) => ({
      radius: 'md',
    }),
  },
});

const rootStore = RootStore.create({});

export default function Layout() {
  return (
    <SafeAreaView style={styles.container}>
      <ThemeProvider theme={theme}>
        <StoreProvider value={rootStore}>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          />
        </StoreProvider>
      </ThemeProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: Platform.OS === 'ios' ? 0 : 30,
  },
});
