import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { NavigationEvents } from 'react-navigation';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import LottieView from 'lottie-react-native';

import * as Animatable from 'react-native-animatable';
import { Card, Icon, Button } from 'react-native-elements';
import CustomHeader from '../../components/Header';
import { fetchMyOrder } from '../../redux/actions/cartActions';

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

  static navigationOptions = () => {
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
    const formattedDate = moment(order.createdAt);
    const colors = {
      pending: '#e66900',
      cancelled: '#c22b2b',
      confirmed: '#2b2bc2',
      completed: '#00b25c'
    };
    const statusColor = colors[order.status];
    return (
      <View key={order._id} style={{
        padding: '1%',
        borderColor: '#c1c1c1',
        borderWidth: 0.6,
      }}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: '2%',
          marginTop: '2%'
        }}>
          <View>
            <Text>{formattedDate.format('DD MMM YY')}</Text>
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
            <Text style={styles.orderText}>{order.amount}</Text>
          </View>
          <View>
            <Text style={[{ color: statusColor }, styles.orderText]}>{order.status}</Text>
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
    const { theme, fetchMyOrder, orders } = this.props;

    return (
      <ScrollView style={styles.container}>
        <Animatable.View animation="fadeInRightBig" duration={400}>
          <CustomHeader
            title={'Order History'}
            navigation={this.props.navigation}
            rightComponent={this.renderRightHeaderIcon}
          />
          <NavigationEvents onDidFocus={fetchMyOrder} />
          <Card>
            <View>
              {
                orders.length ? (
                  <Fragment>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: '1%' }}>
                      <View><Text style={[{ color: theme.sec700 }, styles.titleStyle]}>Date</Text></View>
                      <View><Text style={[{ color: theme.sec700 }, styles.titleStyle]}>Order</Text></View>
                      <View>
                        <Text style={[{ color: theme.sec700 }, styles.titleStyle]}>Amount (&#8358;)</Text>
                      </View>
                      <View><Text style={[{ color: theme.sec700 }, styles.titleStyle]}>Status</Text></View>
                    </View>
                    <View>
                      {orders.map(this.renderOrderItem)}
                    </View>
                  </Fragment>
                ) : this.renderNoOrders()
              }
            </View>
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
    textAlign: 'center',
    fontWeight: '500',
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

const mapStateToProps = ({ themeReducer, cartReducer }) => ({
  theme: themeReducer.theme,
  orders: cartReducer.orders,
});

export default connect(mapStateToProps, { fetchMyOrder })(OrdersScreen);