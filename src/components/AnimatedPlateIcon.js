import React from 'react';
import LottieView from 'lottie-react-native';

export default () => (
  <LottieView style={{
    height: 200,
    width: 200,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '6%',
    marginBottom: '6%'
  }}
  source={require('../assets/animatedPlate.json')} autoPlay loop
  />
);