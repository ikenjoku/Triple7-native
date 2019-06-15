import {
  FETCH_MENU,
  FETCH_MENU_SUCCESS,
  FETCH_MENU_FAILURE,
} from '../actionTypes';
import initialState from './initialState';

const mealReducer = (state = initialState.mealReducer, action) => {
  switch (action.type) {
    case FETCH_MENU:
      return { ...state, isLoading: true };
    case FETCH_MENU_SUCCESS:
      return { ...state, isLoading: false, menu: action.menu, error: null };
    case FETCH_MENU_FAILURE:
      return { ...state, isLoading: false, error: action.error };
    default:
      return state;
  }
};

export default mealReducer;