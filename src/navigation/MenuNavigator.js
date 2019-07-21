import { createStackNavigator } from 'react-navigation';

import MenuList from '../screens/MainScreen/MenuScreen/MenuList';
import MealDetail from '../screens/MainScreen/MenuScreen/MealDetail';
import Cart from '../screens/MainScreen/MenuScreen/Cart';
import Payment from '../screens/MainScreen/MenuScreen/Payment';

const MenuStack = createStackNavigator({
  MenuList: {
    screen: MenuList,
  },
  MealDetail: {
    screen: MealDetail,
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