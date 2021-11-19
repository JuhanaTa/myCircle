import firebase from 'firebase';
import { getUser, updateUser } from '../controllers/firebaseController';
import { loginOff, loginOn, toggleCheckedOn } from './toggleReducers';

const currentUserReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return action.currentUser;
    case 'MODIFY_USER':
      return action.modifiedUser;
    default:
      return state;
  }
};

const setCurrentUser = () => {
  return async (dispatch) => {
    await firebase.auth().onAuthStateChanged(async (user) => {
      if (user != null) {
       // console.log('current user', user);
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
// user data is of type object, {...userData}
const modifyCurrentUser = (userData) => {
  return async (dispatch) => {
    try {
      const modifiedUser = await updateUser(userData);
      dispatch({
        type: 'MODIFY_USER',
        modifiedUser
      });
    } catch (error) {
      console.log('user update error', error);
    }
  };
};

export { currentUserReducer as default, setCurrentUser, modifyCurrentUser };
