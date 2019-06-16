import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import { Card, Icon, Button, Badge, Header } from 'react-native-elements';

class MealDetail extends Component {

  static navigationOptions = {
    header: null,
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
      onPress={() => navigation.navigate('MenuList')}
    />
  }

  render() {
    const { navigation } = this.props;
    const { meal } = navigation.state.params;
    if (meal) {
      return (
        <View style={styles.container}>
          <Animatable.View animation="fadeInRightBig" duration={400}>
            <Header
              statusBarProps={{ barStyle: 'light-content', backgroundColor: '#24a060' }}
              containerStyle={styles.header}
              leftComponent={this.renderMenuIcon(navigation)}
              centerComponent={{ text:  `${meal.name }`, style: styles.titleStyle }}
              rightComponent={this.renderRightHeaderIcon(navigation)}
            />
              <Card
                image={{ uri: meal.imgurl }}
                imageStyle={{
                  height: 250,
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
                  <Icon
                    name='favorite'
                    size={35}
                    color='#B32F20'
                  />
                </View>
                <Text style={{ marginBottom: 10 }}>
                  {meal.description}
                </Text>
                <Button
                  raised
                  type='solid'
                  title='Add to Cart'
                  buttonStyle={{ backgroundColor: "#B32F20" }}
                  titleStyle={{ color: "#f9f9f9" }}
                  onPress={() => navigation.navigate('MealDetail', { meal })}
                  containerStyle={{
                    marginTop: '2%',
                    marginBottom: '5%'
                  }}
                />
                <Button
                  type='outline'
                  title='Bact to Menu'
                  buttonStyle={{ borderColor: "#2FBE74", backgroundColor: "#f9f9f9" }}
                  titleStyle={{ color: "#2FBE74", paddingLeft: 5 }}
                  onPress={() => navigation.navigate('MenuList')}
                  containerStyle={{
                    marginBottom: '2%'
                  }}
                  iconLeft
                  icon={
                    <Icon
                      name="back"
                      size={25}
                      color="#2FBE74"
                      type='antdesign'
                    />
                  }
                />
              </Card>
          </Animatable.View>
        </View>
      )
    } else {
      return (
        <View style={[{
          backgroundColor: '#8CAE68',
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center'
        }, styles.container]}>
          <Text>No meal selected</Text>
          <Button
            title="Go back to Menu"
            onPress={() => navigation.navigate('Menu')}
          />
        </View>
      );
    }
  }
};
export default MealDetail;

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
});
