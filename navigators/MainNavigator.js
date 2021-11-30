import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../views/HomeScreen';
import ProfileScreen from '../views/ProfileScreen';
import NewReport from '../views/NewReport';
import ReportsPage from '../views/ReportsPage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider } from 'react-native-paper';
import MapScreen from '../views/MapScreen';
import EventListScreen from '../views/EventListScreen';
import EventScreen from '../views/EventScreen';
import { StyleSheet, Image } from 'react-native';

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
function LogoTitle() {
  return (
    <Image
      resizeMode="contain"
      style={{ width: 100, height: 30 }}
      source={require('../assets/Logo.png')}
    />
  );
}
const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeStack"
        component={HomeScreen}
        options={{ headerShown: false }}
      />

      <HomeStack.Screen name="MapScreen" component={MapScreen}  />

      <HomeStack.Screen name="EventListScreen" component={EventListScreen}/>

      <HomeStack.Screen name="EventScreen" component={EventScreen} />
    </HomeStack.Navigator>
  );
};

const NewStackScreen = () => {
  return (
    <NewStack.Navigator>
      <NewStack.Screen
        name="Reports"
        component={ReportsPage}
        options={{ headerShown: false }}
      />
      <NewStack.Screen
        name="NewStack"
        component={NewReport}
        options={{ headerShown: true }}
      />
      <HomeStack.Screen name="EventScreen" component={EventScreen} />
      <HomeStack.Screen name="MapScreen" component={MapScreen}  />
    </NewStack.Navigator>
  );
};

const ProfileStackScreen = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="ProfileStack"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </ProfileStack.Navigator>
  );
};

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <PaperProvider>
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: '#007bff'
          }}
        >
          <Tab.Screen
            name="Home"
            component={HomeStackScreen}
            options={{
              tabBarLabel: 'Home',
              tabBarIcon: ({ color }) => (
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
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons
                  name="plus-circle"
                  color={color}
                  size={26}
                />
              ),
              headerShown: false
            }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileStackScreen}
            options={{
              tabBarLabel: 'Profile',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons
                  name="account"
                  color={color}
                  size={26}
                />
              ),
              headerShown: false
            }}
          />
        </Tab.Navigator>
      </PaperProvider>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  button: {
    fontFamily: 'Inter_400Regular',

    marginLeft: 'auto',

    backgroundColor: '#007bff',
    borderRadius: 44 / 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2
  }
});

export default MainNavigator;
