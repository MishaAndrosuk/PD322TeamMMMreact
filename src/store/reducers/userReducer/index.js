const initialState = {
    user: null,
    isAuth: false,
};

export const UserReducer = (state = initialState, action) => {
    switch (action.type) {

        case "USER_LOGIN":
            return { ...state, isAuth: true };

        case "USER_LOGOUT":
            return { ...state, user: null, isAuth: false };

        case "USER_GET_ME":
            return { ...state, user: action.payload, isAuth: true };
            
        case "USER_DELETE":
            return {...state, user: null, isAuth: false};
        
        default:
            return state;

    }
};
