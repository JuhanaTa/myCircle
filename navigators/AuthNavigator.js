import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import LoginPage from '../views/LoginPage';
import RegisterPage from '../views/RegisterPage';


//stacks

const LoginStack = createNativeStackNavigator();


const AuthStackScreen = () => {
  return (
    <LoginStack.Navigator>
      <LoginStack.Screen
        name="LoginPage"
        component={LoginPage}
        options={{ headerShown: false }}
      />
    <LoginStack.Screen
        name="RegisterPage"
        component={RegisterPage}
        options={{ headerShown: false }}
      />

    </LoginStack.Navigator>
  );
};


const AuthNavigator = () => {
  return (
    <NavigationContainer>
      <PaperProvider>
        <AuthStackScreen></AuthStackScreen>
      </PaperProvider>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  navibar: {
    backgroundColor: 'red'
  }
});

export default AuthNavigator;