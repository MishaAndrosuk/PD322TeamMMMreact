const initialState = {
  user: null,
  isAuth: false,
};

export const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
      case "USER_LOGIN":
      case "SIGN_UP":
          return { ...state, isAuth: true };

      case "USER_GET_ME":
          return { ...state, user: action.payload, isAuth: true };

      case "USER_LOGOUT":
      case "USER_DELETE":
          return { ...state, user: null, isAuth: false };

      default:
          return state;
  }
};
