import 'react-native-reanimated'
import '@/styles/unistyles'

import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import { useInitialTheme } from 'react-native-unistyles'
import { useThemeStore } from '@/stores'
import { useColorScheme } from '@/hooks/useColorScheme'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { KeyboardProvider } from 'react-native-keyboard-controller'
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator'
import { db } from '@/db'
import migrations from '@/drizzle/migrations'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  //= ========= HOOKS ==========
  const colorScheme = useColorScheme()
  const initialTheme = useThemeStore((state) => state.theme)
  useInitialTheme('light')
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    JetBrains: require('../assets/fonts/JetBrainsMonoNerdFontMono-Regular.ttf'),
  })
  const { success } = useMigrations(db, migrations)

  //= ========= EFFECTS ==========
  useEffect(() => {
    if (loaded && success) {
      SplashScreen.hideAsync()
    }
  }, [loaded, success])

  if (!loaded || !success) {
    return null
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <SafeAreaProvider>
        <KeyboardProvider>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(chats)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
        </KeyboardProvider>
      </SafeAreaProvider>
    </ThemeProvider>
  )
}
