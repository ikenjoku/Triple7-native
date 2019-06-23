import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  HOME_DELIVERY,
} from '../actionTypes';

export const addToCart = (prevCart, {name, price}) => {
  const newCart;
  const mealIndex = prevCart.findIndex(item => name === item.name);
  if (mealIndex < 0) {
    newCart = prevCart.push({ name, qty: 1, price });
  } else if (mealIndex >= 0) {
    prevCart[mealIndex].qty += 1;
    newCart = [...prevCart];
  }
  return {
    type: ADD_TO_CART,
    payload: newCart,
  }
};

export const removeFromCart = (prevCart, {name, price}) => {
  const newCart;
  const mealIndex = prevCart.findIndex(item => name === item.name);
  if (mealIndex < 0) {
    return;
  } else if (mealIndex >= 0) {
    const meal = prevCart[mealIndex];
    if (meal.qty === 1) {
      newCart = prevCart.splice(mealIndex, 1);
    } else if (meal.qty > 1) {
      prevCart[mealIndex].qty -= 1;
      newCart = [...prevCart];
    }
  }
  return {
    type: REMOVE_FROM_CART,
    payload: newCart,
  }
};

export const clearCart = () => ({
  type: CLEAR_CART,
  payload: [],
});

export const toggleDelivery = (homeDelivery) => ({
  type: HOME_DELIVERY,
  payload: !homeDelivery,
});