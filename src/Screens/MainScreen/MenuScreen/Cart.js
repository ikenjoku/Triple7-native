import React, { Component } from 'react';
import LottieView from 'lottie-react-native';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Icon } from "react-native-elements";
import CustomHeader from '../../../components/Header';


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

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={[{ backgroundColor: '#eaeaea' }, styles.container]}>
      <CustomHeader
        title={'Cart'}
        navigation={this.props.navigation}
        rightComponent={this.renderRightHeaderIcon}
      />
      <View style={{height: '40%'}}>
      <AnimatedCartIcon />
      </View>
      <View style={{paddingLeft: '3%', paddingRight: '3%', paddingBottom: '3%', flex:1}}>
        <Text style={{textAlign:'center', fontSize: 25, fontWeight:'500'}}>Your cart is empty</Text>
        <Text style={{textAlign:'center', fontSize: 15, fontWeight:'400'}}>Load up your basket with some yummy meals</Text>
          <Button
            raised
            title="See Today's Menu"
            onPress={() => navigate('MenuList')}
            buttonStyle={{
              backgroundColor:'#B32F20'
            }}
            containerStyle={{
              marginTop:'auto'
            }}
          />
      </View>
        
      </View>
    );
  }
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});
