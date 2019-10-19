import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Card, Icon } from 'react-native-elements';
import CustomHeader from '../../components/Header';
import whatsappMessenger from '../../utils/whatsappMessenger';
import emailMessenger from '../../utils/emailMessenger';
import makePhoneCall from '../../utils/makePhoneCall';

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
};

class ContactScreen extends Component {
  static navigationOptions = {
    drawerLabel: 'Contact',
    drawerIcon: () => (
      <Icon
        name='contacts'
        size={24}
        type='ant-design'
        color='#777f7c'
      />
    ),
  }

  renderRightHeaderIcon = (navigation) => {
    return <RenderIcon
      name={'home'}
      size={24}
      color='#fff'
      onPress={() => navigation.navigate('Menu')}
    />;
  }

  render() {
    const { theme } = this.props;

    return (
      <Animatable.View animation="fadeInRightBig" duration={400} style={styles.container}>
        <CustomHeader
          title={'Contact'}
          navigation={this.props.navigation}
          rightComponent={this.renderRightHeaderIcon}
        />
        <ScrollView>
          <Card>
            <Text style={styles.cardTitle}>Address</Text>
            <Text style={styles.spaceTop}> 121, Clear Water Bay Road</Text>
            <Text style={styles.spaceTop}> Clear Water Bay, Kowloon</Text>
            <Text style={styles.spaceTop}> Lagos</Text>
            <TouchableOpacity
              onPress={() => makePhoneCall('+2348086082224')}
            >
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
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => makePhoneCall('+2348086082224')}
            >
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
            </TouchableOpacity>
            <View>
              <Text style={styles.spaceTop}> Send us a message:</Text>
              <View style={styles.containSocialBtn}>
                <TouchableOpacity
                  onPress={() => whatsappMessenger('+2348086082224', 'Hello Triple 7')}
                >
                  <RenderIcon
                    reverse
                    raised
                    size={30}
                    name='whatsapp'
                    type='font-awesome'
                    color='#24a060'
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => emailMessenger('ikeenjoku@gmail.com', 'Hello Ike', 'I just want to say Hi')}
                >
                  <RenderIcon
                    reverse
                    raised
                    size={30}
                    name='email'
                    type='material-community'
                    color={theme.sec700}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View>
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
  spaceTop: { marginTop: 10 },
  containPhoneNo: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  containSocialBtn: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: '5%'
  },
});

const mapStateToProps = ({ themeReducer }) => ({
  theme: themeReducer.theme,
});

export default connect(mapStateToProps, {})(ContactScreen);