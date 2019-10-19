import React, { Component, Fragment } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { NavigationEvents } from 'react-navigation';
import * as Animatable from 'react-native-animatable';
import { Card, Icon, Button } from 'react-native-elements';
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';

import CustomHeader from '../../components/Header';
import AnimatedLoader from '../../components/animatedLoader';
import { fetchMyOrder } from '../../redux/actions/cartActions';
import AnimatedPlateIcon from '../../components/AnimatedPlateIcon';

class OrdersScreen extends Component {
  state = { refreshing: false }

  static navigationOptions = {
    drawerLabel: 'Order History',
    drawerIcon: () => (
      <Icon
        name='history'
        type='font-awesome'
        size={24}
        color='#777f7c'
      />
    )
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
    if (order.seats) {
      return (
        <View key={order._id} style={styles.orderContainer}>
          <View style={styles.containItem}>
            <View>
              <Text>{formattedDate.format('DD MMM YY')}</Text>
            </View>
            <View>
              <View style={{ flexDirection: 'column' }}>
                <Text>{moment(order.datetime).format('MMMM Do YYYY, h:mm a')}</Text>
              </View>
            </View>
            <View>
              <Text style={styles.orderText}>{order.seats}</Text>
            </View>
            <View>
              <Text style={[{ color: statusColor }, styles.orderText]}>{order.status}</Text>
            </View>
          </View>
        </View>
      );
    }
    return (
      <View key={order._id} style={styles.orderContainer}>
        <View style={styles.containItem}>
          <View>
            <Text>{formattedDate.format('DD MMM YY')}</Text>
          </View>
          <View>
            <View style={{ flexDirection: 'column' }}>
              {order.meals.map(meal => (
                <View key={meal.name} style={{ flexDirection: 'row' }}>
                  <Text style={[styles.orderText, { paddingRight: 5 }]}>{meal.qty}</Text>
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
    const { theme } = this.props;
    const { navigate } = this.props.navigation;
    return (
      <Fragment>
        <View>
          <AnimatedPlateIcon />
        </View>
        <View style={{ paddingLeft: '3%', paddingRight: '3%', paddingBottom: '3%', marginTop: '6%' }}>
          <Text style={{ textAlign: 'center', fontSize: 25, fontWeight: '500' }}>No previous orders yet</Text>
          <Text style={{ textAlign: 'center', fontSize: 15, fontWeight: '400' }}>Load up your basket with some yummy meals</Text>
        </View>
        <View style={{ marginTop: '6%', paddingRight: '5%', paddingLeft: '5%' }}>
          <Button
            raised
            title="See Today's Menu"
            onPress={() => navigate('MenuList')}
            buttonStyle={{ backgroundColor: theme.sec700 }}
            containerStyle={{ marginTop: 'auto' }}
          />
        </View>
      </Fragment>
    );
  }

  render() {
    const { theme, fetchMyOrder, orders, isFetching } = this.props;
    const { refreshing } = this.state;
    return (
      <Animatable.View animation="fadeInRightBig" duration={400} style={styles.container}>
        <CustomHeader
          title={'Order History'}
          navigation={this.props.navigation}
          rightComponent={this.renderRightHeaderIcon}
        />
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={fetchMyOrder}
            />
          }
        >
          <NavigationEvents onDidFocus={fetchMyOrder} />
          <AnimatedLoader loading={isFetching} />
          <Card>
            <View>
              {
                orders.length ? (
                  <Fragment>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: '1%' }}>
                      <View><Text style={[{ color: theme.sec700 }, styles.titleStyle]}>Date</Text></View>
                      <View><Text style={[{ color: theme.sec700 }, styles.titleStyle]}>Meals/Reservation</Text></View>
                      <View>
                        <Text style={[{ color: theme.sec700 }, styles.titleStyle]}>Amount(&#8358;)/Seats</Text>
                      </View>
                      <View><Text style={[{ color: theme.sec700 }, styles.titleStyle]}>Status</Text></View>
                    </View>
                    <View>
                      {orders.map((order) => this.renderOrderItem(order))}
                    </View>
                  </Fragment>
                ) : this.renderNoOrders()
              }
            </View>
          </Card>
        </ScrollView>
      </Animatable.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#eaeaea',
  },
  titleStyle: {
    textAlign: 'center',
    fontWeight: '500',
  },
  orderText: {
    fontWeight: '500',
  },
  containItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '2%',
    marginTop: '2%'
  },
  orderContainer: {
    padding: '1%',
    borderColor: '#c1c1c1',
    borderWidth: 0.6,
  }
});

const mapStateToProps = ({ themeReducer, cartReducer }) => ({
  theme: themeReducer.theme,
  orders: cartReducer.orders,
  isFetching: cartReducer.isFetching,
});

export default connect(mapStateToProps, { fetchMyOrder })(OrdersScreen);