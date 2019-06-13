import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';


class OrdersScreen extends Component {

  static navigationOptions = {
    drawerLabel: "Order History"
  }

  render() {
    return (
      <View style={[{ backgroundColor: '#FFFFFF' }, styles.container]}>
        <Text>ORDERS-HISTORY-SCREEN</Text>
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

export default OrdersScreen;