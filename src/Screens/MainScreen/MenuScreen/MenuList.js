import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { createStackNavigator } from "react-navigation";


class MenuList extends Component {

  static navigationOptions = {
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={[{ backgroundColor: '#F6511D' }, styles.container]}>
        <Text>MENU-LIST-SCREEN</Text>
        <Button
          title="Menu Details"
          onPress={() => navigate('MealDetail')}
        />
        <Button
          title="Onboarding"
          onPress={() => navigate('Onboarding')}
        />
        <Button
          title="Auth"
          onPress={() => navigate('Auth')}
        />
      </View>
    );
  }
};

export default MenuList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
