import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';


class LoginScreen extends Component {

  static navigationOptions = {
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={[{ backgroundColor: '#FFFFFF' }, styles.container]}>
        <Text>LOGIN-SCREEN</Text>
        <Button
          title="Register"
          onPress={() => navigate('Register')}
        />
        <Button
          title="Main"
          onPress={() => navigate('Main')}
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

export default LoginScreen;