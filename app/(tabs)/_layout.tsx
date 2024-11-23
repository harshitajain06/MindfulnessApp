// App.js or index.js
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Stack } from 'expo-router'; // Ensure this import is correct
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function App() {
  const colorScheme = useColorScheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: Colors[colorScheme ?? 'light'].background },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: 'Register',
          }}
        />
      </Stack>
    </GestureHandlerRootView>
  );
}
