import React from 'react';
import { createDrawerNavigator } from 'react-navigation';

import MenuStack from './MenuNavigator';
import Reservation from '../Screens/MainScreen/ReservationScreen';
import Favorites from '../Screens/MainScreen/FavoritesScreen';
import Orders from '../Screens/MainScreen/OrdersScreen';
import About from '../Screens/MainScreen/AboutScreen';

const MainStack = createDrawerNavigator({
  Menu: {
    screen: MenuStack,
  },
  Reservation: {
    screen: Reservation,
  },
  Favorites: {
    screen: Favorites,
  },
  Orders: {
    screen: Orders,
  },
  About: {
    screen: About
  }
});

export default MainStack;