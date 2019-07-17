import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { changeTheme } from '../redux/actions/themeActions';

export class ColorPalette extends Component {
  state = {
    colorOptions: ['#2fbe74', '#8b50da', '#f69400', '#000000']
  }

  renderPalette = (color) => {

    return (
      <TouchableOpacity key={color} onPress={() => this.props.changeTheme(color)}>
        <View style={{ height: 40, width: 40, borderRadius: 20, backgroundColor: color, margin: 5 }}>
        </View>
      </TouchableOpacity>
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

const mapStateToProps = ({ themeReducer }) => ({
  theme: themeReducer.theme,
});

export default connect(mapStateToProps, { changeTheme })(ColorPalette);
