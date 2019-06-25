import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import { Card, Icon, Button, Badge, Header } from 'react-native-elements';
import { getData, deleteData, storeData } from "../../../utils/asyncStore";
import { addToCart } from "../../../redux/actions/cartActions";

class MealDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: [],
    };
  }

  static navigationOptions = {
    header: null,
  }

  componentDidMount() {
    getData('@triple-cokie')
      .then(response => {
        console.log('componentDidMount', response);
        if (response) {
          console.log(response);
          this.setState(() => ({ favorites: response }));
        } else {
          console.log(response);
          this.setState(() => ({ favorites: [] }));
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  addFavorite = (meal) => {
    return getData('@triple-cokie')
    .then(response => {
      console.log(response);
      if (response) {
        const updatedFavs = [...response, meal];
        return storeData('@triple-cokie', updatedFavs)
          .then((newFavs) => {
            this.setState(() => ({ favorites: newFavs }));
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        return storeData('@triple-cokie', [meal])
          .then((newFavs) => {
            console.log(newFavs);
            this.setState(() => ({ favorites: newFavs }));
          })
          .catch(err => {
            console.log(err);
          });
      }
    })
    .catch(err => {
      console.log(err);
    })
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
      onPress={() => navigation.navigate('MenuList')}
    />
  }

  isFavorite = (name) => {
    const result = this.state.favorites.filter(meal => meal.name === name);
    return result.length > 0;
  }

  render() {
    const { navigation, addToCart, cart } = this.props;
    const { meal } = navigation.state.params;
      return (
        <View style={styles.container}>
          <Animatable.View animation="fadeInRightBig" duration={400}>
            <Header
              statusBarProps={{ barStyle: 'light-content', backgroundColor: '#24a060' }}
              containerStyle={styles.header}
              leftComponent={this.renderMenuIcon(navigation)}
              centerComponent={{ text:  `${meal.name }`, style: styles.titleStyle }}
              rightComponent={this.renderRightHeaderIcon(navigation)}
            />
            { meal ?
              (
              <Card
                image={{ uri: meal.imgurl }}
                imageStyle={{
                  height: 250,
                }}
                containerStyle={{
                  borderRadius: 5,
                  marginBottom: '3%',
                  marginTop: '3%'
                }}
                imageWrapperStyle={{
                  width: '100%',
                }}
              >
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ marginBottom: 10, fontWeight: '700' }}>
                    {meal.name}
                  </Text>
                  <Badge value={meal.category} textStyle={{ color: '#2FBE74' }} badgeStyle={{ backgroundColor: '#fff', padding: 5, borderColor: '#2FBE74' }} />
                  <Icon
                    name={this.isFavorite(meal.name) ? 'favorite' : 'favorite-border'}
                    size={35}
                    color='#B32F20'
                    onPress={!this.isFavorite(meal.name) ? () => this.addFavorite(meal) : () => this.removeFavorite(meal)}
                  />
                </View>
                <Text style={{ marginBottom: 10 }}>
                  {meal.description}
                </Text>
                <Button
                  raised
                  type='solid'
                  title='Add to Cart'
                  onPress={() => addToCart(cart, { name: meal.name, price: meal.price })}
                  buttonStyle={{ backgroundColor: "#B32F20" }}
                  titleStyle={{ color: "#f9f9f9" }}
                  containerStyle={{
                    marginTop: '2%',
                    marginBottom: '5%'
                  }}
                />
                <Button
                  type='outline'
                  title='Bact to Menu'
                  buttonStyle={{ borderColor: "#2FBE74", backgroundColor: "#f9f9f9" }}
                  titleStyle={{ color: "#2FBE74", paddingLeft: 5 }}
                  onPress={() => navigation.navigate('MenuList')}
                  containerStyle={{
                    marginBottom: '2%'
                  }}
                  iconLeft
                  icon={
                    <Icon
                      name="back"
                      size={25}
                      color="#2FBE74"
                      type='antdesign'
                    />
                  }
                />
                </Card>

                ) : (
                  <Card>
                  <View style={[{
                    backgroundColor: '#8CAE68',
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center'
                  }, styles.container]}>
                    <Text>No meal selected</Text>
                    <Button
                      title="Go back to Menu"
                      onPress={() => navigation.navigate('Menu')}
                    />
                  </View>
                  </Card>
                )}
          </Animatable.View>
        </View>
      )
    }
  
};

const mapStateToProps = ({ cartReducer }) => ({
  cart: cartReducer.cart,
});

export default connect(mapStateToProps, { addToCart })(MealDetail);

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
});
