import React, { Component } from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';

import MainNavigator from './MainNavigator';
import AuthNavigator from './AuthNavigator';
import OnboardingNavigator from './OnboardingNavigator';

const TopLevelNavigator = createSwitchNavigator({
  Main: MainNavigator,
  Auth: AuthNavigator,
  Onboard:OnboardingNavigator
});

export default createAppContainer(TopLevelNavigator);