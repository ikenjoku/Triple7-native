import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

export class ColorPalette extends Component {
  state = {
    colorOptions: ['green', 'purple', 'orange', 'black']
  }

  renderPalette = (color) => {

    return (
      <View key={color} style={{ height: 40, width: 40, borderRadius: 20, backgroundColor: color, margin: 5 }}>
      </View>
    );
  }
  render() {
    return (
      <View>
        <Text style={styles.themeTitle}>Choose your theme:</Text>
        <View style={styles.containPalettes}>
          {
            this.state.colorOptions.map(this.renderPalette)
          }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  themeTitle: {
    color: '#333',
    marginLeft: '6%',
    marginBottom: '3%',
    fontFamily: 'sans-serif-condensed'
  },
  containPalettes: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
});

export default ColorPalette;
