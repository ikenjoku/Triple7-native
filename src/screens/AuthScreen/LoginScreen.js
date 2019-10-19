import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Input, CheckBox, Icon } from 'react-native-elements';
import { getData, storeData, deleteData } from '../../utils/asyncStore';
import { toastError } from '../../redux/actions/notifications';
import { loginUser } from '../../redux/actions/authActions';
import { changeTheme } from '../../redux/actions/themeActions';
import OverlayLoader from '../../components/OverlayLoader';

const Logo = require('../../assets/Logo2.png');

class LoginScreen extends Component {
  state = {
    email: '',
    password: '',
    remember: false,
  }

  componentDidMount() {
    getData('@triple7-loginDetails')
      .then((userdata) => {
        if (userdata) {
          this.setState({
            email: userdata.email,
            password: userdata.password,
            remember: true
          });
        }
      })
      .catch((err) => {
        console.log('Error retrieving credentials', err);
      });

    getData('@triple7-theme')
      .then((themeColor) => {
        if (themeColor) {
          this.props.changeTheme(themeColor);
        }
      })
      .catch(() => {
        //Error retrieving theme color
      });
  }

  handleLogin = () => {
    const { email, password, remember } = this.state;
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let errMsg = '';

    if (!email.trim() || !re.test(String(email.trim()).toLowerCase())) {
      errMsg += 'Please provide a valid email address';
    }
    if (!password) {
      errMsg += '\nPlease provide your password';
    }

    if (!errMsg) {
      this.props.loginUser({ email, password });
      if (remember) {
        storeData('@triple7-loginDetails', { email, password })
          .catch(() => {
            // eslint-disable-next-line no-console
            console.log('Error storing credentials');
          });
      } else {
        deleteData('@triple7-loginDetails')
          .catch(() => {
            // eslint-disable-next-line no-console
            console.log('Error deleting credentials');
          });
      }
    } else {
      toastError(errMsg);
    }
  }

  render() {
    const { isLoading } = this.props;
    const { navigate } = this.props.navigation;
    const theme = {
      pri50: '#e4f6eb',
      pri500: '#00b25c',
      pri700: '#009145',
      pri800: '#007f39',
      sec700: '#be2f79',
    };
    const bodyTextColor = '#6c6d6c';
    return (
      <ScrollView style={[{backgroundColor: theme.pri50}, styles.container]}>
        <OverlayLoader
          message='Please wait, logging you in...'
          pri800={theme.pri800}
          isVisble={isLoading}
        />
        <View style={styles.containImage}>
          <Image
            source={Logo}
            style={styles.logo}
          />
        </View>
        <View>
          <Text style={styles.loginText}>Please login to continue.</Text>
        </View>
        <View style={styles.containLoginForm}>
          <View style={styles.containTextInput}>
            <Input
              placeholder='Email'
              placeholderTextColor={bodyTextColor}
              keyboardType='email-address'
              autoCapitalize={'none'}
              onChangeText={(email) => this.setState({ email })}
              value={this.state.email}
              style={styles.textInput}
              leftIcon={
                <Icon
                  name='email-outline'
                  type='material-community'
                  size={24}
                  color={bodyTextColor}
                  shake={true}
                  containerStyle={{ marginRight: 15 }}
                />
              }
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
              leftIcon={
                <Icon
                  size={24}
                  color={bodyTextColor}
                  shake={true}
                  type='antdesign'
                  name='lock'
                  containerStyle={{ marginRight: 15}}
                />
              }
            />
          </View>
          <CheckBox title="Remember me"
            left
            checked={this.state.remember}
            onPress={() => this.setState({ remember: !this.state.remember })}
            containerStyle={[{backgroundColor: theme.pri50}, styles.formCheckbox]}
            checkedColor={theme.sec700}
            textStyle={{
              color: bodyTextColor,
              fontWeight: '300',
              fontFamily: 'sans-serif-medium'
            }}
          />
          <View style={styles.containPasswordText}>
            <Text
              style={[{ color: theme.sec700 }, styles.passwordText]}
              onPress={() => navigate('ResetPassword')}
            >Forgot password?</Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={this.handleLogin}
          >
            <View elevation={5} style={styles.containButton}>
              <Text
                style={[{ backgroundColor: theme.pri800 }, styles.loginButton]}
              >
                  Login
              </Text>
            </View>
          </TouchableOpacity>
          <View style={styles.containRegisterText}>
            <Text
              style={[{ color: theme.sec700 }, styles.registerText]}
              onPress={() => navigate('Register')}
            >Register</Text>
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
    color: '#777f7c',
    paddingLeft: '3%',
    fontFamily: 'sans-serif-medium',
  },
  containLoginForm: {
    paddingBottom: '10%',
    marginTop: '20%',
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
  },
  registerText: {
    textAlign: 'center',
    fontFamily: 'sans-serif-medium',
  },
  formCheckbox: {
    marginTop: 20,
  },
});

const mapStateToProps = ({ authReducer }) => ({
  isLoading: authReducer.isLoading,
});

export default connect(mapStateToProps, { loginUser, changeTheme })(LoginScreen);