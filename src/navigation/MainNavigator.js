import React from 'react';
import { createDrawerNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import MenuStack from './MenuNavigator';
import Reservation from '../Screens/MainScreen/ReservationScreen';
import Favorites from '../Screens/MainScreen/FavoritesScreen';
import Contact from '../Screens/MainScreen/ContactScreen';
import Orders from '../Screens/MainScreen/OrdersScreen';
import About from '../Screens/MainScreen/AboutScreen';

import CustomDrawerContentComponent from '../components/CustomDrawerContentComponent';

const MainStack = createDrawerNavigator({
  Menu: {
    screen: MenuStack,
    navigationOptions: ({ navigation }) => ({
      title: 'Menu',
      drawerIcon: () => (
        <Icon
          name='food-fork-drink'
          type='material-community'
          size={24}
          color={ navigation.isFocused ? '#006025' : '#777f7c' }
        />
      ),
    }),
  },
  Reservation: {
    screen: Reservation,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Reserve Table',
      drawerIcon: () => (
        <Icon
          name='tags'
          type='antdesign'
          size={24}
          color={ navigation.isFocused ? '#006025' : '#777f7c' }
        />
      ),
    })
  },
  Orders: {
    screen: Orders,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Order History',
      drawerIcon: () => (
        <Icon
          name='history'
          type='font-awesome'
          size={24}
          color={ navigation.isFocused ? '#006025' : '#777f7c' }
        />
      ),
    })
  },
  Favorites: {
    screen: Favorites,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'My Favorites',
      drawerIcon: () => (
        <Icon
          name='like1'
          type='antdesign'
          size={24}
          color={ navigation.isFocused ? '#006025' : '#777f7c' }
        />
      ),
    })
  },
  Contact: {
    screen: Contact,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'Contact',
      drawerIcon: () => (
        <Icon
          name={'contacts'}
          size={24}
          type={'ant-design'}
          color={ navigation.isFocused ? '#006025' : '#777f7c' }
        />
      ),
    })
  },
  About: {
    screen: About,
    navigationOptions: ({ navigation }) => ({
      drawerLabel: 'About Triple 7',
      drawerIcon: () => (
        <Icon
          name='info-outline'
          type='material-icons'
          size={24}
          color={ navigation.isFocused ? '#006025' : '#777f7c' }
        />
      ),
    })
  }
},{
  initialRouteName: 'Menu',
  contentComponent: CustomDrawerContentComponent,
  contentOptions: {
    activeTintColor: '#006025',
    activeBackgroundColor: '#bde8cd',
  }
});

export default MainStack;