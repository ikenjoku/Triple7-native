import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, RefreshControl } from 'react-native';
import { Icon, ListItem } from 'react-native-elements';
import { NavigationEvents } from 'react-navigation';
import Swipeout from 'react-native-swipeout';
import { getData, storeData } from '../../utils/asyncStore';
import { ScrollView } from 'react-native-gesture-handler';
import CustomHeader from '../../components/Header';


class FavoritesScreen extends Component {
  state = {
    favorites: [],
    refreshing: false
  }

  static navigationOptions = {
    drawerLabel: 'My Favorites',
    drawerIcon: () => (
      <Icon
        name='like1'
        type='antdesign'
        size={24}
        color='#777f7c'
      />
    ),
  };


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
      size={24}
      color='#fff'
      underlayColor='transparent'
      onPress={() => navigation.navigate('Menu')}
    />;
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
      <View style={[{ backgroundColor: '#eaeaea', alignItems: 'center' }]}>
        <Icon
          name='meh'
          type='antdesign'
          size={80}
          color='#777f7c'
          containerStyle={{ marginTop: '20%' }}
        />
        <Text style={{ fontSize: 20 }}>You have not liked any meal?</Text>
      </View>
    );
  }

  renderMealItem = (meal, i) => {
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
    );
  }

  navigateToMenu = (meal) => {
    const { menu, navigation } = this.props;
    const inMenu = menu.find(item => meal.name === item.name);
    if (inMenu) {
      navigation.navigate('MealDetail', { meal });
    }
  }
  render() {
    const { favorites, refreshing } = this.state;
    return (
      <View style={styles.container}>
        <CustomHeader
          title={'Favorites'}
          navigation={this.props.navigation}
          rightComponent={this.renderRightHeaderIcon}
        />
        {!favorites.length ? (
          <View style={[{ backgroundColor: '#eaeaea', alignItems: 'center' }]}>
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
                // color={theme.pri500}
                onPress={this.fetchFavorites}
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
        <NavigationEvents onDidFocus={this.fetchFavorites} />
      </View>
    );

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#eaeaea',
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

const mapStateToProps = ({ mealReducer, themeReducer }) => ({
  menu: mealReducer.menu,
  theme: themeReducer.theme
});

export default connect(mapStateToProps, {})(FavoritesScreen);