import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import { View, Text, StyleSheet, ScrollView, Image, ActivityIndicator } from 'react-native';
import { Card, Button, Badge, Icon } from 'react-native-elements';
import { Container, Tab, Tabs, ScrollableTab } from 'native-base';

import { fetchMenu } from '../../../redux/actions/mealActions';
import { addToCart } from '../../../redux/actions/cartActions';
import AnimatedLoader from '../../../components/animatedLoader';
import AnimatedCartIcon from '../../../components/animatedCartIcon';
import CustomHeader from '../../../components/Header';
import ErrorPage from '../../../components/ErrorPage';

class MenuList extends Component {

  static navigationOptions = {
    drawerLabel: 'Menu',
    drawerIcon: () => (
      <Icon
        name='food-fork-drink'
        type='material-community'
        size={24}
        color='#777f7c'
      />
    ),
    header: null,
  }

  componentDidMount() {
    this.props.fetchMenu();
  }

  renderRightHeaderIcon = (navigation) => {
    return <AnimatedCartIcon navigation={navigation} />;
  }

  renderNumberInCart = (meal) => {
    const { theme, cart } = this.props;

    const inCart = cart.find(item => item.name === meal.name);
    if (inCart) {
      return (
        <View style={{ alignItems: 'flex-end' }}>
          <Badge
            value={`${inCart.qty} Added`}
            textStyle={{ color: theme.sec700 }}
            badgeStyle={{
              backgroundColor: '#fff',
              padding: 5,
              borderColor: theme.sec700 }}
          />
        </View>
      );
    }
    return null;
  }

  renderDish = (meal) => {
    const { navigation, cart, addToCart, theme } = this.props;

    if (meal.category !== 'Drinks') {
      return (
        <Animatable.View key={meal._id} animation="fadeInRightBig" duration={0}>
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
            PlaceholderContent={<ActivityIndicator />}
          >
            <Text style={[ { color: theme.sec900 }, styles.priceTag]}>&#8358; {meal.price}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ marginBottom: 10, fontWeight: '700', fontFamily: 'sans-serif-medium' }}>
                {meal.name}
              </Text>
              <Badge
                value={meal.category}
                textStyle={{ color: theme.pri500 }}
                badgeStyle={{
                  backgroundColor: '#fff',
                  padding: 5, borderColor: theme.pri500 }}
              />
              <Badge
                activeOpacity={0.8}
                onPress={() => addToCart(cart, { name: meal.name, price: meal.price })}
                value="+ Add to Cart"
                badgeStyle={{ backgroundColor: theme.sec700, padding: 15 }}
              />
            </View>
            {this.renderNumberInCart(meal)}
            <Text style={{ marginBottom: 10, fontFamily: 'sans-serif-condensed' }}>
              {meal.description}
            </Text>
            <Button
              type='outline'
              title='See More'
              buttonStyle={{ borderColor: theme.pri500, backgroundColor: '#fff', borderWidth: 1 }}
              titleStyle={{ color: theme.pri500, fontFamily: 'sans-serif-medium' }}
              onPress={() => navigation.navigate('MealDetail', { meal })}
            />
          </Card>
        </Animatable.View>
      );
    }
    return (
      <Animatable.View key={meal._id} animation="fadeInRightBig" duration={0}>
        <Card
          containerStyle={{
            borderRadius: 5,
            marginBottom: '3%',
            marginTop: '3%'
          }}
        >
          <Text style={[{ color: theme.sec900 }, styles.drinkPriceTag]}>&#8358; {meal.price}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', position: 'relative' }}>
            <View>
              <Image
                source={{ uri: meal.imgurl }}
                style={{ width: 100, height: 100 }}
                PlaceholderContent={<ActivityIndicator />}
              />
            </View>
            <View style={{ flexDirection: 'column' }}>
              <View style={{ flexDirection: 'row', justifyContent:'center' }}>
                <Badge
                  value={meal.category}
                  textStyle={{ color: theme.pri500 }}
                  badgeStyle={{
                    backgroundColor: '#fff',
                    padding: 5,
                    borderColor: theme.pri500 }}
                />
                {this.renderNumberInCart(meal)}
              </View>
              <Text style={{ marginBottom: 10, fontWeight: '700' }}>
                {meal.name}
              </Text>
              <Text style={{ marginBottom: 10 }}>
                {meal.description}
              </Text>
              <Badge
                activeOpacity={0.8}
                onPress={() => addToCart(cart, { name: meal.name, price: meal.price })}
                value="+ Add to Cart"
                badgeStyle={{ backgroundColor: theme.sec700, padding: 15 }}
              />
            </View>
          </View>
        </Card>
      </Animatable.View>
    );
  }

  renderPage = () => {
    const { error, menu, theme } = this.props;
    const tabStyle = {
      backgroundColor: theme.pri500,
      borderColor: theme.pri700,
      elevation:6,
    };
    const activeTabStyle = {
      backgroundColor: theme.pri700,
      borderColor: theme.pri700,
    };

    const afrikaans = [];
    const intercontinental = [];
    const combo = [];
    menu.forEach(meal => {
      const { category } = meal;
      if (category === 'Afrikaans') {
        afrikaans.push(meal);
      }
      if (category === 'Intercontinental') {
        intercontinental.push(meal);
      }
      if (category === 'Combo') {
        combo.push(meal);
      }
    });

    if (error) {
      return <ErrorPage onRefresh={this.props.fetchMenu} />;
    }
    return (
      <Tabs
        renderTabBar={()=> <ScrollableTab style={{backgroundColor: theme.pri500}}/>}
      >
        <Tab
          heading="Afrikaans"
          tabStyle={tabStyle}
          activeTabStyle={activeTabStyle}
        >
          <ScrollView style={[{ flex: 1, paddingBottom: '30%' }, styles.container]}>
            {
              afrikaans.map(this.renderDish)
            }
          </ScrollView>
        </Tab>
        <Tab
          heading="Intercontinental"
          tabStyle={tabStyle}
          activeTabStyle={activeTabStyle}
        >
          <ScrollView style={[{ flex: 1, paddingBottom: '30%' }, styles.container]}>
            {
              intercontinental.map(this.renderDish)
            }
          </ScrollView>
        </Tab>
        <Tab
          heading="Combo"
          tabStyle={tabStyle}
          activeTabStyle={activeTabStyle}
        >
          <ScrollView style={[{ flex: 1, paddingBottom: '30%' }, styles.container]}>
            {
              combo.map(this.renderDish)
            }
          </ScrollView>
        </Tab>
      </Tabs>
    );
  }

  render() {
    const { navigation, isLoading } = this.props;

    return (
      <Container>
        <View style={styles.container}>
          <CustomHeader
            title={'Menu'}
            navigation={navigation}
            rightComponent={this.renderRightHeaderIcon}
          />
          {isLoading ? <AnimatedLoader loading={isLoading} />
            : this.renderPage()}
        </View>
      </Container>
    );
  }
}

const mapStateToProps = ({ mealReducer, cartReducer, themeReducer }) => ({
  menu: mealReducer.menu,
  isLoading: mealReducer.isLoading,
  error: mealReducer.error,
  cart: cartReducer.cart,
  theme: themeReducer.theme,
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#eaeaea',
  },
  drinkThumbnail: {
    width: '12%',
    height: '12%'
  },
  priceTag: {
    position: 'absolute',
    top: '-30%',
    left: '3%',
    fontWeight: '500',
    fontSize: 20
  },
  drinkPriceTag: {
    position: 'absolute',
    top: 0,
    left: 0,
    fontWeight: '500',
    fontSize: 15,
    zIndex: 1
  },
});

export default connect(mapStateToProps, { fetchMenu, addToCart })(MenuList);
