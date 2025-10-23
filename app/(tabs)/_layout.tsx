
import React, { useEffect } from 'react';
import { Platform, View } from 'react-native';
import { Stack, Redirect } from 'expo-router';
import FloatingTabBar, { TabBarItem } from '@/components/FloatingTabBar';
import { useApp } from '@/contexts/AppContext';

export default function TabLayout() {
  const { isAuthenticated } = useApp();

  // Redirect to auth if not authenticated
  if (!isAuthenticated) {
    return <Redirect href="/auth" />;
  }

  const tabs: TabBarItem[] = [
    {
      name: 'index',
      route: '/(tabs)/',
      icon: 'sparkles',
      label: 'Tricks',
    },
    {
      name: 'random',
      route: '/(tabs)/random',
      icon: 'shuffle',
      label: 'Random',
    },
    {
      name: 'favorites',
      route: '/(tabs)/favorites',
      icon: 'heart.fill',
      label: 'Favorites',
    },
    {
      name: 'account',
      route: '/(tabs)/account',
      icon: 'person.fill',
      label: 'Account',
    },
    {
      name: 'settings',
      route: '/(tabs)/settings',
      icon: 'gear',
      label: 'Settings',
    },
  ];

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'none',
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="random" />
        <Stack.Screen name="favorites" />
        <Stack.Screen name="account" />
        <Stack.Screen name="settings" />
      </Stack>
      <FloatingTabBar tabs={tabs} containerWidth={350} />
    </>
  );
}
