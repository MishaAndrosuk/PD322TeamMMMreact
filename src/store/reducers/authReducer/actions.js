import { jwtDecode } from "jwt-decode";

export const login = (token) => (dispatch) => {
    try {
        const user = jwtDecode(token);
        dispatch({ type: "LOGIN", payload: user });
    } catch (error) {
        console.error("login error: ", error);
    }
};

export const register = (token) => (dispatch) => {
    try {
        const user = jwtDecode(token);
        dispatch({ type: "REGISTER", payload: user });
    } catch (error) {
        console.error("register error: ", error);
    }
};

export const logout = () => (dispatch) => {
    localStorage.removeItem("auth");
    dispatch({ type: "LOGOUT" });
};