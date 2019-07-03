import {
  FETCH_MENU,
  FETCH_MENU_SUCCESS,
  FETCH_MENU_FAILURE,
} from '../actionTypes';
import API from '../axiosConfig';

export const fetch_menu = () => ({
  type: FETCH_MENU,
  isLoading: true,
});

export const fetch_menu_success = (menu) => ({
  type: FETCH_MENU_SUCCESS,
  menu,
});

export const fetch_menu_failure = (error) => ({
  type: FETCH_MENU_FAILURE,
  error,
});

// ActionCreators
export const fetchMenu = () => (dispatch) => {
  dispatch(fetch_menu());
  return API.get('/meals')
    .then(response => {
      dispatch(fetch_menu_success(response.data.meals));
    })
    .catch(error => {
      console.error(error);
      dispatch(fetch_menu_failure(error));
    });
};