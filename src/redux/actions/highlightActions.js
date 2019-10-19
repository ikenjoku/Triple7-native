import {
  FETCH_HIGHLIGHTS,
  FETCH_HIGHLIGHTS_SUCCESS,
  FETCH_HIGHLIGHTS_FAILURE,
} from '../actionTypes';
import API from '../axiosConfig';

export const fetch_highlights = () => ({
  type: FETCH_HIGHLIGHTS,
  isLoading: true,
});

export const fetch_highlights_success = (highlights) => ({
  type: FETCH_HIGHLIGHTS_SUCCESS,
  highlights,
});

export const fetch_highlights_failure = (error) => ({
  type: FETCH_HIGHLIGHTS_FAILURE,
  error,
});

// ActionCreators
export const fetchHighlights = () => (dispatch) => {
  dispatch(fetch_highlights());
  return API.get('/highlights')
    .then(response => {
      dispatch(fetch_highlights_success(response.data.highlights));
    })
    .catch(error => {
      if (error.response) {
        dispatch(fetch_highlights_failure(error.response.data));
      } else {
        dispatch(fetch_highlights_failure({ message: error.message }));
      }
    });
};