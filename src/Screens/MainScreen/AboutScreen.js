import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Card, Button, Icon } from 'react-native-elements';
import CustomHeader from '../../components/Header';
class AboutScreen extends Component {

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
    const { navigation } = this.props;
    const theme = {
      pri50: '#e4f6eb',
      pri500: '#00b25c',
      pri700: '#009145',
      pri800: '#007f39',
      sec700: '#be2f79',
      sec900: '#802764',
    };

    return (
      <View style={styles.container}>
        <Animatable.View animation="fadeInRightBig" duration={400}>
          <CustomHeader
            title={'About Triple 7'}
            navigation={this.props.navigation}
            rightComponent={this.renderRightHeaderIcon}
          />
          <Card>
            <Text style={styles.cardTitle}>Our History</Text>
            <Text style={styles.spaceTop}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse in diam et nisl faucibus varius non non velit.
              Nunc sodales varius vulputate. Vivamus sed vulputate est,
              nec bibendum mauris. Pellentesque id leo at diam laoreet
              accumsan non sed tortor. Donec quis turpis sem. Nunc rutrum
              venenatis cursus.
            </Text>
            <Text style={styles.spaceTop}>Suspendisse potenti. Aliquam erat volutpat.
            Aliquam pharetra tempor blandit. In at neque faucibus, sagittis
            leo ac, tincidunt nisi. Quisque congue placerat metus a gravida.</Text>
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
        </Animatable.View>
      </View>
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

export default AboutScreen;