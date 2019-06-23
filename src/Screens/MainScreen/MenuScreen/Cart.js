import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import LottieView from 'lottie-react-native';
import { View, Text, StyleSheet, ScrollView} from 'react-native';
import { Button, Icon, Card } from "react-native-elements";
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
    const { navigation, cart } = this.props;
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
});


const mapStateToProps = ({ cartReducer }) => ({
  cart: cartReducer.cart,
});

export default connect(mapStateToProps, {})(Cart);