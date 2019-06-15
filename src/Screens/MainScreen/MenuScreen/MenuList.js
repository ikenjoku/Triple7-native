import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card, Icon, Button, Badge } from 'react-native-elements';

import { fetchMenu } from "../../../redux/actions/mealActions";


class MenuList extends Component {

  static navigationOptions = {
    header: null
  }

  componentDidMount() {
    this.props.fetchMenu();
  }

  renderDish = (meal) => {
    if (meal.category !== 'Drikns'){
      return (<Card
        key={meal._id}
        image={{uri:meal.imgurl}}
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
        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
        <Text style={{marginBottom: 10, fontWeight:'700'}}>
          {meal.name}
        </Text>
        <Badge value={meal.category} textStyle={{color: '#2FBE74'}} badgeStyle={{ backgroundColor:'#fff', padding: 5, borderColor:'#2FBE74' }} />
        <Badge value="+ Add to Cart" badgeStyle={{ backgroundColor:'#B32F20', padding: 15 }} />
        </View>
        <Text style={{marginBottom: 10}}>
          {meal.description}
        </Text>
        <Button
          type ='outline'
          title='VIEW'
          buttonStyle={{borderColor: "#2FBE74", backgroundColor: "#f9f9f9"}}
          titleStyle={{color: "#2FBE74"}}
          />
      </Card>);
    }
  }

  render() {
    const { menu } = this.props;
    const meal = menu[4];
    const { navigate } = this.props.navigation;
    return (
      <ScrollView style={[{ backgroundColor: '#f9f9f9' }, styles.container]}>
      {
        menu && menu.map(this.renderDish)
      }
      </ScrollView>
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
  },
});


export default connect(mapStateToProps, { fetchMenu })(MenuList);
