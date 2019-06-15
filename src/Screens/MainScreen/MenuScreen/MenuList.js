import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import { Card, Icon, Button, Badge, Header } from 'react-native-elements';

import { fetchMenu } from "../../../redux/actions/mealActions";


class MenuList extends Component {

  static navigationOptions = {
    header: null
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
    return <Icon
      name='home'
      size={35}
      color='#fff'
      underlayColor='transparent'
      onPress={() => navigation.navigate('Menu')}
    />
  }

  renderDish = (meal) => {
    if (meal.category !== 'Drikns') {
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
              <Badge value="+ Add to Cart" badgeStyle={{ backgroundColor: '#B32F20', padding: 15 }} />
            </View>
            <Text style={{ marginBottom: 10 }}>
              {meal.description}
            </Text>
            <Button
              type='outline'
              title='VIEW'
              buttonStyle={{ borderColor: "#2FBE74", backgroundColor: "#f9f9f9" }}
              titleStyle={{ color: "#2FBE74" }}
            />
          </Card>
        </Animatable.View>
      );
    }
  }

  render() {
    const { menu, navigation } = this.props;
    const { navigate } = navigation;
    return (
      <View style={styles.container}>

        <Header
          statusBarProps={{ barStyle: 'light-content', backgroundColor: '#24a060' }}
          containerStyle={styles.header}
          leftComponent={this.renderMenuIcon(navigation)}
          centerComponent={{ text: 'Menu', style: styles.titleStyle }}
          rightComponent={this.renderRightHeaderIcon(navigation)}
        />
        <ScrollView style={[{ flex: 1, backgroundColor: '#f9f9f9' }, styles.container]}>

          {
            menu && menu.map(this.renderDish)
          }

        </ScrollView>

      </View>
    );
  }
};

const mapStateToProps = ({ mealReducer }) => ({
  menu: mealReducer.menu,
  isLoading: mealReducer.isLoading,
  error: mealReducer.error,
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F9F9F9',
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
});

export default connect(mapStateToProps, { fetchMenu })(MenuList);
