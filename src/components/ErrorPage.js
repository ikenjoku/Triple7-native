import React, { Component, Fragment } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Icon, Button } from 'react-native-elements';
import { connect } from 'react-redux';

export class ErrorPage extends Component {
  static propTypes = {
    onRefresh: PropTypes.func.isRequired
  }

  render() {
    const { theme, onRefresh } = this.props;
    return (
      <Fragment>
        <View style={{ height: '40%' }}>
          <Icon
            name='wifi-off'
            type='material-community'
            size={80}
            color='#777f7c'
            containerStyle={{ marginTop: '20%' }}
          />
        </View>
        <View style={{ paddingLeft: '3%', paddingRight: '3%', paddingBottom: '3%', flex: 1 }}>
          <Text style={{ textAlign: 'center', fontSize: 25, fontWeight: '500' }}>Network Error</Text>
          <Text style={{ textAlign: 'center', fontSize: 15, fontWeight: '400' }}>Check your connection and try again</Text>
          <Button
            raised
            title="Try Again"
            onPress={onRefresh}
            buttonStyle={{
              backgroundColor: theme.sec700
            }}
            containerStyle={{
              marginTop: 'auto'
            }}
          />
        </View>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ themeReducer }) => ({
  theme: themeReducer.theme,
});

export default connect(mapStateToProps, { })(ErrorPage);
