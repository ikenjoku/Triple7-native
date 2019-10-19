import { createStackNavigator } from 'react-navigation';

import OnboardingScreen from '../screens/OnboardingScreen';

const OnboardingStack = createStackNavigator(
  {
    Onboarding: OnboardingScreen,
  },{
    headerMode: 'none',
  });

export default OnboardingStack;
