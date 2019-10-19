import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Item, Picker } from 'native-base';
import DatePicker from 'react-native-datepicker';
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Card, Button, Icon } from 'react-native-elements';

import CustomHeader from '../../components/Header';
import { toastError } from '../../redux/actions/notifications';
import { makeAReservation } from '../../redux/actions/cartActions';

const today = moment().format();

class ReservationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seats: '',
      smoking: false,
      datetime: '',
    };
  }

  static navigationOptions = {
    drawerLabel: 'Reserve Table',
    drawerIcon: () => (
      <Icon
        name='tags'
        type='antdesign'
        size={24}
        color='#777f7c'
      />
    )
  }

  renderRightHeaderIcon = (navigation) => {
    return <Icon
      name='home'
      size={24}
      color='#fff'
      underlayColor='transparent'
      onPress={() => navigation.navigate('Menu')}
    />;
  }

  handleSeatNumberChange = (value) => {
    this.setState({ seats: value });
  }

  handleSmokingChange = (value) => {
    this.setState({ smoking: value });
  }

  resetState = () => {
    this.setState({
      seats: '',
      smoking: false,
      datetime: '',
    });
  }

  handleReservation = () => {
    const { seats, datetime, smoking } = this.state;
    let errMsg = '';

    if (!seats.trim() || !Number.isInteger(Number(seats))) {
      errMsg += 'Please provide the number of expected guests';
    }
    if (!datetime) {
      errMsg += '\nPlease provide the booking schedule';
    }

    if (!errMsg) {
      this.props.makeAReservation({ seats: Number(seats), smoking, datetime }, this.resetState());
    } else {
      toastError(errMsg, 'bottom');
    }
  }

  render() {
    const { theme } = this.props;

    return (
      <Animatable.View animation="fadeInRightBig" duration={400} style={styles.container}>
        <CustomHeader
          title={'Reserve Table'}
          navigation={this.props.navigation}
          rightComponent={this.renderRightHeaderIcon}
        />
        <ScrollView>
          <Card>
            <View style={styles.containReserveForm}>
              <View style={styles.containInputLine}>
                <View style={[styles.inputLineChild, styles.labelText]}>
                  <Text>Number of Seats:</Text>
                </View>
                <View style={styles.inputLineChild}>
                  <TextInput
                    onChangeText={(seats) => this.setState({seats})}
                    value={this.state.seats}
                    maxLength = {3}
                    keyboardType='numeric'
                    underlineColorAndroid='#707070'
                  />
                </View>
              </View>
              <View style={styles.containInputLine}>
                <View style={[styles.inputLineChild, styles.labelText]}>
                  <Text>Smoking:</Text>
                </View>
                <View style={styles.inputLineChild}>
                  <Item picker>
                    <Picker
                      mode="dropdown"
                      iosIcon={<Icon name="arrow-down" />}
                      style={{ width: undefined }}
                      placeholder="Smoking"
                      placeholderStyle={{ color: '#bfc6ea' }}
                      placeholderIconColor="#007aff"
                      selectedValue={this.state.smoking}
                      onValueChange={this.handleSmokingChange}
                    >
                      <Picker.Item label="No" value={ false } />
                      <Picker.Item label="Yes" value={ true } />
                    </Picker>
                  </Item>
                </View>
              </View>
              <View style={[styles.containInputLine, {marginBottom: '30%'}]}>
                <View style={[styles.inputLineChild, styles.labelText]}>
                  <Text>Date and Time:</Text>
                </View>
                <View style={styles.inputLineChild}>
                  <DatePicker
                    style={{ flex: 2, marginRight: 20 }}
                    date={this.state.datetime}
                    format=''
                    mode="datetime"
                    placeholder="Date and Time"
                    minDate={today}
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                      dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0
                      },
                      dateInput: {
                        marginLeft: 36,
                        flex: 1,
                      }
                    }}
                    onDateChange={(datetime) => { this.setState({ datetime: datetime }); }}
                  />
                </View>
              </View>
              <View>
                <Button
                  raised
                  title="Reserve Table"
                  onPress={this.handleReservation}
                  buttonStyle={{
                    backgroundColor: theme.sec700
                  }}
                />
              </View>
            </View>
          </Card>
        </ScrollView>
      </Animatable.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#eaeaea',
  },
  containInputLine: {
    flexDirection: 'row',
    marginBottom: '3%',
  },
  inputLineChild: {
    flex: 1
  },
  spaceTop: { marginTop: 10 },
  labelText: {
    justifyContent: 'center',
  }
});

const mapStateToProps = ({ themeReducer }) => ({
  theme: themeReducer.theme,
});

export default connect(mapStateToProps, { makeAReservation })(ReservationScreen);