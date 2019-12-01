import React, { Component } from 'react';
import { connect } from 'react-redux';
import LottieView from 'lottie-react-native';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Icon, Card } from 'react-native-elements';
import CustomHeader from '../../../components/Header';
import { addToCart, removeFromCart, clearCart } from '../../../redux/actions/cartActions';
import whatsappMessenger from '../../../utils/whatsappMessenger';

class AnimatedWhatsAppIcon extends Component {
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
      size={24}
      color='#fff'
      underlayColor='transparent'
      onPress={() => navigation.navigate('MenuList')}
    />;
  }


  render() {
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
              <TouchableOpacity
                onPress={() => whatsappMessenger('+2348095888777', 'Hello Triple 7 \n I just made an order')}
              >
                <AnimatedWhatsAppIcon />
              </TouchableOpacity>
            </View>
          </Card>
        </ScrollView>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});


const mapStateToProps = ({ cartReducer }) => ({
  cart: cartReducer.cart,
});

export default connect(mapStateToProps, { addToCart, removeFromCart, clearCart })(Payment);