import { combineReducers } from 'redux';
import authReducer from './authReducer';
import appReducer from './appReducer';
import mealReducer from './mealReducer';
import initialState from './initialState';
import { LOGOUT_USER } from "../actionTypes";

const baseReducer = combineReducers({
  // appReducer,
  authReducer,
  mealReducer
});

const rootReducer = (state, action) => {
  switch (action.type) {
    case LOGOUT_USER:
      return initialState;
    default:
      return baseReducer(state, action);
  }
};

export default rootReducer;