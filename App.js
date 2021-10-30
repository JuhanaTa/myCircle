import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import MainNavigator from './navigators/MainNavigator';
import firebase from 'firebase';
import AuthNavigator from './navigators/AuthNavigator';
export default function App() {
  const [showLogin, setShowLogin] = useState(false);

  const checkLogin = async () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        console.log('current user', user.uid);
        setShowLogin(false);
      } else {
        console.log('no auth');
        setShowLogin(true);
      }
    });
  };
  console.log(showLogin);
  const Navigation = () => {
    if (!showLogin) {
      console.log('showing main');
      return <MainNavigator></MainNavigator>;
    } else {
      console.log('showing auth');
      return <AuthNavigator></AuthNavigator>;
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  return <Navigation></Navigation>;
}
