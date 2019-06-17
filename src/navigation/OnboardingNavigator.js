import React from 'react';
import { createStackNavigator } from 'react-navigation';

import OnboardingScreen from '../Screens/OnboardingScreen';

const OnboardingStack = createStackNavigator(
  {
    Onboarding: OnboardingScreen,
  },{
    headerMode: 'none',
  });

  export default OnboardingStack;
