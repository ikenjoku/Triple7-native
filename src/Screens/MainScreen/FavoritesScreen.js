import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';


class FavoritesScreen extends Component {

  static navigationOptions = {
    drawerLabel: "My Favorites"
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={[{ backgroundColor: '#60992D' }, styles.container]}>
        <Text>FAVORITES-SCREEN</Text>
        <Button
          title="Reserve a table"
          onPress={() => navigate('Reservation')}
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

export default FavoritesScreen;