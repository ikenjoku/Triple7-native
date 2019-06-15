import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Header, Card, Button, Icon } from 'react-native-elements';

class AboutScreen extends Component {

  static navigationOptions = {
    drawerLabel: "About Triple 7",
    drawerIcon: () => (
      <Icon
        name='info-outline'
        type='material-icons'
        size={24}
        color='#777f7c'
      />
    ),
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

  render() {
    const { navigation } = this.props;

    return (
      <View style={[{ backgroundColor: '#FFFFFF' }, styles.container]}>
      <Animatable.View animation="fadeInRightBig" duration={400}>
      <Header
        statusBarProps={{ barStyle: 'light-content', backgroundColor: '#24a060' }}
        containerStyle={{
          backgroundColor: '#2FBE74',
          paddingLeft: 20,
          paddingRight: 20,
        }}
        leftComponent={this.renderMenuIcon(navigation)}
        centerComponent={{ text: 'About Triple 7', style: { color: '#fff', fontSize: 20, fontWeight: '600' } }}
        rightComponent={this.renderRightHeaderIcon(navigation)}
      />
          <Card>
            <Text style={{ textAlign: 'center', fontWeight:'500', borderBottomColor: '#aba8a8', borderBottomWidth: 1, paddingBottom: 10,fontSize: 15 }}>Our History</Text>
            <Text style={{ marginTop: 10, fontWeight:'400'}}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse in diam et nisl faucibus varius non non velit.
              Nunc sodales varius vulputate. Vivamus sed vulputate est,
              nec bibendum mauris. Pellentesque id leo at diam laoreet
              accumsan non sed tortor. Donec quis turpis sem. Nunc rutrum
              venenatis cursus.
            </Text>
            <Text style={{ marginTop: 10, fontWeight:'400' }}>Suspendisse potenti. Aliquam erat volutpat.
            Aliquam pharetra tempor blandit. In at neque faucibus, sagittis
            leo ac, tincidunt nisi. Quisque congue placerat metus a gravida.</Text>
            <View>
            <Button
            raised
              icon={
                <Icon
                  name="local-pizza"
                  size={15}
                  color="white"
                  type='material-icons'
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
                backgroundColor: '#24a060'
              }}
            />
            </View>
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