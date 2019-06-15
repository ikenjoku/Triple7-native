import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { Provider } from 'react-redux';
import store from './src/redux/configureStore';
import RootApp from './src/navigation/AppNavigator';

// const store = configureStore();

export default class App extends Component {
  // Decide weath to show auth screen or main app
  //AuthScreen
  //main page of menulist
  //has a stack navigation ==> detail ==> cart ==> checkout
  //housed in a drawer navigation as Menu.

  render() {
    return (
      <Provider store={store}>
        <RootApp />
      </Provider>
    );
  }
}
