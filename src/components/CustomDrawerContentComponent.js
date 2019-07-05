import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { DrawerItems, SafeAreaView } from 'react-navigation';
import { Avatar, Divider, Icon } from 'react-native-elements';
import ColorPalette from '../components/ColorPalette.js';


class CustomDrawerContentComponent extends Component {

  render() {
    return (
      <ScrollView>
        <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
          <View style={{ paddingTop: '4%', paddingBottom: '4%', backgroundColor:'#009145' }}>
            <View style={{ justifyContent: 'center', alignItems:'center' }}>
              <Avatar size='large' rounded icon={{ name: 'user-circle-o', type:'font-awesome', size: 80 }} />
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
            <View style={{ backgroundColor: '#d1d1d1' }}>
              <View style={{paddingLeft: '6%', flexDirection:'row', alignItems: 'center', paddingBottom: '2%', paddingTop: '2%'}}>
                <Icon
                  name='logout'
                  type='simple-line-icon'
                  size={20}
                  color={'#00602580'}
                  containerStyle={{ marginRight: '10%' }}
                />
                <Text style={{ color: 'black', fontFamily: 'sans-serif-medium' }}>Log Out</Text>
              </View>
              <View style={{paddingLeft: '6%', flexDirection:'row', alignItems: 'center', paddingBottom: '6%', paddingTop: '2%'}}>
                <Icon
                  name='user-secret'
                  type='font-awesome'
                  size={24}
                  color={'#00602590'}
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
});

export default CustomDrawerContentComponent;
