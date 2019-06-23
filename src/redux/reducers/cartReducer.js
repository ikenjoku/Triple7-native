import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  HOME_DELIVERY,
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
    default:
      return state;
  }
};

export default cartReducer;