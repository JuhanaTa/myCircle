const toggleReducer = (
  state = { showLogin: false, checked: false },
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

export {toggleReducer as default, loginOff, loginOn, toggleCheckedOn, toggleCheckedOff};
