import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { DrawerItems, SafeAreaView } from 'react-navigation';
import { Avatar, Divider, Icon } from 'react-native-elements';
import ColorPalette from '../components/ColorPalette.js';


class CustomDrawerContentComponent extends Component {

  render() {
    const { theme } = this.props;
    return (
      <ScrollView>
        <SafeAreaView
          style={styles.container}
          forceInset={{ top: 'always', horizontal: 'never' }}
        >
          <View style={[ styles.containHeader, { backgroundColor: theme.pri700 }]}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Avatar size='large' rounded icon={{ name: 'user-circle-o', type: 'font-awesome', size: 80 }} />
              <Text style={{ color: '#f9f9f9', marginTop: '3%', fontFamily: 'sans-serif-condensed' }}>Hi Jenie</Text>
              <Text style={{ color: '#f9f9f9', fontFamily: 'sans-serif-condensed' }}>jenie@gmail.com</Text>
            </View>
          </View>

          <DrawerItems {...this.props} />

          <View>
            <View style={{ marginTop: '2%' }}>
              <Divider style={{ backgroundColor: '#777f7c90' }} />
            </View>
            <View style={{ marginTop: '3%' }}>
              <ColorPalette />
            </View>
            <View style={{ marginTop: '5%' }}>
              <Divider style={{ backgroundColor: '#777f7c90' }} />
            </View>
            <View style={{ backgroundColor: '#e6e6e6' }}>
              <View style={[styles.containDrawerOption, { paddingBottom: '2%' }]}>
                <Icon
                  name='logout'
                  type='simple-line-icon'
                  size={20}
                  color={theme.pri700}
                  containerStyle={{ marginRight: '10%' }}
                />
                <Text style={{ color: 'black', fontFamily: 'sans-serif-medium' }}>Log Out</Text>
              </View>
              <View style={[styles.containDrawerOption, { paddingBottom: '6%' }]}>
                <Icon
                  name='user-secret'
                  type='font-awesome'
                  size={24}
                  color={theme.pri700}
                  containerStyle={{ marginRight: '10%' }}
                />
                <Text style={{ color: 'black', fontFamily: 'sans-serif-medium' }}>Developer</Text>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containHeader: {
    paddingTop: '4%',
    paddingBottom: '4%'
  },
  containDrawerOption: {
    paddingLeft: '6%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: '2%',
  }
});

const mapStateToProps = ({ themeReducer }) => ({
  theme: themeReducer.theme,
});

export default connect(mapStateToProps, {})(CustomDrawerContentComponent);
