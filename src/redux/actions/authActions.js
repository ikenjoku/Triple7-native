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
import { toastSuccess, toastError } from './notifications';
import NavigationService from '../../navigation/NavigationService';

export const logout_user = () => ({
  type: LOGOUT_USER,
});

export const login_user = () => ({
  type: LOGIN_USER,
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
});

export const signup_user_success = () => ({
  type: SIGNUP_USER_SUCCESS,
});

export const signup_user_failure = (error) => ({
  type: SIGNUP_USER_FAILURE,
  error,
});

// ActionCreators
export const loginUser = (loginDetails) => (dispatch) => {
  dispatch(login_user());
  return API.post('/auth/login', loginDetails)
    .then(response => {
      dispatch(login_user_success(response.data.user));
      API.defaults.headers.common['authorization'] = response.data.token;
      NavigationService.navigate('Main');
    })
    .catch(error => {
      if (error.response) {
        dispatch(login_user_failure(error.response.data));
        toastError(error.response.data.message);
      } else {
        toastError('Network Error! Check your internet connection and retry');
        dispatch(login_user_failure({ message: 'Error logging in user' }));
      }
    });
};

export const signupUser = (signupDetails) => (dispatch) => {
  dispatch(signup_user());
  return API.post('/auth/register', signupDetails)
    .then(() => {
      toastSuccess('Successfully registered! Login here');
      NavigationService.navigate('Login');
      dispatch(signup_user_success());
    })
    .catch(error => {
      if (error.response) {
        dispatch(signup_user_failure(error.response.data));
        toastError(error.response.data.message);
      } else {
        toastError('Network Error! Check your internet connection and retry');
        dispatch(signup_user_failure({ message: 'Error registering user' }));
      }
    });
};

export const logoutAUser = () => (dispatch) => {
  API.defaults.headers.common['authorization'] = '';
  NavigationService.navigate('Auth');
  dispatch(logout_user());
};