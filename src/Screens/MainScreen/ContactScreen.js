import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Header, Card, Button, Icon } from 'react-native-elements';
import CustomHeader from "../../components/Header";

const RenderIcon = (props) => {
  const { name, size, color, type, onPress } = props;
  return (
    <Icon
      name={name}
      size={size}
      color={color}
      type={type || 'material'}
      underlayColor='transparent'
      onPress={onPress || null}
      {...props}
    />
  );
}

class ContactScreen extends Component {

  toggleDrawer = (navigation) => navigation.toggleDrawer();

  navigateToMenu = (navigation) => navigation.navigate('Menu');

  renderRightHeaderIcon = (navigation) => {
    return <RenderIcon
      name={'home'}
      size={35}
      color={'#f9f9f9'}
      onPress={() => this.navigateToMenu(navigation)}
    />;
  }

  render() {
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <Animatable.View animation="fadeInRightBig" duration={400}>
          <CustomHeader
            title={'Contact'}
            navigation={this.props.navigation}
            rightComponent={this.renderRightHeaderIcon}
          />
          <Card>
            <Text style={styles.cardTitle}>Address</Text>
            <Text style={styles.spaceTop}> 121, Clear Water Bay Road</Text>
            <Text style={styles.spaceTop}> Clear Water Bay, Kowloon</Text>
            <Text style={styles.spaceTop}> Lagos</Text>
            <View style={styles.containPhoneNo}>
              <RenderIcon
                name={'phone-call'}
                size={20}
                type='feather'
                color='#777f7c'
                containerStyle={{
                  paddingTop: 16
                }}
              />
              <Text style={styles.spaceTop}>  0808 553 1234</Text>
            </View>
            <View style={styles.containPhoneNo}>
              <RenderIcon
                name={'phone-call'}
                size={20}
                type='feather'
                color='#777f7c'
                containerStyle={{
                  paddingTop: 16
                }}
              />
              <Text style={styles.spaceTop}>  0808 321 8888</Text>
            </View>
            <View>
              <Text style={styles.spaceTop}> Send us a message:</Text>
              <View style={styles.containSocialBtn}>
                <RenderIcon
                  reverse
                  raised
                  size={30}
                  name='whatsapp'
                  type='font-awesome'
                  color='#24a060'
                  onPress={() => console.log('hello')} />

                <RenderIcon
                  reverse
                  raised
                  size={30}
                  name='email'
                  type='material-community'
                  color='#B32F20'
                  onPress={() => console.log('hello')} />
              </View>
            </View>
            <View>
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
  cardTitle: {
    textAlign: 'center',
    fontWeight: '500',
    borderBottomColor: '#aba8a8',
    borderBottomWidth: 1,
    paddingBottom: 10,
    fontSize: 15
  },
  spaceTop: { marginTop: 10 },
  containPhoneNo: {
    flexDirection: "row",
    alignItems: 'center'
  },
  containSocialBtn: {
    flexDirection: "row",
    justifyContent: 'space-around',
    margin: '5%'
  },
});

export default ContactScreen;