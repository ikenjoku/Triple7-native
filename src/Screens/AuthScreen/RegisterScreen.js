import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Input } from 'react-native-elements';
import { Item, Picker, Icon } from 'native-base';
const Logo = require('../../assets/Logo2.png');

class RegisterScreen extends Component {
  state = {
    firstname: '',
    lastname: '',
    password: '',
    email: '',
    phone: '',
    gender: '',
  }

  handleGenderChange = (value) => {
    this.setState({ gender: value });
  }

  render() {
    const { navigate } = this.props.navigation;
    const theme = {
      pri50: '#e4f6eb',
      pri800: '#007f39',
      sec700: '#be2f79',
    };
    const bodyTextColor = '#6c6d6c';
    return (
      <ScrollView style={[{backgroundColor: theme.pri50}, styles.container]}>
        <View style={styles.containImage}>
          <Image
            source={Logo}
            style={styles.logo}
          />
        </View>
        <View>
          <Text style={styles.loginText}>Create an account.</Text>
        </View>
        <View style={styles.containLoginForm}>
          <View style={styles.containTextInput}>
            <Input
              placeholder='First Name'
              autoCompleteType={'name'}
              placeholderTextColor={bodyTextColor}
              onChangeText={(firstname) => this.setState({ firstname })}
              value={this.state.firstname}
              style={styles.textInput}
            />
          </View>
          <View style={styles.containTextInput}>
            <Input
              placeholder='Last Name'
              autoCompleteType={'name'}
              placeholderTextColor={bodyTextColor}
              onChangeText={(lastname) => this.setState({ lastname })}
              value={this.state.lastname}
              style={styles.textInput}
            />
          </View>
          <View style={styles.containTextInput}>
            <Input
              placeholder='Password'
              secureTextEntry={true}
              autoCapitalize={'none'}
              placeholderTextColor={bodyTextColor}
              onChangeText={(password) => this.setState({ password })}
              value={this.state.password}
              style={styles.textInput}
            />
            <Input
              placeholder='Email'
              placeholderTextColor={bodyTextColor}
              keyboardType='email-address'
              autoCompleteType={'email'}
              autoCapitalize={'none'}
              onChangeText={(email) => this.setState({ email })}
              value={this.state.email}
              style={styles.textInput}
            />
          </View>
          <View style={styles.containTextInput}>
            <Input
              placeholder='Phone Number'
              keyboardType='phone-pad'
              secureTextEntry={true}
              autoCompleteType={'tel'}
              placeholderTextColor={bodyTextColor}
              onChangeText={(phone) => this.setState({ phone })}
              value={this.state.phone}
              style={styles.textInput}
            />
          </View>
          <View style={{
            flexDirection: 'row',
            paddingLeft: '4%',
            paddingRight: '3%',
          }}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <Text style={{ fontSize: 20, color: '#6c6d6c' }}>Gender</Text>
            </View>
            <View  style={{ flex: 1 }}>
              <Item picker>
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="arrow-down" />}
                  style={{ color: bodyTextColor }}
                  placeholder="Gender"
                  placeholderStyle={{ color: bodyTextColor }}
                  placeholderIconColor={bodyTextColor}
                  selectedValue={this.state.gender}
                  onValueChange={this.handleGenderChange}
                >
                  <Picker.Item label="" value={''} />
                  <Picker.Item label="Male" value={'male'} />
                  <Picker.Item label="Female" value={'female'} />
                </Picker>
              </Item>
            </View>
          </View>
          <View>
            <Text
              style={[{ color: theme.sec700 }, styles.passwordText]}
              onPress={() => navigate('ResetPassword')}
            >Forgot Password?</Text>
          </View>
          <TouchableOpacity
            onPress={(text) => { }}
            activeOpacity={0.8}
          >
            <View elevation={5} style={styles.containButton}>
              <Text
                style={[{ backgroundColor: theme.pri800 }, styles.loginButton]}
              >
                  Register
              </Text>
            </View>
          </TouchableOpacity>
          <View style={styles.containRegisterText}>
            <Text
              style={[{ color: theme.sec700 }, styles.registerText]}
              onPress={() => navigate('Login')}
            >Login</Text>
          </View>
        </View>
      </ScrollView>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: '3%',
    paddingRight: '3%',
    paddingBottom: '20%',
  },
  containImage: {
    marginTop: '10%',
    marginBottom: '10%',
    width: '75%',
    alignSelf: 'center',
  },
  logo: {
    width: null,
    resizeMode: 'contain',
  },
  loginText: {
    paddingLeft: '3%',
    color: '#777f7c',
    fontFamily: 'sans-serif-medium',
  },
  containLoginForm: {
    marginTop: '10%',
  },
  containTextInput: {

  },
  loginButton: {
    color: '#f9f9f9',
    borderRadius: 5,
    paddingTop: 7,
    paddingBottom: 7,
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'sans-serif-medium'
  },
  containButton: {
    backgroundColor:'#d9d9d9',
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    }
  },
  passwordText: {
    textAlign: 'right',
    paddingBottom: '7%',
    paddingTop: '7%',
    fontFamily: 'sans-serif-medium'
  },
  textInput: {
    paddingBottom: '5%',
    paddingTop: '5%',
  },
  containRegisterText: {
    paddingTop: '7%',
    marginBottom: '30%',
  },
  registerText: {
    textAlign: 'center',
    fontFamily: 'sans-serif-medium',
  },
  formCheckbox: {
    marginTop: 20,
  },
});

export default RegisterScreen;