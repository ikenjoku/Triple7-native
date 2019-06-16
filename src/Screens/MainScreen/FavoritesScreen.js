import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Header, Icon } from 'react-native-elements';


class FavoritesScreen extends Component {

  static navigationOptions = {
    drawerLabel: "My Favorites",
    drawerIcon: () => (
      <Icon
        name='like1'
        type='antdesign'
        size={24}
        color='#777f7c'
      />
    ),
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={[{ backgroundColor: '#60992D' }, styles.container]}>
        <Text>FAVORITES-SCREEN</Text>
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