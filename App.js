import React, { useEffect } from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider, useDispatch, useSelector } from 'react-redux';
import thunk from 'redux-thunk';
import { StyleSheet } from 'react-native';
import MainNavigator from './navigators/MainNavigator';
import AuthNavigator from './navigators/AuthNavigator';
import AppLoading from 'expo-app-loading';
import reportReducer, { setFetchedReports } from './reducers/reportReducer';
import toggleReducers from './reducers/toggleReducers';
import currentUserReducer, {
  setCurrentUser
} from './reducers/currentUserReducer';

const reducers = combineReducers({
  reports: reportReducer,
  currentUser: currentUserReducer,
  toggles: toggleReducers
});
const store = createStore(reducers, applyMiddleware(thunk));

export default function App() {
  const Navigation = () => {
    const dispatch = useDispatch();
    const { showLogin, checked } = useSelector((state) => state.toggles);

    useEffect(() => {
      // initializes the redux store with reports and user data from firebase
      dispatch(setCurrentUser());
      if (!showLogin) dispatch(setFetchedReports());
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
