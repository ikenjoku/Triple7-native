import React from 'react';
import { createDrawerNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import MenuStack from './MenuNavigator';
import Reservation from '../Screens/MainScreen/ReservationScreen';
import Favorites from '../Screens/MainScreen/FavoritesScreen';
import Contact from '../Screens/MainScreen/ContactScreen';
import Orders from '../Screens/MainScreen/OrdersScreen';
import About from '../Screens/MainScreen/AboutScreen';

const MainStack = createDrawerNavigator({
  Menu: {
    screen: MenuStack,
    navigationOptions: () => ({
      title: 'Menu',
      drawerIcon: () => (
        <Icon
          name='food-fork-drink'
          type='material-community'
          size={24}
          color='#777f7c'
        />
      ),
    }),
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
  Contact: {
    screen: Contact,
  },
  About: {
    screen: About
  }
});

export default MainStack;