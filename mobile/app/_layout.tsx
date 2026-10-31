import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationLightTheme,
  Stack,
  ThemeProvider,
} from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import { MD3DarkTheme, MD3LightTheme, PaperProvider, type MD3Theme } from 'react-native-paper';

import { TasksProvider } from '@/state/TasksProvider';

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  // Keeps a back button when the app is opened directly on a modal screen.
  initialRouteName: '(tabs)',
};

/** Headers and the tab bar use the same colours as the Paper components. */
function withPaperColors(base: typeof NavigationLightTheme, paper: MD3Theme) {
  return {
    ...base,
    colors: {
      ...base.colors,
      primary: paper.colors.primary,
      background: paper.colors.background,
      card: paper.colors.elevation.level2,
      text: paper.colors.onSurface,
      border: paper.colors.outlineVariant,
      notification: paper.colors.error,
    },
  };
}

const lightNavigationTheme = withPaperColors(NavigationLightTheme, MD3LightTheme);
const darkNavigationTheme = withPaperColors(NavigationDarkTheme, MD3DarkTheme);

export default function RootLayout() {
  const isDark = useColorScheme() === 'dark';

  return (
    <PaperProvider theme={isDark ? MD3DarkTheme : MD3LightTheme}>
      <ThemeProvider value={isDark ? darkNavigationTheme : lightNavigationTheme}>
        <TasksProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="add-task"
              options={{ presentation: 'modal', title: 'Activitate nouă' }}
            />
          </Stack>
        </TasksProvider>
        <StatusBar style="auto" />
      </ThemeProvider>
    </PaperProvider>
  );
}
