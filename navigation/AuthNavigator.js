import React from 'react';
import { createStackNavigator } from 'react-navigation';

import LoginScreen from '../Screens/AuthScreen/LoginScreen';
import RegisterScreen from '../Screens/AuthScreen/RegisterScreen';
import ResetPasswordScreen from '../Screens/AuthScreen/ResetPasswordScreen';

const AuthStack = createStackNavigator(
  {
    Login: LoginScreen,
    Register: RegisterScreen,
    ResetPassword:ResetPasswordScreen
  },{
    headerMode: 'none',
  });

  export default AuthStack;
