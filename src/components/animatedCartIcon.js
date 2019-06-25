import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon, withBadge } from 'react-native-elements';


class AnimatedCartIcon extends Component {

  render() {
    const { navigation, cart } = this.props;
    const BadgedIcon = withBadge(cart.length)(Icon);

    return (
      <BadgedIcon
        type="antdesign"
        name="shoppingcart"
        color='#fff'
        size={35}
        underlayColor='transparent'
        onPress={() => navigation.navigate('Cart')}
      />
    );
  }
}

const mapStateToProps = ({ cartReducer }) => ({
  cart: cartReducer.cart
});

export default connect(mapStateToProps, {})(AnimatedCartIcon);