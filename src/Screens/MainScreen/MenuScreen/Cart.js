import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import LottieView from 'lottie-react-native';
import { View, Text, StyleSheet, ScrollView, TouchableNativeFeedback } from 'react-native';
import { Button, Icon, Card } from "react-native-elements";
import CustomHeader from '../../../components/Header';
import { addToCart, removeFromCart, clearCart } from "../../../redux/actions/cartActions";

class AnimatedCartIcon extends Component {
  render() {
    return <LottieView source={require('../../../assets/cart1.json')} autoPlay loop />;
  }
}
class Cart extends Component {

  static navigationOptions = {
    header: null,
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

  calcCartTotal = () => {
    const { cart } = this.props;
    let sum = 0;
    cart.map(item => sum += (item.qty * item.price));
    return sum;
  }

  renderCartItem = (cartItem) => {
    const { cart } = this.props;
    const { name, qty, price } = cartItem;
    const ripple = TouchableNativeFeedback.Ripple('#B32F20', true);
    return (
      <View style={styles.containCartItem} key={name}>
        <View style={[styles.childItem, { elevation: 2, borderRadius: 5 }]}>
          <TouchableNativeFeedback onPress={() => this.props.addToCart(cart, cartItem)} background={ripple}>
            <View style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: 50
            }}>
              <Icon
                name='plus-circle'
                size={24}
                type='feather'
                color='#B32F20'
                underlayColor='transparent'
              />
            </View>
          </TouchableNativeFeedback>
        </View>

        <View style={[styles.childItem, , { flex: 0.6 }]}>
          <Text style={styles.childText}>{qty}</Text>
        </View>
        <View style={[styles.childItem, { flex: 2.5, flexWrap: 'wrap', alignItems: 'flex-start', paddingLeft: '1%' }]}>
          <Text style={styles.childText}>{name}</Text>
        </View>
        <View style={styles.childItem}>
          <Text style={styles.childText}>N{price}</Text>
        </View>
        <View style={styles.childItem}>
          <Text style={styles.childText}>N{price * qty}</Text>
        </View>

        <View style={[styles.childItem, { elevation: 3, borderRadius: 5 }]}>
          <TouchableNativeFeedback background={ripple} onPress={ () => this.props.removeFromCart(cart, cartItem) }>
            <View style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: 50
            }}>
              <Icon
                name='minus-circle'
                size={24}
                type='feather'
                color='#B32F20'
                underlayColor='transparent'
              />
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
    );
  }

  render() {
    const { navigation, cart, clearCart } = this.props;
    const { navigate } = navigation;
    return (
      <View style={[{ backgroundColor: '#eaeaea' }, styles.container]}>
        <CustomHeader
          title={'Cart'}
          navigation={this.props.navigation}
          rightComponent={this.renderRightHeaderIcon}
        />
        {
          !cart.length ? (
            <Fragment>
              <View style={{ height: '40%' }}>
                <AnimatedCartIcon />
              </View>
              <View style={{ paddingLeft: '3%', paddingRight: '3%', paddingBottom: '3%', flex: 1 }}>
                <Text style={{ textAlign: 'center', fontSize: 25, fontWeight: '500' }}>Your cart is empty</Text>
                <Text style={{ textAlign: 'center', fontSize: 15, fontWeight: '400' }}>Load up your basket with some yummy meals</Text>
                <Button
                  raised
                  title="See Today's Menu"
                  onPress={() => navigate('MenuList')}
                  buttonStyle={{
                    backgroundColor: '#B32F20'
                  }}
                  containerStyle={{
                    marginTop: 'auto'
                  }}
                />
              </View>
            </Fragment>
          ) : (
              <ScrollView>
                <Card>
                  <View style={{  marginBottom: '6%', borderBottomColor: '#2FBE74', borderBottomWidth: 5, flexDirection: 'row', justifyContent:'space-between' }}>
                    <Text style={{ fontSize: 20, color:'#2FBE74', fontWeight:'500' }}>Your basket</Text>
                    <Text style={{ fontWeight: '500' }} onPress={clearCart}>CLEAR ALL</Text>
                  </View>
                  <View>
                    {
                      cart.map(this.renderCartItem)
                    }
                  </View>
                  <View>
                    <View style={{  marginBottom: '24%', flexDirection: 'row', justifyContent:'flex-end', alignItems:'center' }}>
                      <Text style={{ fontSize: 15, color: 'black', paddingRight: '1%', fontWeight:'500' }}>Total:</Text>
                      <Text style={{ fontSize: 30, fontWeight:'500', color:'#B32F20' }}>N{this.calcCartTotal()}.00</Text>
                    </View>
                  </View>
                  <Button
                  raised
                  title="Confirm Order"
                  onPress={() => navigate('MenuList')}
                  buttonStyle={{
                    backgroundColor: '#B32F20'
                  }}
                  containerStyle={{
                    marginTop: 'auto'
                  }}
                />
                </Card>
              </ScrollView>
            )
        }
      </View>
    );
  }
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containCartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // borderColor: '#c1c1c1',
    // borderWidth: 0.6,
    marginBottom: '6%',
  },
  childItem: {
    borderColor: '#c1c1c1',
    borderWidth: 0.4,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 50,
  },
  childText: {
    fontWeight: '500'
  }
});


const mapStateToProps = ({ cartReducer }) => ({
  cart: cartReducer.cart,
});

export default connect(mapStateToProps, { addToCart, removeFromCart, clearCart })(Cart);