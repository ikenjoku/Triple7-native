import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  HOME_DELIVERY,
  MAKE_ORDER,
  MAKE_ORDER_SUCCESS,
  MAKE_ORDER_FAILURE,
  FETCH_ORDERS,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAILURE,
  MAKE_RESERVATION,
  MAKE_RESERVATION_SUCCESS,
  MAKE_RESERVATION_FAILURE,
} from '../actionTypes';
import API from '../axiosConfig';
import { toastError, toastSuccess } from './notifications';
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

export const removeFromCart = (prevCart, {name}) => {
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

export const fetch_orders = () => ({
  type: FETCH_ORDERS,
});

export const fetch_orders_success = (orders) => ({
  type: FETCH_ORDERS_SUCCESS,
  orders,
});

export const fetch_orders_failure = (error) => ({
  type: FETCH_ORDERS_FAILURE,
  error,
});

export const make_reservation = () => ({
  type: MAKE_RESERVATION,
});

export const make_reservation_success = () => ({
  type: MAKE_RESERVATION_SUCCESS,
});

export const make_reservation_failure = (error) => ({
  type: MAKE_RESERVATION_FAILURE,
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

export const fetchMyOrder = () => (dispatch) => {
  dispatch(fetch_orders());
  return  API.get('/my-orders')
    .then((response) => {
      dispatch(fetch_orders_success(response.data.orders));
    })
    .catch(error => {
      if (error.response) {
        dispatch(fetch_orders_failure(error.response.data));
      } else {
        toastError('Network Error! Check your internet connection and retry');
        dispatch(fetch_orders_failure({ message: 'Error fetching orders' }));
      }
    });
};

export const makeAReservation = (reservation) => (dispatch) => {
  console.log(reservation, '🔥🔥🔥🔥🔥🔥')
  dispatch(make_reservation());
  return  API.post('/reservations', reservation)
    .then(() => {
      dispatch(make_reservation_success());
      toastSuccess('Reservation received!', 'bottom');
    })
    .catch(error => {
      if (error.response) {
        dispatch(make_reservation_failure(error.response.data));
        toastError(error.response.data.message, 'bottom');
      } else {
        toastError('Network Error! Check your internet connection and retry');
        dispatch(make_reservation_failure({ message: 'Error making reservation' }));
      }
    });
};