import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';


class RegisterScreen extends Component {

  static navigationOptions = {
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={[{ backgroundColor: '#6AD225' }, styles.container]}>
        <Text>REGISTER-SCREEN</Text>
        <Button
          title="ResetPassword"
          onPress={() => navigate('ResetPassword')}
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

export default RegisterScreen;