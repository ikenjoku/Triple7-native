import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Icon, withBadge } from 'react-native-elements';


class AnimatedCartIcon extends Component {

  render() {
    const { navigation, cart } = this.props;
    const BadgedIcon = withBadge(cart.length)(Icon);

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Cart')}
        style={{ paddingLeft: 5, paddingRight: 5 }}
      >
        <BadgedIcon
          type="antdesign"
          name="shoppingcart"
          color='#fff'
          size={24}
          underlayColor='transparent'
          onPress={() => navigation.navigate('Cart')}
        />
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = ({ cartReducer }) => ({
  cart: cartReducer.cart
});
//flex 1 width 100%
export default connect(mapStateToProps, {})(AnimatedCartIcon);