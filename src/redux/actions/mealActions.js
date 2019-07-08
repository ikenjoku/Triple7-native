import {
  FETCH_MENU,
  FETCH_MENU_SUCCESS,
  FETCH_MENU_FAILURE,
} from '../actionTypes';
import API from '../axiosConfig';
import { toastSuccess, toastError } from './notifications';

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
      if (error.response) {
        dispatch(fetch_menu_failure(error.response.data));
      } else {
        dispatch(fetch_menu_failure({ message: error.message }));
      }
    });
};