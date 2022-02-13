import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LogInScreen from './src/screens/LogInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import MainNav from './src/navigation/MainNav';
import { StatusBar } from 'react-native';

// Main Color Palette
// https://www.palettable.io/E74E35-444444-CED6CE

const Stack = createNativeStackNavigator();
// const Tab = createBottomTabNavigator();

const Auth = () => {
  // Stack navigator for the Login and Sign Up Screen
  return (
    <Stack.Navigator initialRouteName='LogInScreen'>
      <Stack.Screen
        name='LoginScreen'
        component={LogInScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name='SignUpScreen' component={SignUpScreen} />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle='dark-content' />
      <NavigationContainer>
        <Stack.Navigator initialRouteName='LogInScreen'>
          <Stack.Screen
            name='Auth'
            component={Auth}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='MainNav'
            component={MainNav}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
