import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView, StyleSheet, TouchableNativeFeedback, TouchableOpacity } from 'react-native';
import { DrawerItems, SafeAreaView } from 'react-navigation';
import { Avatar, Divider, Icon, Overlay } from 'react-native-elements';
import ColorPalette from '../components/ColorPalette.js';
import { logoutAUser } from '../redux/actions/authActions';

class CustomDrawerContentComponent extends Component {
  state = {
    devModalVisible: false,
    confirmLogoutModal: false,
  }

  toggleDevModal = () => {
    const { navigation } = this.props;
    const { devModalVisible } = this.state;
    navigation.closeDrawer();
    this.setState({ devModalVisible: !devModalVisible });
  }

  toggleLogoutModal = () => {
    const { navigation } = this.props;
    const { confirmLogoutModal } = this.state;
    navigation.closeDrawer();
    this.setState({ confirmLogoutModal: !confirmLogoutModal });
  }

  renderDeveleperModal = () => {
    const { devModalVisible } = this.state;
    return (
      <Overlay
        isVisible={devModalVisible}
        windowBackgroundColor='rgba(0, 0, 0, .25)'
      >
        <View style={{
          display: 'flex',
          flexDirection: 'column',
        }}>
          <Text
            style={{
              textAlign: 'center',
              fontFamily: 'sans-serif-condensed'
            }}>
            Developed with by Ike Njoku
          </Text>
          <Text>Leave a feedback, Get in touch iconemail</Text>
          <Text>Or just say Hi whatappicon</Text>
          <View>
            <TouchableOpacity onPress={this.toggleDevModal}>
              <Text>CLOSE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Overlay>
    );
  }

  renderLogoutConfirmationModal = () => {
    const { logoutAUser } = this.props;
    const { confirmLogoutModal } = this.state;
    return (
      <Overlay
        isVisible={confirmLogoutModal}
        windowBackgroundColor='rgba(0, 0, 0, .25)'
      >
        <View style={{
          display: 'flex',
          flexDirection: 'column',
        }}>
          <Text
            style={{
              textAlign: 'center',
              fontFamily: 'sans-serif-condensed'
            }}>
            Are you sure you want to logout ?
          </Text>
          <View>
            <TouchableOpacity onPress={this.toggleLogoutModal}>
              <Text>CLOSE</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={logoutAUser}>
              <Text>Yes, LOGOUT</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Overlay>
    );
  }

  render() {
    const { theme, user } = this.props;
    const ripple = TouchableNativeFeedback.Ripple('#adacac', true);

    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <SafeAreaView
            style={styles.container}
            forceInset={{ top: 'always', horizontal: 'never' }}
          >
            <View style={[ styles.containHeader, { backgroundColor: theme.pri700 }]}>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Avatar size='large' rounded icon={{ name: 'user-circle-o', type: 'font-awesome', size: 80 }} />
                <Text style={{ color: '#f9f9f9', marginTop: '3%', fontFamily: 'sans-serif-condensed' }}>{`Hi ${user.firstname}`}</Text>
                <Text style={{ color: '#f9f9f9', fontFamily: 'sans-serif-condensed' }}>{`${user.email}`}</Text>
              </View>
            </View>
            { this.renderDeveleperModal() }
            { this.renderLogoutConfirmationModal() }

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
            </View>
          </SafeAreaView>
        </ScrollView>
        <View>
          <TouchableNativeFeedback onPress={this.toggleLogoutModal} background={ripple}>
            <View style={styles.containDrawerOption}>
              <Icon
                name='logout'
                type='simple-line-icon'
                size={20}
                color={theme.pri700}
                containerStyle={{ marginRight: '10%' }}
              />
              <Text style={{ color: 'black', fontFamily: 'sans-serif-medium' }}>Log Out</Text>
            </View>
          </TouchableNativeFeedback>

          <TouchableNativeFeedback onPress={this.toggleDevModal} background={ripple}>
            <View style={styles.containDrawerOption}>
              <Icon
                name='user-secret'
                type='font-awesome'
                size={24}
                color={theme.pri700}
                containerStyle={{ marginRight: '10%' }}
              />
              <Text style={{ color: 'black', fontFamily: 'sans-serif-medium' }}>Developer</Text>
            </View>
          </TouchableNativeFeedback>

        </View>
      </View>
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
    paddingBottom: '3%',
    backgroundColor: '#e6e6e6',
    marginBottom: 5,
  }
});

const mapStateToProps = ({ themeReducer, authReducer }) => ({
  theme: themeReducer.theme,
  user: authReducer.user,
});

export default connect(mapStateToProps, { logoutAUser })(CustomDrawerContentComponent);
