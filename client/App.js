import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainNav from './src/navigation/MainNav';
import EventScreen from './src/screens/EventScreen';
import EditEventScreen from './src/screens/EditEventScreen';
import ListScreen from './src/screens/ListScreen';
import { StatusBar } from 'react-native';

// Main Color Palette
// https://www.palettable.io/E74E35-444444-CED6CE

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle='dark-content' />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name='MainNav'
            component={MainNav}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='Event'
            component={EventScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='Edit'
            component={EditEventScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='List'
            component={ListScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
