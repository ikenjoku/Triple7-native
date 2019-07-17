import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import { View, Text, StyleSheet } from 'react-native';
import { Card, Icon, Button, Badge } from 'react-native-elements';
import { getData, storeData } from '../../../utils/asyncStore';
import { addToCart } from '../../../redux/actions/cartActions';
import CustomHeader from '../../../components/Header';
import AnimatedCartIcon from '../../../components/animatedCartIcon';

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
        if (response) {
          this.setState(() => ({ favorites: response }));
        } else {
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
        if (response) {
          const updatedFavs = [...response, meal];
          return storeData('@triple-cokie', updatedFavs)
            .then((newFavs) => {
              this.setState(() => ({ favorites: newFavs }));
            })
            .catch(err => {
              console.log(err);
            });
        } 
        return storeData('@triple-cokie', [meal])
          .then((newFavs) => {
            this.setState(() => ({ favorites: newFavs }));
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });
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

  renderRightHeaderIcon = (navigation) => {
    return <AnimatedCartIcon navigation={navigation} />;
  }

  isFavorite = (name) => {
    const result = this.state.favorites.filter(meal => meal.name === name);
    return result.length > 0;
  }

  renderNumberInCart = (meal) => {
    const { theme, cart } = this.props;

    const inCart = cart.find(item => item.name === meal.name);
    if (inCart) {
      return (
        <View style={{ alignItems: 'flex-end' }}>
          <Badge
            value={`${inCart.qty} Added`}
            textStyle={{ color: theme.sec700 }}
            badgeStyle={{
              backgroundColor: '#fff',
              padding: 5,
              borderColor: theme.sec700 }}
          />
        </View>
      );
    }
    return null;
  }

  render() {
    const { navigation, addToCart, cart, theme } = this.props;
    const { meal } = navigation.state.params;

    return (
      <View style={styles.container}>
        <Animatable.View animation="fadeInRightBig" duration={400}>
          <CustomHeader
            title={`${meal.name }`}
            navigation={navigation}
            rightComponent={this.renderRightHeaderIcon}
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
                  <Text style={{ marginBottom: 10, fontWeight: '700', fontFamily: 'sans-serif-medium' }}>
                    {meal.name}
                  </Text>
                  <Badge
                    value={meal.category}
                    textStyle={{ color: theme.pri500 }}
                    badgeStyle={{
                      backgroundColor: '#fff',
                      padding: 5,
                      borderColor: theme.pri500
                    }} />
                  <Icon
                    name={this.isFavorite(meal.name) ? 'favorite' : 'favorite-border'}
                    size={35}
                    color={theme.sec900}
                    onPress={!this.isFavorite(meal.name) ? () => this.addFavorite(meal) : () => this.removeFavorite(meal)}
                  />
                </View>
                {this.renderNumberInCart(meal)}
                <Text style={{ marginBottom: 10, fontFamily: 'sans-serif-condensed' }}>
                  {meal.description}
                </Text>
                <Button
                  raised
                  type='solid'
                  title='Add to Cart'
                  onPress={() => addToCart(cart, { name: meal.name, price: meal.price })}
                  buttonStyle={{ backgroundColor: theme.sec700 }}
                  titleStyle={{ color: '#fff', fontFamily: 'sans-serif-medium' }}
                  containerStyle={{
                    marginTop: '2%',
                    marginBottom: '5%'
                  }}
                />
                <Button
                  type='outline'
                  title='Bact to Menu'
                  buttonStyle={{ borderColor: theme.pri500, backgroundColor: '#fff', borderWidth: 1 }}
                  titleStyle={{ color: theme.pri500, paddingLeft: 5, fontFamily: 'sans-serif-medium' }}
                  onPress={() => navigation.navigate('MenuList')}
                  containerStyle={{
                    marginBottom: '2%'
                  }}
                  iconLeft
                  icon={
                    <Icon
                      name="back"
                      size={25}
                      color={theme.pri500}
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
    );
  }
}

const mapStateToProps = ({ cartReducer, themeReducer }) => ({
  cart: cartReducer.cart,
  theme: themeReducer.theme,
});

export default connect(mapStateToProps, { addToCart })(MealDetail);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#eaeaea',
  }
});
