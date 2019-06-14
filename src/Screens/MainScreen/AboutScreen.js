import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Header, Card } from 'react-native-elements';


class AboutScreen extends Component {

  static navigationOptions = {
    drawerLabel: "About Triple-7"
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={[{ backgroundColor: '#FFFFFF' }, styles.container]}>
      
      <Animatable.View animation="fadeInRightBig" duration={500}>
      <Header
        statusBarProps={{ barStyle: 'light-content', backgroundColor: '#2FBE74' }}
        containerStyle={{
          backgroundColor: '#2FBE74',
          paddingLeft: 20,
          paddingRight: 20,
        }}
        leftComponent={{ icon: 'menu', color: '#fff', size: 35 }}
        centerComponent={{ text: 'About Triple 7', style: { color: '#fff', fontSize: 20 } }}
        rightComponent={{ icon: 'home', color: '#fff', size: 25 }}
      />
          <Card>
            <Text style={{ textAlign: 'center', fontWeight: '700', margin: 10, borderBottomColor: '#aba8a8', borderBottomWidth: 1, paddingBottom: 10 }}>Our History</Text>
            <Text style={{ marginTop: 10 }}>
              Started in 2010, Ristorante con Fusion quickly established
              itself as a culinary icon par excellence in Hong Kong. With
              its unique brand of world fusion cuisine that can be found nowhere else,
              it enjoys patronage from the A-list clientele in Hong Kong.  Featuring
              four of the best three-star Michelin chefs in the world,
             you never know what will arrive on your plate the next time you visit us.</Text>
            <Text style={{ marginTop: 10 }}> The restaurant traces its humble beginnings
            to The Frying Pan, a successful chain started by our CEO, Mr. Peter Pan,
             that featured for the first time the world's best cuisines in a pan.</Text>
          </Card>
        </Animatable.View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
});

export default AboutScreen;