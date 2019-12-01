import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import LottieView from 'lottie-react-native';
import { View, Text, StyleSheet, ScrollView, TouchableNativeFeedback } from 'react-native';
import { Button, Icon, Card, CheckBox } from 'react-native-elements';
import { Textarea, Container } from 'native-base';
import CustomHeader from '../../../components/Header';
import OverlayLoader from '../../../components/OverlayLoader';
import { addToCart, removeFromCart, clearCart, makeAnOrder } from '../../../redux/actions/cartActions';

class AnimatedCartIcon extends Component {
  render() {
    return <LottieView source={require('../../../assets/cart1.json')} autoPlay loop />;
  }
}
class Cart extends Component {
  state = {
    homeDelivery: false,
    address: '',
  }

  static navigationOptions = {
    header: null,
  }

  renderRightHeaderIcon = (navigation) => {
    return <Icon
      name='home'
      size={24}
      color='#fff'
      underlayColor='transparent'
      onPress={() => navigation.navigate('MenuList')}
    />;
  }

  calcCartTotal = () => {
    const { cart } = this.props;
    const { homeDelivery } = this.state;
    let sum = 0;
    if (homeDelivery) { sum = 500; }
    cart.map(item => sum += (item.qty * item.price));
    return sum;
  }

  handleConfirmOrder = () => {
    const { homeDelivery, address } = this.state;
    const { cart } = this.props;
    if (homeDelivery) {
      this.props.makeAnOrder({ meals: cart, address });
    } else {
      this.props.makeAnOrder({ meals: cart });
    }
    this.setState({ address: '' });
  }

  renderCartItem = (cartItem) => {
    const { cart, theme } = this.props;
    const { name, qty, price } = cartItem;
    const ripple = TouchableNativeFeedback.Ripple('grey', true);
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
                color={theme.sec700}
                underlayColor='transparent'
              />
            </View>
          </TouchableNativeFeedback>
        </View>

        <View style={[styles.childItem, { flex: 0.6 }]}>
          <Text style={styles.childText}>{qty}</Text>
        </View>
        <View style={[styles.childItem, { flex: 2.5, flexWrap: 'wrap', alignItems: 'flex-start', paddingLeft: '1%' }]}>
          <Text style={styles.childText}>{name}</Text>
        </View>
        <View style={styles.childItem}>
          <Text style={styles.childText}>{price}</Text>
        </View>
        <View style={styles.childItem}>
          <Text style={styles.childText}>{price * qty}</Text>
        </View>

        <View style={[styles.childItem, { elevation: 3, borderRadius: 5 }]}>
          <TouchableNativeFeedback background={ripple} onPress={() => this.props.removeFromCart(cart, cartItem)}>
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
                color={theme.sec700}
                underlayColor='transparent'
              />
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
    );
  }

  render() {
    const { homeDelivery } = this.state;
    const { navigation, cart, clearCart, theme, isOrdering } = this.props;
    const { navigate } = navigation;
    const isVisible = homeDelivery ? 'flex' : 'none';
    return (
      <Container>
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
                      backgroundColor: theme.sec700
                    }}
                    containerStyle={{
                      marginTop: 'auto'
                    }}
                  />
                </View>
              </Fragment>
            ) : (
              <ScrollView>
                <OverlayLoader
                  message='Please wait, making your order...'
                  pri800={theme.pri800}
                  isVisble={isOrdering}
                />
                <Card>
                  <View style={{
                    marginBottom: '6%',
                    borderBottomColor: theme.pri500,
                    borderBottomWidth: 5,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                    <View>
                      <Text style={{ fontSize: 20, color: theme.pri500, fontWeight: '500' }}>Your basket</Text>
                    </View>
                    <View>
                      <Text style={{ fontWeight: '500' }} onPress={clearCart}>CLEAR ALL</Text>
                    </View>
                  </View>
                  <View>
                    {
                      cart.map(this.renderCartItem)
                    }
                  </View>
                  <View style={{ marginTop: '3%' }}>
                    <View style={{ flexDirection: 'row' }}>
                      <View style={{ flex: 3, justifyContent: 'center' }}>
                        <Text style={{ fontWeight: '500' }}>Deliver food to location ?</Text>
                        <Text>For an extra charge of &#8358; 500.00</Text>
                      </View>
                      <View style={{ flex: 1 }}>
                        <CheckBox
                          checked={this.state.homeDelivery}
                          onPress={() => this.setState({ homeDelivery: !homeDelivery })}
                          checkedColor={theme.pri500}
                        />
                      </View>
                    </View>
                    <View>
                    </View>
                  </View>
                  <View style={{ display: isVisible }}>
                    <Textarea value={this.state.address} onChangeText={((address) => this.setState({ address }))} rowSpan={5} bordered placeholder="Tell us your address" />
                  </View>
                  <View>
                    <View style={{ marginBottom: '24%', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                      <Text style={{ fontSize: 15, color: 'black', paddingRight: '1%', fontWeight: '500' }}>Total:</Text>
                      <Text style={{ fontSize: 30, fontWeight: '500', color: theme.sec900 }}>&#8358; {this.calcCartTotal()}.00</Text>
                    </View>
                  </View>
                  <Button
                    raised
                    title="Confirm Order"
                    onPress={this.handleConfirmOrder}
                    buttonStyle={{
                      backgroundColor: theme.sec700
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
      </Container>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containCartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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


const mapStateToProps = ({ cartReducer, themeReducer }) => ({
  cart: cartReducer.cart,
  isOrdering: cartReducer.isOrdering,
  theme: themeReducer.theme,
});

export default connect(mapStateToProps, { addToCart, removeFromCart, clearCart, makeAnOrder })(Cart);