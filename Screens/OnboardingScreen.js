import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';


class OnboardingScreen extends Component {

  static navigationOptions = {
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={[{ backgroundColor: '#FFFFFF' }, styles.container]}>
        <Text>ONBOARDING-SCREEN</Text>
        <Button
          title="Login"
          onPress={() => navigate('Login')}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OnboardingScreen;