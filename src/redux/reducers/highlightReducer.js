import {
  FETCH_HIGHLIGHTS,
  FETCH_HIGHLIGHTS_SUCCESS,
  FETCH_HIGHLIGHTS_FAILURE,
} from '../actionTypes';
import initialState from './initialState';

const highlightReducer = (state = initialState.highlightReducer, action) => {
  switch (action.type) {
    case FETCH_HIGHLIGHTS:
      return { ...state, isLoading: true };
    case FETCH_HIGHLIGHTS_SUCCESS:
      return { ...state, isLoading: false, highlights: action.highlights, error: null };
    case FETCH_HIGHLIGHTS_FAILURE:
      return { ...state, isLoading: false, error: action.error };
    default:
      return state;
  }
};

export default highlightReducer;