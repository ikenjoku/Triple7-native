import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  SIGNUP_USER,
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_FAILURE,
  LOGOUT_USER,
} from '../actionTypes';
import API from '../axiosConfig';

export const logout_user = () => ({
  type: LOGOUT_USER,
});

export const login_user = () => ({
  type: LOGIN_USER,
  isLoading: true,
});

export const login_user_success = (user) => ({
  type: LOGIN_USER_SUCCESS,
  user,
});

export const login_user_failure = (error) => ({
  type: LOGIN_USER_FAILURE,
  error,
});

export const signup_user = () => ({
  type: SIGNUP_USER,
  isLoading: true,
});

export const signup_user_success = (user) => ({
  type: SIGNUP_USER_SUCCESS,
  user,
});

export const signup_user_failure = (error) => ({
  type: SIGNUP_USER_FAILURE,
  error,
});

// ActionCreators
export const loginUser = (loginDetails) => (dispatch) => {
  dispatch(login_user());
  return API.get('/auth/login', loginDetails)
    .then(response => {
      console.log(response);
      // dispatch(login_user_success(response.data.user));
      // API.defaults.headers.common['authorization'] = '';
    })
    .catch(error => {
      console.error(error);
      dispatch(login_user_failure(error));
    });
};

export const signupUser = (signupDetails) => (dispatch) => {
  dispatch(login_user());
  return API.get('/auth/register', signupDetails)
    .then(response => {
      console.log(response);
      // dispatch(signup_user_success(response.data.user));
      // API.defaults.headers.common['authorization'] = '';
    })
    .catch(error => {
      console.error(error);
      dispatch(signup_user_failure(error));
    });
};


export const logoutAUser = () => (dispatch) => {
  API.defaults.headers.common['authorization'] = '';
  dispatch(logout_user());
};