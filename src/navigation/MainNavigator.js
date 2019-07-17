import React from 'react';
import { createDrawerNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import MenuStack from './MenuNavigator';
import Reservation from '../Screens/MainScreen/ReservationScreen';
import Highlights from '../Screens/MainScreen/HighlightsScreen';
import Favorites from '../Screens/MainScreen/FavoritesScreen';
import Contact from '../Screens/MainScreen/ContactScreen';
import Orders from '../Screens/MainScreen/OrdersScreen';
import About from '../Screens/MainScreen/AboutScreen';

import CustomDrawerContentComponent from '../components/CustomDrawerContentComponent';

const MainStack = createDrawerNavigator({
  Menu: {
    screen: MenuStack,
    navigationOptions: {
      title: 'Menu',
      drawerIcon: () => (
        <Icon
          name='food-fork-drink'
          type='material-community'
          size={24}
          color='#777f7c'
        />
      ),
    },
  },
  Reservation: {
    screen: Reservation,
  },
  Orders: {
    screen: Orders,
  },
  Favorites: {
    screen: Favorites,
  },
  Highlights: {
    screen: Highlights,
  },
  About: {
    screen: About,
  },
  Contact: {
    screen: Contact,
  }
},{
  initialRouteName: 'Menu',
  contentComponent: CustomDrawerContentComponent,
  contentOptions: {
    activeTintColor: 'black',
    activeBackgroundColor: '#e6e6e6',
  }
});

export default MainStack;