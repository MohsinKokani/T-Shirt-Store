import axios from "axios";
const login = (email, password) => {
    return (dispatch) => {
        dispatch({ type: 'LOGIN_REQUEST' });
        const config = {
            headers: { "Content-Type": "application/json" },
            withCredentials: true
        };
        const data = {
            email: email,
            password: password
        };
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include", // To include cookies
            body: JSON.stringify(data)
        };
        const url = "https://tshirtstore-api.onrender.com/user/login";

        try {
            fetch(url, options)
                .then(response => {
                    dispatch({
                        type: 'LOGIN_SUCCESS',
                        payload: response?.data,
                    });
                })
                .catch(error => {
                    console.log(error)
                    dispatch({
                        type: 'LOGIN_FAIL',
                        payload: error.response?.data || 'Error while login',
                    });
                });
        } catch (error) {
            dispatch({
                type: 'LOGIN_FAIL',
                payload: error.message || 'Error while login.',
            });
        }

    }
}
const logout = () => {
    return (dispatch) => [
        axios.get(`${process.env.REACT_APP_FETCH_DOMAIN}/user/logout`)
            .then(data => {
                dispatch({
                    type: 'LOGOUT_SUCCESS',
                    payload: data
                })
            })
            .catch(error => {
                dispatch({
                    type: 'LOGIN_FAIL',
                    payload: error.response?.data || 'Failed to logout'
                })
            })
    ]
}
const register = (userForm) => {
    return (dispatch) => {
        dispatch({ type: 'REGISTER_REQUEST' });
        const body = {
            name: userForm.get('name'),
            email: userForm.get('email'),
            password: userForm.get('password'),
            phone_no: userForm.get('phone_no'),
            avatar: userForm.get('avatar')
        }
        const config = { header: { "Content-Type": 'multipart/form-data' }, withCredentials: true }
        axios.post(`${process.env.REACT_APP_FETCH_DOMAIN}/user/register`, body, config)
            .then(response => {
                dispatch({
                    type: 'REGISTER_SUCCESS',
                    payload: response.data
                })
            })
            .catch(error => {
                dispatch({
                    type: 'REGISTER_FAIL',
                    payload: error?.response.data || 'error while registration'
                })
            })
    }
}
const loadUser = () => {
    return async (dispatch) => {
        dispatch({ type: "LOAD_USER_REQUEST" });

        const config = { headers: { "Content-Type": "application/json" }, withCredentials: true };
        axios.get(`${process.env.REACT_APP_FETCH_DOMAIN}/user/me`, {}, config)
            .then(response => {
                dispatch({
                    type: 'LOAD_USER_SUCCESS',
                    payload: response?.data,
                });
            })
            .catch(error => {
                dispatch({
                    type: 'LOAD_USER_FAIL',
                    payload: error.response?.data || 'Error while login',
                });
            });
    }
}
const resetPasswordMail = (email) => {
    return async (dispatch) => {
        dispatch({ type: "RESET_PASSWORD_REQUEST" });

        const config = { headers: { "Content-Type": "application/json" } };
        axios.post(`${process.env.REACT_APP_FETCH_DOMAIN}/user/forgotPasswordMail`, { email }, config)
            .then(response => {
                dispatch({
                    type: 'RESET_PASSWORD_SUCCESS',
                    payload: response?.data,
                });
            })
            .catch(error => {
                dispatch({
                    type: 'RESET_PASSWORD_FAIL',
                    payload: error.response?.data || 'Error while login',
                });
            });
    }
}
const updateUser = (userForm) => {
    return async (dispatch) => {
        dispatch({ type: "UPDATE_USER_REQUEST" });

        const config = { headers: { "Content-Type": "application/json" }, withCredentials: true };

        const body = {
            name: userForm.get('name'),
            email: userForm.get('email'),
            phone_no: userForm.get('phoneNo'),
            avatar: userForm.get('avatar')
        }
        axios.put(`${process.env.REACT_APP_FETCH_DOMAIN}/user/me/update`, body, config)
            .then(response => {
                dispatch({
                    type: 'UPDATE_USER_SUCCESS',
                    payload: response?.data,
                });
            })
            .catch(error => {
                dispatch({
                    type: 'UPDATE_USER_FAIL',
                    payload: error.response?.data || 'Error while login',
                });
            });
    }
}
const updatePassword = (oldPassword, password, confirmPass) => {
    return async (dispatch) => {
        dispatch({ type: "UPDATE_PASS_REQUEST" });

        const body = { oldPassword, newPassword: password, confirmPassword: confirmPass };
        const config = { headers: { "Content-Type": "application/json" }, withCredentials: true };
        axios.put(`${process.env.REACT_APP_FETCH_DOMAIN}/user/updatePassword`, body, config)
            .then(response => {
                alert(response?.data.message || 'successfully changed');
                dispatch({
                    type: 'UPDATE_PASS_SUCCESS',
                    payload: response?.data,
                });
            })
            .catch(error => {
                dispatch({
                    type: 'UPDATE_PASS_FAIL',
                    payload: error.response?.data || 'Error while login',
                });
            });
    }
}
const clearErrors = () => {
    return (dispatch) => {
        dispatch({
            type: 'CLEAR_ERRORS'
        })
    }
}
export { login, logout, register, clearErrors, loadUser, resetPasswordMail, updateUser, updatePassword }
