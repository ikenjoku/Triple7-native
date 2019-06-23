import React, { Fragment } from 'react';
import AnimatedLoader from 'react-native-animated-loader';
import { StyleSheet, Text } from 'react-native';
const loadingJSON = require('../assets/cooking2.json');

const defaultSettings = {
  overlayColor: 'rgba(255,255,255,0.75)',
  speed: 1,
  source: loadingJSON
};

export default ({ loading }) => (
    <AnimatedLoader
      visible={loading}
      animationStyle={styles.animationLoader}
      {...defaultSettings}
    />
);

const styles = StyleSheet.create({
  animationLoader: {
    width: 200,
    height: 200
  }
});
