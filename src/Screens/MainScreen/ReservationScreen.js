import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';


class ReservationScreen extends Component {

  static navigationOptions = {
    drawerLabel: "Reserve Table"
  }

  render() {
    return (
      <View style={[{ backgroundColor: '#8CAE68' }, styles.container]}>
        <Text>RESERVATION-SCREEN</Text>
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

export default ReservationScreen;