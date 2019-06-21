import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Input, CheckBox, Icon } from 'react-native-elements';

const Logo = require('../../assets/Logo2.png');


class RegisterScreen extends Component {
  state = {
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    gender: '',
  }

  static navigationOptions = {
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
        <ScrollView style={{
          flex: 1,
          paddingLeft: '3%',
          paddingRight: '3%',
          paddingBottom: '20%'
        }}>
          <View style={styles.containImage}>
            <Image
              source={Logo}
              style={styles.logo}
            />
          </View>
          <View style={styles.containLoginText}>
            <Text style={styles.loginText}>Create an account.</Text>
          </View>
          <View elevation={5} style={styles.containLoginForm}>
            <View style={styles.containTextInput}>
            <Input
              placeholder='First Name'
              placeholderTextColor='#6c6d6c'
              onChangeText={(email) => this.setState({ firstname })}
              value={this.state.email}
              style={styles.textInput}
            />
            </View>
            <View style={styles.containTextInput}>
              <Input
                placeholder='Password'
                secureTextEntry={true}
                placeholderTextColor='#6c6d6c'
                onChangeText={(lastname) => this.setState({ lastname })}
                value={this.state.password}
                style={styles.textInput}
              />
              <Input
              placeholder='Email'
              placeholderTextColor='#6c6d6c'
              onChangeText={(email) => this.setState({ email })}
              value={this.state.email}
              style={styles.textInput}
            />
            </View>
            <View style={styles.containTextInput}>
              <Input
                placeholder='Phone Number'
                secureTextEntry={true}
                placeholderTextColor='#6c6d6c'
                onChangeText={(lastname) => this.setState({ phone })}
                value={this.state.password}
                style={styles.textInput}
              />
            </View>
            <View style={styles.containTextInput}>
              <Input
                placeholder='Gender'
                secureTextEntry={true}
                placeholderTextColor='#6c6d6c'
                onChangeText={(lastname) => this.setState({ phone })}
                value={this.state.password}
                style={styles.textInput}
              />
            </View>
            <View style={styles.containPasswordText}>
              <Text
              style={styles.passwordText}
              onPress={() => navigate('ResetPassword')}
              >Forgot Password?</Text>
            </View>
            <TouchableOpacity
              onPress={(text) => { }}
              activeOpacity={0.8}
              >
            <View style={styles.containButton}>
                <Text
                 style={styles.loginButton}
                 >
                  Register
              </Text>
              </View>
              </TouchableOpacity>
            <View style={styles.containRegisterText}>
              <Text
                style={styles.registerText}
                onPress={() => navigate('Login')}
              >Login Here</Text>
            </View>
          </View>
          </ScrollView>

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
    marginTop: '20%',
    width: '75%',
    alignSelf: 'center',
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
    marginTop: '10%',
  },
  loginText: {
    paddingLeft: '3%',
    color: '#777f7c',
    fontWeight: '500',
  },
  containLoginForm: {
    paddingBottom: '10%',
    marginTop: '10%',
  },
  containTextInput: {

  },
  loginButton: {
    backgroundColor: '#2C7C07',
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
    color: '#2FBE74',
    textAlign: 'right',
    paddingBottom: '7%',
    paddingTop: '7%',
    fontWeight: '500',
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
    fontWeight: '500',
    color: '#2FBE74',
  },
  formCheckbox: {
    marginTop: 20,
  },
});

export default RegisterScreen;