import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, } from 'react-native';
import { Card, Icon, Button, Header } from 'react-native-elements';

class CustomHeader extends Component {

  renderMenuIcon = (navigation) => {
    return <Icon
      name='menu'
      size={35}
      color='#fff'
      underlayColor='transparent'
      onPress={() => navigation.toggleDrawer()}
    />
  }

  render () {
    const { navigation, title, rightComponent } = this.props;
    return (
      <Header
        statusBarProps={{ barStyle: 'light-content', backgroundColor: '#24a060' }}
        containerStyle={styles.header}
        leftComponent={this.renderMenuIcon(navigation)}
        centerComponent={{ text:  `${title}`, style: styles.titleStyle }}
        rightComponent={rightComponent(navigation)}
      />
    );
  }
};

const styles = StyleSheet.create({
  titleStyle: {
    color: '#f9f9f9',
    fontSize: 20,
    fontWeight: '600'
  },
  header: {
    backgroundColor: '#2FBE74',
    paddingLeft: 20,
    paddingRight: 20,
    elevation:6
  },
});

export default CustomHeader;