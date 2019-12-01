import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Card, Button, Icon } from 'react-native-elements';
import CustomHeader from '../../components/Header';
class AboutScreen extends Component {
  static navigationOptions = {
    drawerLabel: 'About Triple 7',
    drawerIcon: () => (
      <Icon
        name='info-outline'
        type='material-icons'
        size={24}
        color='#777f7c'
      />
    ),
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

  render() {
    const { navigation, theme } = this.props;

    return (
      <Animatable.View animation="fadeInRightBig" duration={400} style={styles.container}>
        <CustomHeader
          title={'About Triple 7'}
          navigation={this.props.navigation}
          rightComponent={this.renderRightHeaderIcon}
        />
        <ScrollView>
          <Card>
            <Text style={styles.cardTitle}>Our History</Text>
            <Text style={styles.spaceTop}>
              A fast food restaurant with a difference. Highly 
              distinguished by our cosy environment and sumptuous 
              intercontinental cuisine and African foods with homely 
              tastes.
              Enjoy our excellent delivery of local cuisine in our beautiful
              kitchen. We deliver the same value to your home for customers in 
              and around Ajao Estate.
              Also make table reservations when planning for special occasions 
              and celebrations
            </Text>
            <Text style={styles.spaceTop}>Give yourself a treat today. Experience 
            our services with amazing offers and gifts.</Text>
            <View>
              <Button
                raised
                icon={
                  <Icon
                    name="food"
                    size={25}
                    color="white"
                    type='material-community'
                  />
                }
                iconLeft
                title="Checkout our menu"
                titleStyle={{
                  paddingLeft: 5
                }}
                onPress={() => navigation.navigate('Menu')}
                containerStyle= {{
                  marginTop: 20,
                  marginBottom: 10
                }}
                buttonStyle={{
                  backgroundColor: theme.sec700
                }}
              />
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
  cardTitle: {
    textAlign: 'center',
    fontWeight: '500',
    borderBottomColor: '#aba8a8',
    borderBottomWidth: 1,
    paddingBottom: 10,
    fontSize: 15
  },
  spaceTop: { marginTop: 10 }
});

const mapStateToProps = ({ themeReducer }) => ({
  theme: themeReducer.theme,
});

export default connect(mapStateToProps, { })(AboutScreen);