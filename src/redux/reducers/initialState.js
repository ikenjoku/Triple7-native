export default {
  appReducer: {
    isLoading: false,
  },
  authReducer: {
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
    cart: [
      {
        name: 'Rice and Chicken',
        qty: 3,
        price: 600,
      },
      {
        name: 'Semo and Efo',
        qty: 3,
        price: 2100,
      },
      {
        name: 'Ingera',
        qty: 3,
        price: 900,
      },
    ],
  }
}