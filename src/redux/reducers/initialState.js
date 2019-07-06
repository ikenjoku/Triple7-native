export default {
  themeReducer: {
    theme: {
      pri50: '#e4f6eb',
      pri500: '#00b25c',
      pri700: '#009145',
      pri800: '#007f39',
      sec700: '#be2f79',
      sec900: '#802764',
    },
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
