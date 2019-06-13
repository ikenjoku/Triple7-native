import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

import RootApp from './src/navigation/AppNavigator';


export default class App extends Component {
  // Decide weath to show auth screen or main app
  //AuthScreen
  //main page of menulist
  //has a stack navigation ==> detail ==> cart ==> checkout
  //housed in a drawer navigation as Menu.

  render() {
    return (
      <RootApp />
    );
  }
}
