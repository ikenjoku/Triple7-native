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
  FETCH_MENU_FAILURE,
} from '../actionTypes';
import initialState from './initialState';

const cartReducer = (state = initialState.cartReducer, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return { ...state, cart: action.payload };
    case REMOVE_FROM_CART:
      return { ...state, cart: action.payload };
    case HOME_DELIVERY:
      return { ...state, homeDelivery: action.payload };
    case CLEAR_CART:
      return { ...state, cart: action.payload };
    case MAKE_ORDER:
      return { ...state, isOrdering: true };
    case MAKE_ORDER_SUCCESS:
      return { ...state, isOrdering: false, cart: [], error: null };
    case MAKE_ORDER_FAILURE:
      return { ...state, isOrdering: false, error: action.error };
    case FETCH_ORDERS:
      return { ...state, isFetching: true };
    case FETCH_ORDERS_SUCCESS:
      return { ...state, isFetching: false, orders: action.orders, error: null };
    case FETCH_MENU_FAILURE:
      return { ...state, isFetching: false, error: action.error };
    default:
      return state;
  }
};

export default cartReducer;