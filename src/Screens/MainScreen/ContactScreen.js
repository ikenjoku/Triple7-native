import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Header, Card, Button, Icon } from 'react-native-elements';

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
  static navigationOptions = {
    drawerLabel: "Contact",
    drawerIcon: () =>
      <RenderIcon
        name={'contacts'}
        size={24}
        color={'#777f7c'}
        type={'ant-design'}
      />,
  }

  toggleDrawer = (navigation) => navigation.toggleDrawer();

  renderMenuIcon = (navigation) => {
    return <RenderIcon
      size={35}
      name={'menu'}
      color={'#f9f9f9'}
      onPress={() => this.toggleDrawer(navigation)}
    />;
  }

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
          <Header
            statusBarProps={{ barStyle: 'light-content', backgroundColor: '#24a060' }}
            containerStyle={styles.header}
            leftComponent={this.renderMenuIcon(navigation)}
            centerComponent={{ text: 'Contact', style: styles.titleStyle }}
            rightComponent={this.renderRightHeaderIcon(navigation)}
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
                  raised
                  size={30}
                  name='gmail'
                  type='zocial'
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