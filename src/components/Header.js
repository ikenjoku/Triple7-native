import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, } from 'react-native';
import { Icon, Header } from 'react-native-elements';

class CustomHeader extends Component {

  renderMenuIcon = (navigation) => {
    return <Icon
      name='menu'
      size={24}
      color='#fff'
      underlayColor='transparent'
      onPress={() => navigation.toggleDrawer()}
    />;
  }

  render () {
    const { navigation, title, rightComponent } = this.props;
    return (
      <Header
        statusBarProps={{ barStyle: 'light-content', backgroundColor: '#009145' }}
        containerStyle={styles.header}
        backgroundColor='#00b25c'
        leftComponent={this.renderMenuIcon(navigation)}
        centerComponent={{ text:  `${title}`, style: styles.titleStyle }}
        rightComponent={rightComponent(navigation)}
      />
    );
  }
}

const styles = StyleSheet.create({
  titleStyle: {
    fontSize: 20,
    color: '#ffffff',
    fontWeight: '500',
    alignSelf: 'flex-start',
    fontFamily:'sans-serif-condensed',
  },
  header: {
    height: 54,
    elevation:6,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20
  },
});

export default CustomHeader;