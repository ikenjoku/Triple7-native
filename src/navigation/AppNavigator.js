import React, { Component } from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';

import MainNavigator from './MainNavigator';
import AuthNavigator from './AuthNavigator';
import OnboardingNavigator from './OnboardingNavigator';

const TopLevelNavigator = createSwitchNavigator({
  Onboard:OnboardingNavigator,
  Main: MainNavigator,
  Auth: AuthNavigator,
});

export default createAppContainer(TopLevelNavigator);