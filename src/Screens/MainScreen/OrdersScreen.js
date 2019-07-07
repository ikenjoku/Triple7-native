import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import LottieView from 'lottie-react-native';

import * as Animatable from 'react-native-animatable';
import { Card, Icon, Button } from 'react-native-elements';
import CustomHeader from '../../components/Header';

class AnimatedChefIcon extends Component {
  render() {
    return <LottieView style={{
      height: 200,
      width: 200,
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: '6%',
      marginBottom: '6%'
    }}
    source={require('../../assets/animatedPlate.json')} autoPlay loop />;
  }
}

class OrdersScreen extends Component {

  state = {
    orders: [
      {
        _id: 1,
        customer: 'John',
        date: '2019-04-26',
        status: 'confirmed', // cancelled => pending ==> confirmed ==> delivered
        amount: 17200,
        meals: [{ name: 'Ewedu and Semo', qty: 2, price: 500 }, { name: 'Coke', qty: 1, price: 300 }],
      }, {
        _id: 2,
        customer: 'Mark',
        date: '2019-05-11',
        status: 'delivered',
        amount: 11600,
        meals: [{ name: 'Ewedu and Semo', qty: 2, price: 500 }, { name: 'Coke', qty: 1, price: 300 }],
      }
    ]
  }

  static navigationOptions = () => {
    // const { theme } = this.props;
    return ({
      drawerLabel: 'Order History',
      drawerIcon: () => (
        <Icon
          name='history'
          type='font-awesome'
          size={24}
          color='#777f7c'
        />
      ),
    });
  }

  renderRightHeaderIcon = (navigation) => {
    return <Icon
      name='home'
      size={24}
      color='#fff'
      underlayColor='transparent'
      onPress={() => navigation.navigate('Menu')}
    />;
  }

  renderOrderItem = (order) => {
    return (
      <View key={order._id} style={{
        padding: '1%',
        borderColor: '#c1c1c1',
        borderWidth: 0.6,
      }}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems:'center',
          marginBottom: '3%'
        }}>
          <View>
            <Text>{order.date}</Text>
          </View>
          <View>
            <View style={{flexDirection: 'column'}}>
              {order.meals.map(meal => (
                <View key={meal.name} style={{flexDirection:'row'}}>
                  <Text style={[styles.orderText, {paddingRight: 5}]}>{meal.qty}</Text>
                  <Text >{meal.name}</Text>
                </View>
              ))}
            </View>
          </View>
          <View>
            <Text style={styles.orderText}>&#8358; {order.amount}</Text>
          </View>
          <View>
            <Text style={styles.orderText}>{order.status}</Text>
          </View>
        </View>
      </View>
    );
  }

  renderNoOrders = () => {
    const { navigate } = this.props.navigation;
    return (
      <Fragment>
        <View>
          <AnimatedChefIcon />
        </View>
        <View style={{ paddingLeft: '3%', paddingRight: '3%', paddingBottom: '3%', marginTop: '6%' }}>
          <Text style={{ textAlign: 'center', fontSize: 25, fontWeight: '500' }}>No previous orders yet</Text>
          <Text style={{ textAlign: 'center', fontSize: 15, fontWeight: '400' }}>Load up your basket with some yummy meals</Text>
        </View>
        <View style={{ marginTop: '6%' }}>
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
    );
  }

  render() {
    const { navigation } = this.props;

    return (
      <ScrollView style={styles.container}>
        <Animatable.View animation="fadeInRightBig" duration={400}>
          <CustomHeader
            title={'Order History'}
            navigation={this.props.navigation}
            rightComponent={this.renderRightHeaderIcon}
          />
          <Card>
            {
              this.state.orders ? this.state.orders.map(this.renderOrderItem) : this.renderNoOrders()
            }
          </Card>
        </Animatable.View>
      </ScrollView>
    );
  }
}

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
  cardTitle: {
    textAlign: 'center',
    fontWeight: '500',
    borderBottomColor: '#aba8a8',
    borderBottomWidth: 1,
    paddingBottom: 10,
    fontSize: 15
  },
  spaceTop: { marginTop: 10 },
  orderText: {
    fontWeight: '500',
  }
});

const mapStateToProps = ({ themeReducer }) => ({
  theme: themeReducer.theme,
});

export default connect(mapStateToProps, { })(OrdersScreen);