import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../views/HomeScreen';
import ProfileScreen from '../views/ProfileScreen';
import NewReport from '../views/NewReport';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Provider as PaperProvider} from 'react-native-paper';
import MapScreen from '../views/MapScreen';
import EventListScreen from '../views/EventListScreen';
import EventScreen from '../views/EventScreen';

//tab
const Tab = createBottomTabNavigator();

//stacks
const HomeStack = createNativeStackNavigator();
const NewStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();

/* 
    To add navigation to new different screens add them to these stack screens
    for example if you want to access new page from Home tab add that screen to HomeStackScreen
*/
const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeStack"
        component={HomeScreen}
        options={{headerShown: false}}
      />

      <HomeStack.Screen
        name="MapScreen"
        component={MapScreen}
      />

      <HomeStack.Screen
        name="EventListScreen"
        component={EventListScreen}
      />

      <HomeStack.Screen
        name="EventScreen"
        component={EventScreen}
      />
    </HomeStack.Navigator>
  );
};

const NewStackScreen = () => {
  return (
    <NewStack.Navigator>
      <NewStack.Screen
        name="NewStack"
        component={NewReport}
        options={{headerShown: false}}
      />
    </NewStack.Navigator>
  );
};

const ProfileStackScreen = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="ProfileStack"
        component={ProfileScreen}
        options={{headerShown: false}}
      />
    </ProfileStack.Navigator>
  );
};

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <PaperProvider>
        <Tab.Navigator>
          <Tab.Screen
            name="Home"
            component={HomeStackScreen}
            options={{
              tabBarLabel: 'Home',
              tabBarIcon: ({color}) => (
                <MaterialCommunityIcons name="home" color={color} size={26} />
              ),
              headerShown: false
            }}
          />
          <Tab.Screen
            name="New"
            component={NewStackScreen}
            options={{
              tabBarLabel: 'New',
              tabBarIcon: ({color}) => (
                <MaterialCommunityIcons
                  name="plus-circle"
                  color={color}
                  size={26}
                />
              )
              //headerShown: false
            }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileStackScreen}
            options={{
              tabBarLabel: 'Profile',
              tabBarIcon: ({color}) => (
                <MaterialCommunityIcons
                  name="account"
                  color={color}
                  size={26}
                />
              )
              //headerShown: false
            }}
          />
        </Tab.Navigator>
      </PaperProvider>
    </NavigationContainer>
  );
};

export default MainNavigator;
