import http from "../../../http_common"

export const refreshTokens = async () => {
    try {
        const response = await http.post('user/refresh/', { refresh: localStorage.getItem('refresh') });

        const { access, refresh } = response.data;

        localStorage.setItem('access', access);
        localStorage.setItem('refresh', refresh);

    } catch (error) {
        console.error(error);
    }
}

export const getMe = () => async (dispatch) => {
    try {
        const token = localStorage.getItem("access");

        const response = await http.get("user/me/",{
            headers: { Authorization: `Bearer ${token}` },
        });

        dispatch({ type: "USER_GET_ME", payload: response.data});

    } catch (error) {        
        if (error.response && error.response.status === 401) {
            try {
                await refreshTokens();

                const token = localStorage.getItem('access');
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

export const registerUser = (values) => async (dispatch) => {
    try {
        const response = await http.post("user/register/", values);
        const { access, refresh } = response.data;
        
        localStorage.setItem('access', access);
        localStorage.setItem('refresh', refresh);
        localStorage.setItem('isAuthSuccess', true);
        localStorage.setItem('role', values.role);

        dispatch({ type: "USER_LOGIN" });
        dispatch(getMe());

        return { status: response.status };
    } catch (error) {
        return { status: error.response.status, message: error.response.data};

    }
};


export const loginUser = (data) => async (dispatch) => {
    try {
        const response = await http.post("user/login/", data);
        const { access, refresh } = response.data;

        localStorage.setItem('access', access);
        localStorage.setItem('refresh', refresh);

        dispatch({ type: "USER_LOGIN" });
        dispatch(getMe());

        return { status: response.status};
    } catch (error) {
        return { status: error.response.status, message: error.response.data.error};
    }
};


export const logoutUser = () => async (dispatch) => {
    try {
        await http.post('user/logout/',
                { refresh: localStorage.getItem('refresh') },
                { headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
            });

        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("isAuthSuccess");
        localStorage.removeItem("role");

        dispatch({ type: "USER_LOGOUT" });

    } catch (error) {
        if (error.response && error.response.status === 401) {
            await refreshTokens();

            await http.post('user/logout/',
            { refresh: localStorage.getItem('refresh') },
            { headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
            });

            localStorage.removeItem("access");
            localStorage.removeItem("refresh");

            dispatch({ type: "USER_LOGOUT" });
        }
    }

};


export const updateUser = (data) => async (dispatch) => {
    try {
        const token = localStorage.getItem("access");

        await http.patch("user/update-user/", data, {
            headers: { Authorization: `Bearer ${token}` },
        });

        dispatch(getMe());

    } catch (error) {
        if (error.response && error.response.status === 401) {
            try {
                await refreshTokens();

                const token = localStorage.getItem('access');
                await http.patch("user/update-user/", data, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                dispatch(getMe());

            } catch (refreshError) {
                console.error(refreshError);
            }
        }

        console.error(error)

    }
};


export const updateAvatar = (avatar) => async (dispatch) => {
    try {
        const formData = new FormData();
        formData.append("avatar", avatar);
    
        await http.patch("/user/update-avatar/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        });
        dispatch(getMe());

    } catch (error) {
        if (error.response && error.response.status === 401) {
            try {
                await refreshTokens();

                const formData = new FormData();
                formData.append("avatar", avatar);
            
                await http.patch("/user/update-avatar/", formData, {
                  headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${localStorage.getItem("access")}`,
                  },
                });
                
                dispatch(getMe());

            } catch (refreshError) {
                console.error(refreshError);
            }
        }

        console.error(error)

    }
};


export const delete_user = () => async (dispatch) => {
    try {
    
        await http.delete("/user/delete-user/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        });
        
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");

        dispatch({ type: "USER_DELETE"});

    } catch (error) {
        if (error.response && error.response.status === 401) {
            try {
                await refreshTokens();

                await http.delete("/user/delete-user/", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access")}`,
                    },
                });

                localStorage.removeItem("access");
                localStorage.removeItem("refresh");
        
                dispatch({ type: "USER_DELETE"});
          
            } catch (refreshError) {
                console.error(refreshError);
            }
        }

        console.error(error)
    }
}
