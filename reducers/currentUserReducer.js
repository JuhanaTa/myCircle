import firebase from 'firebase';
import { getUser } from '../controllers/firebaseController';
import { loginOff, loginOn, toggleCheckedOn } from './toggleReducers';

const currentUserReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return action.currentUser;
    case 'MODIFY_USER':
      return state;
    default:
      return state;
  }
};

const setCurrentUser = () => {
  return async (dispatch) => {
    await firebase.auth().onAuthStateChanged(async (user) => {
      if (user != null) {
        console.log('current user', user);
        dispatch(loginOff());
        dispatch(toggleCheckedOn());
        const currentUser = await getUser(user.uid);
        dispatch({
          type: 'SET_CURRENT_USER',
          currentUser
        });
      } else {
        console.log('no auth');
        dispatch(loginOn());
        dispatch(toggleCheckedOn());
      }
    });
  };
};

const modifyCurrentUser = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: 'MODIFY_USER'
      });
    } catch (error) {
      console.log('user update error', error);
    }
  };
};

export { currentUserReducer as default, setCurrentUser, modifyCurrentUser };
