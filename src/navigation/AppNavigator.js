import React, { Component } from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { connect } from 'react-redux';
import { Root } from 'native-base';
import MainNavigator from './MainNavigator';
import AuthNavigator from './AuthNavigator';
import OnboardingNavigator from './OnboardingNavigator';
import { getData } from '../utils/asyncStore';
import NavigationService from './NavigationService';

const TopLevelNavigator = createSwitchNavigator({
  Onboard:OnboardingNavigator,
  Main: MainNavigator,
  Auth: AuthNavigator,
});

const TopLevelAppNavigator = createAppContainer(TopLevelNavigator);

class RootApp extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.fetchTutorialToken();
  }

  fetchTutorialToken = () => {
    const { user } = this.props;
    getData('@triple-tutorial-cookie')
      .then(tutorialToken => {
        if (!tutorialToken) {
          NavigationService.navigate('Onboard');
        } else {
          if (user) {
            NavigationService.navigate('Main');
          } else {
            NavigationService.navigate('Auth');
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <Root>
        <TopLevelAppNavigator
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
      </Root>
    );
  }
}
const mapStateToProps = ({ authReducer }) => ({
  user: authReducer.user,
});

export default connect(mapStateToProps, { })(RootApp);
