import React from 'react';
import { createStackNavigator } from 'react-navigation';

import MenuList from '../Screens/MainScreen/MenuScreen/MenuList';
import MealDetail from '../Screens/MainScreen/MenuScreen/MealDetail';
import Cart from '../Screens/MainScreen/MenuScreen/Cart';
import Payment from '../Screens/MainScreen/MenuScreen/Payment';

const MenuStack = createStackNavigator({
  MenuList: {
    screen: MenuList,
    navigationOptions: () => ({
      title: 'Menu',
      headerBackTitle: null,
    }),
  },
  MealDetail: {
    screen: MealDetail,
    navigationOptions: () => ({
      title: 'Details',
      headerBackTitle: 'Menu',
    }),
  },
  Cart: {
    screen: Cart,
    navigationOptions: () => ({
      title: 'Your Cart',
      headerBackTitle: null,
    }),
  },
  Payment: {
    screen: Payment,
    navigationOptions: () => ({
      title: 'Payment',
      headerBackTitle: 'Cart'
    }),
  },
});

export default MenuStack;