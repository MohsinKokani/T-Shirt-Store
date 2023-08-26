const config = {
    headers: {
        "Content-Type": "application/json"
    },
    credentials: "include" // To include cookies
};
const login = (email, password) => {
    return async (dispatch) => {
        dispatch({ type: 'LOGIN_REQUEST' });

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
            const response = await fetch(url, options);
            const responseData = await response.json();

            if (response.ok) {
                dispatch({
                    type: 'LOGIN_SUCCESS',
                    payload: responseData,
                });
            } else {
                throw new Error('Failed to login');
            }
        } catch (error) {
            console.error(error);
            dispatch({
                type: 'LOGIN_FAIL',
                payload: error.message || 'Error while login.',
            });
        }
    };
};

const logout = () => {
    return async (dispatch) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_FETCH_DOMAIN}/user/logout`, config);
            const responseData = await response.json();

            if (response.ok) {
                dispatch({
                    type: 'LOGOUT_SUCCESS',
                    payload: responseData
                });
            } else {
                throw new Error('Failed to logout');
            }
        } catch (error) {
            console.error(error);
            dispatch({
                type: 'LOGIN_FAIL',
                payload: error.response?.data || 'Failed to logout'
            });
        }
    };
};

const register = (userForm) => {
    return async (dispatch) => {
        dispatch({ type: 'REGISTER_REQUEST' });

        const body = new FormData();
        body.append('name', userForm.get('name'));
        body.append('email', userForm.get('email'));
        body.append('password', userForm.get('password'));
        body.append('phone_no', userForm.get('phone_no'));
        body.append('avatar', userForm.get('avatar'));

        const config = { credentials: 'include' };

        try {
            const response = await fetch(`${process.env.REACT_APP_FETCH_DOMAIN}/user/register`, {
                method: 'POST',
                body: body,
                ...config
            });

            const responseData = await response.json();

            if (response.ok) {
                dispatch({
                    type: 'REGISTER_SUCCESS',
                    payload: responseData
                });
            } else {
                throw new Error('Failed to register');
            }
        } catch (error) {
            console.error(error);
            dispatch({
                type: 'REGISTER_FAIL',
                payload: error.response?.data || 'Error while registration'
            });
        }
    };
};

const loadUser = () => {
    return async (dispatch) => {
        dispatch({ type: "LOAD_USER_REQUEST" });

        try {
            const response = await fetch(`${process.env.REACT_APP_FETCH_DOMAIN}/user/me`, config);
            const responseData = await response.json();

            if (response.ok) {
                dispatch({
                    type: 'LOAD_USER_SUCCESS',
                    payload: responseData,
                });
            } else {
                throw new Error('Failed to load user');
            }
        } catch (error) {
            console.error(error);
            dispatch({
                type: 'LOAD_USER_FAIL',
                payload: error.response?.data || 'Error while login',
            });
        }
    };
};

const resetPasswordMail = (email) => {
    return async (dispatch) => {
        dispatch({ type: "RESET_PASSWORD_REQUEST" });

        const body = JSON.stringify({ email });
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: body
        };

        try {
            const response = await fetch(`${process.env.REACT_APP_FETCH_DOMAIN}/user/forgotPasswordMail`, options);
            const responseData = await response.json();

            if (response.ok) {
                dispatch({
                    type: 'RESET_PASSWORD_SUCCESS',
                    payload: responseData,
                });
            } else {
                throw new Error('Failed to send reset password email');
            }
        } catch (error) {
            console.error(error);
            dispatch({
                type: 'RESET_PASSWORD_FAIL',
                payload: error.response?.data || 'Error while login',
            });
        }
    };
};

const updateUser = (userForm) => {
    return async (dispatch) => {
        dispatch({ type: "UPDATE_USER_REQUEST" });

        const body = {
            name: userForm.get('name'),
            email: userForm.get('email'),
            phone_no: userForm.get('phoneNo'),
            avatar: userForm.get('avatar')
        };

        try {
            const response = await fetch(`${process.env.REACT_APP_FETCH_DOMAIN}/user/me/update`, {
                method: 'PUT',
                headers: config.headers,
                credentials: 'include',
                body: JSON.stringify(body)
            });

            const responseData = await response.json();

            if (response.ok) {
                dispatch({
                    type: 'UPDATE_USER_SUCCESS',
                    payload: responseData,
                });
            } else {
                throw new Error('Failed to update user');
            }
        } catch (error) {
            console.error(error);
            dispatch({
                type: 'UPDATE_USER_FAIL',
                payload: error.response?.data || 'Error while login',
            });
        }
    };
};

const updatePassword = (oldPassword, password, confirmPass) => {
    return async (dispatch) => {
        dispatch({ type: "UPDATE_PASS_REQUEST" });

        const body = { oldPassword, newPassword: password, confirmPassword: confirmPass };

        try {
            const response = await fetch(`${process.env.REACT_APP_FETCH_DOMAIN}/user/updatePassword`, {
                method: 'PUT',
                headers: config.headers,
                credentials: 'include',
                body: JSON.stringify(body)
            });

            const responseData = await response.json();

            if (response.ok) {
                alert(responseData.message || 'Successfully changed password');
                dispatch({
                    type: 'UPDATE_PASS_SUCCESS',
                    payload: responseData,
                });
            } else {
                throw new Error('Failed to update password');
            }
        } catch (error) {
            console.error(error);
            dispatch({
                type: 'UPDATE_PASS_FAIL',
                payload: error.response?.data || 'Error while login',
            });
        }
    };
};

const clearErrors = () => {
    return (dispatch) => {
        dispatch({
            type: 'CLEAR_ERRORS'
        });
    };
};

export { login, logout, register, clearErrors, loadUser, resetPasswordMail, updateUser, updatePassword };
