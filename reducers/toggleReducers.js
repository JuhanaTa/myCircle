const toggleReducer = (
  state = {
    showLogin: false,
    checked: false,
    isSnackbarOpened: false,
    isTickAnimationOpened: false,
    isAvatarOptionsOpened: false
  },
  action
) => {
  switch (action.type) {
    case 'LOGIN_OFF':
      return { ...state, showLogin: false };
    case 'LOGIN_ON':
      return { ...state, showLogin: true };
    case 'CHECK':
      return { ...state, checked: true };
    case 'UNCHECH':
      return { ...state, checked: false };
    case 'SET_SNACKBAR':
      return { ...state, isSnackbarOpened: action.snackbar };
    case 'SET_TICKANIMATION':
      return { ...state, isTickAnimationOpened: !state.isTickAnimationOpened };
    case 'SET_AVATARMENU':
      return { ...state, isAvatarOptionsOpened: !state.isAvatarOptionsOpened };
    default:
      return state;
  }
};

const loginOff = () => {
  return {
    type: 'LOGIN_OFF'
  };
};
const loginOn = () => {
  return {
    type: 'LOGIN_ON'
  };
};

const toggleCheckedOn = () => {
  return {
    type: 'CHECK'
  };
};

const toggleCheckedOff = () => {
  return {
    type: 'UNCHECK'
  };
};

const setSnackbar = (snackbar) => {
  return {
    type: 'SET_SNACKBAR',
    snackbar
  };
};

const setAvatarMenu = () => {
  return async (dispatch) => {
    dispatch({ type: 'SET_AVATARMENU' });
  };
};

const setTickAnimation = () => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_TICKANIMATION'
    });
    await new Promise(() => {
      setTimeout(() => {
        dispatch({
          type: 'SET_TICKANIMATION'
        });
      }, 5000);
    });
  };
};

export {
  toggleReducer as default,
  loginOff,
  loginOn,
  toggleCheckedOn,
  toggleCheckedOff,
  setSnackbar,
  setTickAnimation,
  setAvatarMenu
};
