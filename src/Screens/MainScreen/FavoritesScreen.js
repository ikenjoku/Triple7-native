import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Header, Icon, Button, ListItem } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import { getData, deleteData } from "../../utils/asyncStore";


class FavoritesScreen extends Component {
  state = {
    favorites: [
      // {
      //   name: 'dfsd', description: 'dsdsdsds', _id: 'sd12'
      // }
    ],
  }

  componentDidMount() {
    const favorites = getData('@triple-cokie');
    if (favorites) {
      this.setState({ favorites });
    }
  }

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

  renderMenuIcon = (navigation) => {
    return <Icon
      name='menu'
      size={35}
      color='#fff'
      underlayColor='transparent'
      onPress={() => navigation.toggleDrawer()}
    />
  }

  renderRightHeaderIcon = (navigation) => {
    return <Icon
      name='home'
      size={35}
      color='#fff'
      underlayColor='transparent'
      onPress={() => navigation.navigate('Menu')}
    />
  }

  renderNoList = () => {
    return (
      <View style={[{ backgroundColor: '#eaeaea', alignItems: "center" }]}>
        <Icon
          name='meh'
          type='antdesign'
          size={80}
          color='#777f7c'
          containerStyle={{ marginTop: '20%' }}
        />
        <Text style={{ fontSize: 20 }}>You have not liked any meal?</Text>
      </View>
    )
  }

  renderMenuItem = meal => {
    return (
      <View>
        <Text>{meal.name}</Text>
        <Text>{meal.description}</Text>
      </View>
    );
  }

  render() {
    const { favorites } = this.state;
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
          <Header
            statusBarProps={{ barStyle: 'light-content', backgroundColor: '#24a060' }}
            containerStyle={styles.header}
            leftComponent={this.renderMenuIcon(navigation)}
            centerComponent={{ text: 'Favorites', style: styles.titleStyle }}
            rightComponent={this.renderRightHeaderIcon(navigation)}
          />
          {!favorites.length ? (
            <View style={[{ backgroundColor: '#eaeaea', alignItems: "center" }]}>
              <Icon
                name='meh'
                type='antdesign'
                size={80}
                color='#777f7c'
                containerStyle={{ marginTop: '20%' }}
              />
              <View style={{ marginTop: '5%', }}>
                <Text style={{ fontSize: 20, }}>You have not liked any meal...</Text>
              </View>
            </View>
          ) : (
              // <View style={[{ backgroundColor: '#60992D' }, styles.container]}>
              //   <Icon
              //     name='like1'
              //     type='antdesign'
              //     size={24}
              //     color='#777f7c'
              //   />
              //   <Text>FAVORITES-found</Text>
              // </View>
              <View style={{flex: 1}}>
                {
                  this.state.favorites.map(this.renderMenuItem)
                }
              </View>
            )}

      </View>
    );

  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#eaeaea',
  },
  header: {
    backgroundColor: '#2FBE74',
    paddingLeft: 20,
    paddingRight: 20,
  },
  titleStyle: {
    color: '#f9f9f9',
    fontSize: 20,
    fontWeight: '600'
  },
  cardTitle: {
    textAlign: 'center',
    fontWeight: '500',
    borderBottomColor: '#aba8a8',
    borderBottomWidth: 1,
    paddingBottom: 10,
    fontSize: 15
  },
  spaceTop: { marginTop: 10 }
});

export default FavoritesScreen;