import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import LottieView from 'lottie-react-native';
import { View, Text, StyleSheet, ScrollView, TouchableNativeFeedback } from 'react-native';
import { Button, Icon, Card } from "react-native-elements";
import CustomHeader from '../../../components/Header';
import { addToCart, removeFromCart, clearCart } from "../../../redux/actions/cartActions";

class AnimatedCartIcon extends Component {
  render() {
    return <LottieView style={{height: 120, width: 120}} source={require('../../../assets/whatsapp.json')} autoPlay loop />;
  }
}
class Payment extends Component {

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
        <ScrollView>
        <Card>
              <View style={{ paddingLeft: '3%', paddingRight: '3%' }}>
                <Text style={{ textAlign: 'center', fontSize: 25, fontWeight: '500', marginBottom: '3%', marginTop: '6%' }}>Thank You</Text>
                <View style={{ flexDirection:'row', justifyContent:'center', marginBottom: '6%', alignItems:'baseline'}}>
                  <Text style={{ fontSize: 25, fontWeight: '500' }}>Order received</Text>
                  <Icon
                    name='check'
                    type='entypo'
                    size={50}
                    color='#2FBE74'
                    underlayColor='transparent'
                  />
                </View>
                <Text style={{ textAlign: 'center', fontSize: 15, fontWeight: '400',  marginBottom: '6%' }}>Click below to chat up our service to confirm order</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent:'center',  marginBottom: '30%' }}>
                <AnimatedCartIcon />
              </View>
          </Card>
          </ScrollView>
      </View>
    );
  }
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});


const mapStateToProps = ({ cartReducer }) => ({
  cart: cartReducer.cart,
});

export default connect(mapStateToProps, { addToCart, removeFromCart, clearCart })(Payment);