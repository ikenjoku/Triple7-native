import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';


class AboutScreen extends Component {

  static navigationOptions = {
    drawerLabel: "About Triple-7"
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={[{ backgroundColor: '#FFFFFF' }, styles.container]}>
        <Text>MENU-SCREEN</Text>
        <Button
          title="Checkout our menu"
          onPress={() => navigate('Menu')}
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

export default AboutScreen;