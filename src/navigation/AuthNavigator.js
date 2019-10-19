import { createStackNavigator } from 'react-navigation';

import LoginScreen from '../screens/AuthScreen/LoginScreen';
import RegisterScreen from '../screens/AuthScreen/RegisterScreen';
import ResetPasswordScreen from '../screens/AuthScreen/ResetPasswordScreen';

const AuthStack = createStackNavigator(
  {
    Login: LoginScreen,
    Register: RegisterScreen,
    ResetPassword:ResetPasswordScreen
  },{
    headerMode: 'none',
  });

export default AuthStack;
