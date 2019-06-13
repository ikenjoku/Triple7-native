import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StatusBar,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

const AuthBackground = require('../../assets/auth-background.png');
const Logo = require('../../assets/Logo2.png');


class LoginScreen extends Component {
  state = {
    email: '',
    password: '',
  }

  static navigationOptions = {
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <ImageBackground style={styles.container} source={AuthBackground}>
        <StatusBar hidden={true} />

        <View style={styles.containImage}>
          <Image
            source={Logo}
            style={styles.logo}
          />
        </View>
        <View style={styles.containWelcomeText}>
          <Text style={styles.welcomeText}>Welcome Back!</Text>
        </View>
        <View style={styles.containLoginText}>
          <Text style={styles.loginText}>Please login to continue.</Text>
        </View>
        <View elevation={5} style={styles.containLoginForm}>
          <View style={styles.containTextInput}>
            <TextInput
              placeholder='Email'
              placeholderTextColor='#6c6d6c'
              underlineColorAndroid='#a1a5a0'
              onChangeText={(text) => { }}
              value={this.state.email}
              style={styles.textInput} />
          </View>
          <View style={styles.containTextInput}>
            <TextInput
              placeholder='Password'
              placeholderTextColor='#6c6d6c'
              underlineColorAndroid='#a1a5a0'
              secureTextEntry={true}
              onChangeText={(text) => { }}
              value={this.state.password}
              style={styles.textInput} />
          </View>
          <View style={styles.containPasswordText}>
            <Text style={styles.passwordText}>Forgot Password?</Text>
          </View>
          <View style={styles.containButton}>
            <TouchableOpacity onPress={(text) => { }}>
              <Text style={styles.loginButton}>
                Login
            </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.containRegisterText}>
            <Text style={styles.registerText}>Register Here</Text>
          </View>
        </View>
      </ImageBackground>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '8%',
    paddingLeft: '5%',
    paddingRight: '5%',
    top: 0,
    left: 0
  },
  containImage: {
    width: '35%',
  },
  logo: {
    width: null,
    resizeMode: 'contain',
  },
  containWelcomeText: {
    marginTop: '5%',
  },
  welcomeText: {
    color: '#777f7c',
    fontSize: 22,
    fontWeight: 'bold',
  },
  containLoginText: {
    marginTop: '20%',
  },
  loginText: {
    color: '#777f7c',
  },
  containLoginForm: {
    // borderColor: '#eee',
    // shadowOffset: { width: 5, height: 5, },
    // shadowColor: '#eee',
    // shadowOpacity: 0.2,
    // shadowRadius: 10,
    paddingLeft: '3%',
    paddingRight: '3%',
    paddingBottom: '10%',
    paddingTop: '5%',
    marginTop: '15%',
  },
  containTextInput: {

  },
  loginButton: {
    backgroundColor: '#47B351',
    color: '#f9f9f9',
    borderRadius: 5,
    paddingTop: 7,
    paddingBottom: 7,
    fontSize: 20,
    textAlign: 'center',
  },
  containButton: {
    
  },
  containPasswordText: {
  },
  passwordText: {
    color: '#777f7c',
    textAlign: 'right',
    paddingBottom: '5%',
    paddingTop: '5%',
    fontWeight: '500',
  },
  textInput: {
    paddingBottom: '5%',
    paddingTop: '5%',
  },
  containRegisterText: {
    paddingTop: '5%',
  },
  registerText: {
    textAlign: 'center',
    fontWeight: '500',
    color: '#777f7c',
  }
});

export default LoginScreen;