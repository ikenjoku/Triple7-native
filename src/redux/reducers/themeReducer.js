import {
  CHANGE_THEME,
} from '../actionTypes';
import initialState from './initialState';

const themeReducer = (state = initialState.themeReducer, action) => {
  switch (action.type) {
    case CHANGE_THEME:
      return { ...state, theme: action.theme };
    default:
      return state;
  }
};

export default themeReducer;