import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { Overlay } from 'react-native-elements';

const OverlayLoader = ({ message, isVisble, pri800 }) => {

  return (
    <Overlay
      isVisible={isVisble}
      height={60}
      windowBackgroundColor='rgba(0, 0, 0, .25)'
    >
      <View style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
      }}>
        <ActivityIndicator size="large" color={pri800} />
        <Text style={{ textAlign: 'center', fontFamily: 'sans-serif-condensed' }}>{message}</Text>
      </View>
    </Overlay>
  );
};

export default OverlayLoader;
