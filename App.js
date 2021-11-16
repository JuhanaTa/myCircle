import React, { useEffect, useState } from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider, useDispatch } from 'react-redux';
import thunk from 'redux-thunk';
import { StyleSheet } from 'react-native';
import MainNavigator from './navigators/MainNavigator';
import firebase from 'firebase';
import AuthNavigator from './navigators/AuthNavigator';
import AppLoading from 'expo-app-loading';
import reportReducer, {setFetchedReports} from './reducers/reportReducer';
import toggleReducers from './reducers/toggleReducers';

const reducers = combineReducers({
  reports: reportReducer,
  toggles: toggleReducers,
});
const store = createStore(reducers, applyMiddleware(thunk));

export default function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [checked, setChecked] = useState(false);

  const checkLogin = async () => {
    await firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        console.log('current user', user);
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
    const dispatch = useDispatch();

    useEffect(() => {
      // initializes the redux store with data from firebase
      dispatch(setFetchedReports());
    }, [dispatch]);

    if (checked) {
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

  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
