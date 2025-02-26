import { jwtDecode } from "jwt-decode";
import http from "../../../http_common"

export const signIn = (token) => async (dispatch) => {
    try {
        const user = jwtDecode(token);
        
        localStorage.setItem("isAuthSuccess", true);
        localStorage.setItem("role", "Student");

        dispatch({ type: "USER_LOGIN" });
        await dispatch(getMe());

        return { status: 200 };
    } catch (error) {
        return { status: 400, message: error.message };
    }
};

export const signUp = (token) => (dispatch) => {
    try {
        const user = jwtDecode(token);
        
        localStorage.setItem("isAuthSuccess", true);
        localStorage.setItem("role", "Student");
        
        dispatch({ type: "USER_LOGIN", payload: user });
        dispatch(getMe());
    } catch (error) {
        console.error("Sign up error:", error);
    }
};

export const getMe = () => async (dispatch) => {
    try {
        const token = localStorage.getItem("user");

        const response = await http.get("user/me/",{
            headers: { Authorization: `Bearer ${token}` },
        });

        dispatch({ type: "USER_GET_ME", payload: response.data});

    } catch (error) {        
        if (error.response && error.response.status === 401) {
            try {
                await refreshTokens();

                const token = localStorage.getItem('user');
                const response = await http.get('user/me/', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                dispatch({ type: "USER_GET_ME", payload: response.data });

            } catch (refreshError) {
                console.error(refreshError);
            }
        }

        console.error(error)
    }
};

