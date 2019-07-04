export default {
  appReducer: {
    isLoading: false,
  },
  authReducer: {
    isLoading: false,
    user: null,
    error: null,
  },
  mealReducer: {
    isLoading: false,
    menu: [],
    error: null,
  },
  cartReducer: {
    homeDelivery: false,
    cart: [],
  }
};
