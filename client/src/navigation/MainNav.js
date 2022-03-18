import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';
import HomeScreen from '../screens/HomeScreen';
import CreateEventScreen from '../screens/CreateEventScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();

const MainNav = ({ route, navigation }) => {
  return (
    // Bottom Tab Navigator menu for Home and Create Event
    <SafeAreaProvider>
      <Tab.Navigator>
        <Tab.Screen
          name='Home'
          component={HomeScreen}
          options={{
            headerShown: false,
            tabBarIcon: (props) => (
              <Icon type='font-awesome-5' name='home' color={props.color} />
            ),
          }}
        />
        <Tab.Screen
          name='Create'
          component={CreateEventScreen}
          options={{
            headerShown: false,
            tabBarIcon: (props) => (
              <Icon
                type='font-awesome-5'
                name='plus-circle'
                color={props.color}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </SafeAreaProvider>
  );
};

export default MainNav;
