import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

class MealDetail extends Component {

  static navigationOptions = {
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={[{ backgroundColor: '#8CAE68' }, styles.container]}>
        <Text>MENU-DETAIL-SCREEN</Text>
        <Button
          title="Go to Cart"
          onPress={() => navigate('Cart')}
        />
      </View>
    );
  }
};
export default MealDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
