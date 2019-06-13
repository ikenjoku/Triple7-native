import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';


class ResetPasswordScreen extends Component {

  static navigationOptions = {
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={[{ backgroundColor: '#3FF123' }, styles.container]}>
        <Text>RESETPASSWORD-SCREEN</Text>
        <Button
          title="Onboarding"
          onPress={() => navigate('Onboarding')}
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

export default ResetPasswordScreen;