import React, { Component } from 'react';
import { connect } from "react-redux";
import { View, Text, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { Header, Icon, Button, ListItem } from 'react-native-elements';
import Swipeout from 'react-native-swipeout';
import * as Animatable from 'react-native-animatable';
import { getData, storeData } from "../../utils/asyncStore";
import { ScrollView } from 'react-native-gesture-handler';
import CustomHeader from "../../components/Header";


class FavoritesScreen extends Component {
  state = {
    favorites: [],
    refreshing: false
  }

  componentDidMount() {
    this.fetchFavorites();
  }

  fetchFavorites = () => {
    return getData('@triple-cokie')
      .then((favs) => {
        if (favs) {
          this.setState(() => ({ favorites: favs }));
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  onRefresh = () => {
    this.fetchFavorites();
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

  removeFavorite = (meal) => {
    const { favorites } = this.state;
    const newFavs = favorites.filter(item => meal.name !== item.name);
    return storeData('@triple-cokie', newFavs)
      .then((updatedFavs) => {
        this.setState(() => ({ favorites: updatedFavs }));
      })
      .catch(err => {
        console.log(err);
      });
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

  renderMealItem = (meal, i) => {
    const { navigation } = this.props;
    const swipeButton = [
      {
        text: 'Delete',
        onPress: () => {
          this.removeFavorite(meal);
        },
        backgroundColor: '#B32F20',
        color: '#f9f9f9'
      }
    ];
    return (
      <Swipeout key={i} right={swipeButton} autoClose={true}>
        <ListItem
          leftAvatar={{ source: { uri: meal.imgurl } }}
          title={meal.name}
          subtitle={meal.description}
          onPress={() => this.navigateToMenu(meal)}
        />
      </Swipeout>
    )
  }

  navigateToMenu = (meal) => {
    const { menu, navigation } = this.props;
    const inMenu = menu.find(item => meal.name === item.name);
    if (inMenu) {
      navigation.navigate('MealDetail', { meal })
    }
  }
  render() {
    const { favorites, refreshing } = this.state;
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <CustomHeader
          title={'Favorites'}
          navigation={this.props.navigation}
          rightComponent={this.renderRightHeaderIcon}
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
            <View>
              <Icon
                raised
                name='md-refresh'
                type='ionicon'
                size={30}
                color='#2FBE74'
                onPress={() => { this.fetchFavorites() }}
                containerStyle={{ marginTop: '20%' }}
              />
            </View>
          </View>
        ) : (
            <ScrollView
              style={{ flex: 1 }}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={this.onRefresh}
                />
              }
            >
              {
                favorites.map(this.renderMealItem)
              }
              <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                paddingTop: '3%'
              }}>
                <Icon
                  name='angle-double-left'
                  type='font-awesome'
                  size={20}
                  color='#777f7c'
                  containerStyle={{ marginRight: '3%' }}
                />
                <Text style={{ fontWeight: 'bold' }}>Slide left to delete</Text>
                <Icon
                  name='angle-double-left'
                  type='font-awesome'
                  size={20}
                  color='#777f7c'
                  containerStyle={{ marginLeft: '3%' }}
                />
              </View>
              <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                paddingTop: '3%'
              }}>
                <Icon
                  name='angle-double-down'
                  type='font-awesome'
                  size={20}
                  color='#777f7c'
                  containerStyle={{ marginRight: '3%' }}
                />
                <Text style={{ fontWeight: 'bold' }}>Scroll down to update</Text>
                <Icon
                  name='angle-double-down'
                  type='font-awesome'
                  size={20}
                  color='#777f7c'
                  containerStyle={{ marginLeft: '3%' }}
                />
              </View>
            </ScrollView>
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

const mapStateToProps = ({ mealReducer }) => ({
  menu: mealReducer.menu,
});

export default connect(mapStateToProps, {})(FavoritesScreen);