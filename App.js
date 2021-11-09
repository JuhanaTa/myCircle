import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import MainNavigator from './navigators/MainNavigator';
import firebase from 'firebase';
import AuthNavigator from './navigators/AuthNavigator';
import AppLoading from 'expo-app-loading';
export default function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [checked, setChecked] = useState(false);

  const checkLogin = async () => {
    await firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        console.log('current user', user.uid);
        setShowLogin(false);
        setChecked(true);
      } else {
        console.log('no auth');
        setShowLogin(true);
        setChecked(true);
      }
    });
  };
  console.log(showLogin);
  const Navigation = () => {
    if(checked) {
      if (!showLogin) {
        console.log('showing main');
        return <MainNavigator></MainNavigator>;
      } else {
        console.log('showing auth');
        return <AuthNavigator></AuthNavigator>;
      }
    } else {
      return <AppLoading />;
    }
    
  };

  useEffect(() => {
    checkLogin();
  }, []);

  return <Navigation></Navigation>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
