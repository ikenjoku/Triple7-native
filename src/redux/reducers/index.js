import { combineReducers } from 'redux';
import authReducer from './authReducer';
import themeReducer from './themeReducer';
import cartReducer from './cartReducer';
import mealReducer from './mealReducer';
import initialState from './initialState';
import { LOGOUT_USER } from '../actionTypes';

const baseReducer = combineReducers({
  themeReducer,
  authReducer,
  mealReducer,
  cartReducer,
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