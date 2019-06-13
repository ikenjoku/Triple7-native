import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

class Cart extends Component {

  static navigationOptions = {
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={[{ backgroundColor: '#60992D' }, styles.container]}>
        <Text>CART-SCREEN</Text>
        <Button
          title="Make Payment"
          onPress={() => navigate('Payment')}
        />
      </View>
    );
  }
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
