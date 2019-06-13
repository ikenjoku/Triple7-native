import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

class Payment extends Component {

  static navigationOptions = {
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={[{ backgroundColor: '#FFFFFF' }, styles.container]}>
        <Text>PAYMENT-SCREEN</Text>
        <Button
          title="Back to menu"
          onPress={() => navigate('MenuList')}
        />
      </View>
    );
  }
};

export default Payment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
