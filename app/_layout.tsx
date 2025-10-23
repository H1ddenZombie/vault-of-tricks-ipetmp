
import React, { useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { SystemBars } from "react-native-edge-to-edge";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import * as Notifications from 'expo-notifications';
import { AppProvider, useApp } from "@/contexts/AppContext";
import "react-native-reanimated";

SplashScreen.preventAutoHideAsync();

function RootLayoutContent() {
  const router = useRouter();
  const { isDarkMode } = useApp();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  // Handle notification responses
  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(response => {
      const data = response.notification.request.content.data;
      
      if (data.type === 'trick_of_the_day') {
        // Navigate to random trick
        router.push('/(tabs)/random');
      } else if (data.type === 'daily_reminder') {
        // Navigate to tricks page
        router.push('/(tabs)');
      }
    });

    return () => subscription.remove();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={isDarkMode ? DarkTheme : DefaultTheme}>
      <SystemBars style={isDarkMode ? "light" : "dark"} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="auth" />
        <Stack.Screen name="trick-detail" />
        <Stack.Screen name="account-settings" />
        <Stack.Screen name="all-completed" />
        <Stack.Screen name="notification-settings" />
      </Stack>
      <StatusBar style={isDarkMode ? "light" : "dark"} />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppProvider>
        <RootLayoutContent />
      </AppProvider>
    </GestureHandlerRootView>
  );
}
