import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  HOME_DELIVERY,
  MAKE_ORDER,
  MAKE_ORDER_SUCCESS,
  MAKE_ORDER_FAILURE,
} from '../actionTypes';
import API from '../axiosConfig';
import { toastError } from './notifications';
import NavigationService from '../../navigation/NavigationService';

export const addToCart = (prevCart, {name, price}) => {
  let newCart;
  const mealIndex = prevCart.findIndex(item => name === item.name);
  if (mealIndex < 0) {
    prevCart.push({ name, qty: 1, price });
    newCart = [...prevCart];
  } else if (mealIndex >= 0) {
    prevCart[mealIndex].qty += 1;
    newCart = [...prevCart];
  }
  return {
    type: ADD_TO_CART,
    payload: newCart,
  };
};

export const removeFromCart = (prevCart, {name, price}) => {
  let newCart;
  const mealIndex = prevCart.findIndex(item => name === item.name);
  if (mealIndex < 0) {
    return;
  } else if (mealIndex >= 0) {
    const meal = prevCart[mealIndex];
    if (meal.qty === 1) {
      prevCart.splice(mealIndex, 1);
      newCart = [...prevCart];
    } else if (meal.qty > 1) {
      prevCart[mealIndex].qty -= 1;
      newCart = [...prevCart];
    }
  }
  return {
    type: REMOVE_FROM_CART,
    payload: newCart,
  };
};

export const clearCart = () => ({
  type: CLEAR_CART,
  payload: [],
});

export const toggleDelivery = (homeDelivery) => ({
  type: HOME_DELIVERY,
  payload: !homeDelivery,
});

export const make_order = () => ({
  type: MAKE_ORDER,
});

export const make_order_success = () => ({
  type: MAKE_ORDER_SUCCESS,
});

export const make_order_failure = (error) => ({
  type: MAKE_ORDER_FAILURE,
  error,
});

export const makeAnOrder = (order) => (dispatch) => {
  dispatch(make_order());
  return  API.post('/orders', order)
    .then(() => {
      dispatch(make_order_success());
      NavigationService.navigate('Payment');
    })
    .catch(error => {
      if (error.response) {
        dispatch(make_order_failure(error.response.data));
        toastError(error.response.data.message);
      } else {
        toastError('Network Error! Check your internet connection and retry');
        dispatch(make_order_failure({ message: 'Error registering user' }));
      }
    });
};