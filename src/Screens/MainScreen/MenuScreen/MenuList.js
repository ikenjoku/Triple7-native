import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import { View, Text, StyleSheet, ScrollView, FlatList, Image, ActivityIndicator } from 'react-native';
import { Card, Icon, Button, Badge, Header, withBadge } from 'react-native-elements';

import { fetchMenu } from "../../../redux/actions/mealActions";
import { addToCart } from "../../../redux/actions/cartActions";
import AnimatedLoader from "../../../components/animatedLoader";
import AnimatedCartIcon from '../../../components/animatedCartIcon';
import CustomHeader from "../../../components/Header";
class MenuList extends Component {

  static navigationOptions = {
    header: null,
  }

  componentDidMount() {
    this.props.fetchMenu();
  }

  renderMenuIcon = (navigation) => {
    return <Icon
      name='menu'
      size={35}
      color='#fff'
      underlayColor='transparent'
      onPress={() => navigation.toggleDrawer()}
    />
  }

  renderRightHeaderIcon = (navigation) => {
    return <AnimatedCartIcon navigation={navigation} />
  }

  renderDish = (meal) => {
    const { navigation, cart, addToCart } = this.props;
    if (meal.category !== 'Drinks') {
      return (
        <Animatable.View key={meal._id} animation="fadeInRightBig" duration={400}>
          <Card
            image={{ uri: meal.imgurl }}
            imageStyle={{
              height: 200,
            }}
            containerStyle={{
              borderRadius: 5,
              marginBottom: '3%',
              marginTop: '3%'
            }}
            imageWrapperStyle={{
              width: '100%',
            }}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ marginBottom: 10, fontWeight: '700' }}>
                {meal.name}
              </Text>
              <Badge value={meal.category} textStyle={{ color: '#2FBE74' }} badgeStyle={{ backgroundColor: '#fff', padding: 5, borderColor: '#2FBE74' }} />
              <Badge activeOpacity={0.8} onPress={() => addToCart(cart, { name: meal.name, price: meal.price })} value="+ Add to Cart" badgeStyle={{ backgroundColor: '#B32F20', padding: 15 }} />
            </View>
            <Text style={{ marginBottom: 10 }}>
              {meal.description}
            </Text>
            <Button
              type='outline'
              title='VIEW'
              buttonStyle={{ borderColor: "#2FBE74", backgroundColor: "#f9f9f9" }}
              titleStyle={{ color: "#2FBE74" }}
              onPress={() => navigation.navigate('MealDetail', { meal })}
            />
          </Card>
        </Animatable.View>
      );
    } else {
      return (
        <Animatable.View key={meal._id} animation="fadeInRightBig" duration={400}>
          <Card
            containerStyle={{
              borderRadius: 5,
              marginBottom: '3%',
              marginTop: '3%'
            }}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
              <View>
                <Image
                  source={{ uri: meal.imgurl }}
                  style={{ width: 100, height: 100 }}
                  PlaceholderContent={<ActivityIndicator />}
                />
              </View>
              <View style={{ flexDirection: 'column' }}>
                <Badge value={meal.category} textStyle={{ color: '#2FBE74' }} badgeStyle={{ backgroundColor: '#fff', padding: 5, borderColor: '#2FBE74' }} />
                <Text style={{ marginBottom: 10, fontWeight: '700' }}>
                  {meal.name}
                </Text>
                <Text style={{ marginBottom: 10 }}>
                  {meal.description}
                </Text>
                <Badge activeOpacity={0.8} onPress={() => addToCart(cart, { name: meal.name, price: meal.price })} value="+ Add to Cart" badgeStyle={{ backgroundColor: '#B32F20', padding: 15 }} />
              </View>
            </View>
          </Card>
        </Animatable.View>
      );
    }
  }

  render() {
    const { menu, navigation, isLoading } = this.props;
    return (
      <View style={styles.container}>
        <CustomHeader
          title={'Menu'}
          navigation={navigation}
          rightComponent={this.renderRightHeaderIcon}
        />
        {isLoading ? <AnimatedLoader loading={isLoading} />
          : (
            <ScrollView style={[{ flex: 1, paddingBottom: '30%' }, styles.container]}>
              {
                menu && menu.map(this.renderDish)
              }
            </ScrollView>
          )}
      </View>
    );
  }
};

const mapStateToProps = ({ mealReducer, cartReducer }) => ({
  menu: mealReducer.menu,
  isLoading: mealReducer.isLoading,
  error: mealReducer.error,
  cart: cartReducer.cart,
});

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
  drinkThumbnail: {
    width: '12%',
    height: '12%'
  }
});

export default connect(mapStateToProps, { fetchMenu, addToCart })(MenuList);
