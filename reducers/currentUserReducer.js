import firebase from "firebase";
import {getUser} from "../controllers/firebaseController";

const currentUserReducer = (state = [], action) => {
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
    const currentUser = await getUser();
    dispatch({
      type: 'SET_REPORTS',
      currentUser
    });
  };
};

const modifyCurrentUser = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: 'MODIFY_USER',
      });
    } catch (error) {
      console.log('user update error', error);
      
    }
  };
};

export {currentUserReducer as default, setCurrentUser, modifyCurrentUser};