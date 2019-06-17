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
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, CheckBox } from 'react-native-elements';

const AuthBackground = require('../../assets/auth-background.png');
const Logo = require('../../assets/Logo2.png');


class LoginScreen extends Component {
  state = {
    email: '',
    password: '',
    remember: false,
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
            <Input
              placeholder='Email'
              placeholderTextColor='#6c6d6c'
              onChangeText={(email) => this.setState({ email })}
              value={this.state.email}
              style={styles.textInput}
              leftIcon={
                <Icon
                  name='envelope-open-o'
                  size={24}
                  color='#6c6d6c'
                  shake={true}
                  style={{ marginRight: 10, }}
                />
              }
            />
            </View>
            <View style={styles.containTextInput}>
              <Input
                placeholder='Password'
                secureTextEntry={true}
                placeholderTextColor='#6c6d6c'
                onChangeText={(password) => this.setState({ password })}
                value={this.state.password}
                style={styles.textInput}
                leftIcon={
                  <Icon
                    name='eye'
                    size={24}
                    color='#6c6d6c'
                    shake={true}
                    style={{ marginRight: 10, }}
                  />
                }
              />
            </View>
            <CheckBox title="Remember me"
              left
              checked={this.state.remember}
              onPress={() => this.setState({ remember: !this.state.remember })}
              containerStyle={styles.formCheckbox}
              checkedColor="#2FBE74"
            />
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
    paddingTop: '3%',
    paddingLeft: '5%',
    paddingRight: '5%',
  },
  containImage: {
    width: '35%',
  },
  logo: {
    width: null,
    resizeMode: 'contain',
  },
  containWelcomeText: {
    marginTop: '4%',
  },
  welcomeText: {
    color: '#777f7c',
    fontSize: 22,
    fontWeight: 'bold',
  },
  containLoginText: {
    marginTop: '24%',
  },
  loginText: {
    color: '#777f7c',
  },
  containLoginForm: {
    paddingLeft: '3%',
    paddingRight: '3%',
    paddingBottom: '10%',
    paddingTop: '5%',
    marginTop: '10%',
  },
  containTextInput: {

  },
  loginButton: {
    backgroundColor: '#2FBE74',
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
  },
  formCheckbox: {
    marginTop: 10,
    backgroundColor: null,
  },
});

export default LoginScreen;