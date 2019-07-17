import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  SIGNUP_USER,
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_FAILURE,
} from '../actionTypes';
import initialState from './initialState';

const authReducer = (state = initialState.authReducer, action) => {
  switch (action.type) {
    case SIGNUP_USER:
      return { ...state, isLoading: true };
    case SIGNUP_USER_SUCCESS:
      return { ...state, isLoading: false, error: null };
    case SIGNUP_USER_FAILURE:
      return { ...state, isLoading: false, error: action.error };
    case LOGIN_USER:
      return { ...state, isLoading: true };
    case LOGIN_USER_SUCCESS:
      return { ...state, isLoading: false, error: null, user: action.user };
    case LOGIN_USER_FAILURE:
      return { ...state, isLoading: false, error: action.error };
    default:
      return state;
  }
};

export default authReducer;