import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import { View, Text, StyleSheet, ScrollView, Image, ActivityIndicator } from 'react-native';
import { Card, Button, Badge, Icon } from 'react-native-elements';

import { fetchMenu } from '../../../redux/actions/mealActions';
import { addToCart } from '../../../redux/actions/cartActions';
import AnimatedLoader from '../../../components/animatedLoader';
import AnimatedCartIcon from '../../../components/animatedCartIcon';
import CustomHeader from '../../../components/Header';
class MenuList extends Component {


  static navigationOptions = {
    header: null,
  }

  componentDidMount() {
    this.props.fetchMenu();
  }

  renderRightHeaderIcon = (navigation) => {
    return <AnimatedCartIcon navigation={navigation} />;
  }

  renderNumberInCart = () => {
    const theme = {
      pri50: '#e4f6eb',
      pri500: '#00b25c',
      pri700: '#009145',
      pri800: '#007f39',
      sec700: '#be2f79',
      sec900: '#802764',
    };
    return (
      <View style={{ alignItems: 'flex-end' }}>
        <Badge
          value={'2 Added'}
          textStyle={{ color: theme.sec700 }}
          badgeStyle={{
            backgroundColor: '#fff',
            padding: 5,
            borderColor: theme.sec700 }}
        />
      </View>
    );
  }

  renderDish = (meal) => {
    const { navigation, cart, addToCart } = this.props;
    const theme = {
      pri50: '#e4f6eb',
      pri500: '#00b25c',
      pri700: '#009145',
      pri800: '#007f39',
      sec700: '#be2f79',
    };

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
            PlaceholderContent={<ActivityIndicator />}
          >
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
            {this.renderNumberInCart()}
            <Text style={{ marginBottom: 10, fontFamily: 'sans-serif-condensed' }}>
              {meal.description}
            </Text>
            <Button
              type='outline'
              title='View'
              buttonStyle={{ borderColor: theme.pri500, backgroundColor: '#fff', borderWidth: 1 }}
              titleStyle={{ color: theme.pri500, fontFamily: 'sans-serif-medium' }}
              onPress={() => navigation.navigate('MealDetail', { meal })}
            />
          </Card>
        </Animatable.View>
      );
    }
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
              <View style={{ flexDirection: 'row', justifyContent:'center' }}>
                <Badge
                  value={meal.category}
                  textStyle={{ color: theme.pri500 }}
                  badgeStyle={{
                    backgroundColor: '#fff',
                    padding: 5,
                    borderColor: theme.pri500 }}
                />
                {this.renderNumberInCart()}
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
    const { error, menu } = this.props;
    const theme = {
      pri50: '#e4f6eb',
      pri500: '#00b25c',
      pri700: '#009145',
      pri800: '#007f39',
      sec700: '#be2f79',
    };

    if (error) {
      return (
        <Fragment>
          <View style={{ height: '40%' }}>
            <Icon
              name='wifi-off'
              type='material-community'
              size={80}
              color='#777f7c'
              containerStyle={{ marginTop: '20%' }}
            />
          </View>
          <View style={{ paddingLeft: '3%', paddingRight: '3%', paddingBottom: '3%', flex: 1 }}>
            <Text style={{ textAlign: 'center', fontSize: 25, fontWeight: '500' }}>Network Error</Text>
            <Text style={{ textAlign: 'center', fontSize: 15, fontWeight: '400' }}>Check your connection and try again</Text>
            <Button
              raised
              title="Try Again"
              onPress={this.props.fetchMenu}
              buttonStyle={{
                backgroundColor: theme.sec700
              }}
              containerStyle={{
                marginTop: 'auto'
              }}
            />
          </View>
        </Fragment>
      );
    }
    return (
      <ScrollView style={[{ flex: 1, paddingBottom: '30%' }, styles.container]}>
        {
          menu && menu.map(this.renderDish)
        }
      </ScrollView>
    );
  }

  render() {
    const { navigation, isLoading } = this.props;
    return (
      <View style={styles.container}>
        <CustomHeader
          title={'Menu'}
          navigation={navigation}
          rightComponent={this.renderRightHeaderIcon}
        />
        {isLoading ? <AnimatedLoader loading={isLoading} />
          : this.renderPage()}
      </View>
    );
  }
}

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
  drinkThumbnail: {
    width: '12%',
    height: '12%'
  }
});

export default connect(mapStateToProps, { fetchMenu, addToCart })(MenuList);
