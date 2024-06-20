import 'react-native-url-polyfill/auto';

import { ThemeProvider, createTheme } from '@rneui/themed';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';

import { RootStore, StoreProvider } from '@stores/RootStore';

const theme = createTheme({
  mode: 'light',
  lightColors: {
    primary: '#134074',
    primaryDarker: '#13315C',
    primaryDarkest: '#0B2545',
    primarylight: '#8DA9C4',
    primarylightest: '#EEF4ED',
  },
  darkColors: {
    primary: '#134074',
    primaryDarker: '#13315C',
    primaryDarkest: '#0B2545',
    primarylight: '#8DA9C4',
    primarylightest: '#EEF4ED',
  },
  components: {
    Button: (props, theme) => ({
      radius: 'md',
    }),
    ListItem: (props, theme) => ({
      containerStyle: {
        backgroundColor: theme.colors.primarylightest,
      },
    }),
    Dialog: (props, theme) => ({
      overlayStyle: {
        backgroundColor: theme.colors.primarylightest,
      },
    }),
    CheckBox: (props, theme) => ({
      wrapperStyle: {
        margin: 0,
        padding: 0,
      },
      containerStyle: {
        height: '100%',
        margin: 0,
        padding: 0,
      },
    }),
  },
});

const rootStore = RootStore.create({});

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [fontsLoaded, fontError] = useFonts({
    ComicKhazi: require('../assets/font/ComicKhazi.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <ThemeProvider theme={theme}>
        <StoreProvider value={rootStore}>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          />
        </StoreProvider>
      </ThemeProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
