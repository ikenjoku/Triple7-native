import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import DatePicker from 'react-native-datepicker';
import { Card, Button, Icon } from 'react-native-elements';
import { Item, Picker } from 'native-base';
import CustomHeader from '../../components/Header';

const dateInstance = new Date();
const minDate = `${dateInstance.getFullYear()}-${dateInstance.getMonth() < 10 ? 0 : '' }${dateInstance.getMonth() + 1}-${dateInstance.getDate() < 10 ? 0 : '' }${dateInstance.getDate()}`;
class ReservationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      guests: '',
      smoking: false,
      date: '',
      showModal: false,
    };
  }
  static navigationOptions = () => {
    // const { theme } = this.props;
    return ({
      drawerLabel: 'Reserve Table',
      drawerIcon: () => (
        <Icon
          name='tags'
          type='antdesign'
          size={24}
          color='#777f7c'
        />
      ),
    });
  }

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  handleSeatNumberChange = (value) => {
    this.setState({ guests: value });
  }

  handleSmokingChange = (value) => {
    this.setState({ smoking: value });
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

  render() {
    const { navigation, theme } = this.props;

    return (
      <View style={styles.container}>
        <Animatable.View animation="fadeInRightBig" duration={400}>
          <CustomHeader
            title={'Reserve Table'}
            navigation={this.props.navigation}
            rightComponent={this.renderRightHeaderIcon}
          />
          <Card>
            <View style={styles.containReserveForm}>
              <View style={styles.containInputLine}>
                <View style={[styles.inputLineChild, styles.labelText]}>
                  <Text>Number of Seats:</Text>
                </View>
                <View style={styles.inputLineChild}>
                  <Item picker>
                    <Picker
                      mode="dropdown"
                      iosIcon={<Icon name="arrow-down" />}
                      style={{ width: undefined }}
                      placeholder="Number of Seats"
                      placeholderStyle={{ color: '#bfc6ea' }}
                      placeholderIconColor="#007aff"
                      selectedValue={this.state.guests}
                      onValueChange={this.handleSeatNumberChange}
                    >
                      <Picker.Item label="1 Person" value={1} />
                      <Picker.Item label="2 Persons" value={2} />
                      <Picker.Item label="3 Persons" value={3} />
                      <Picker.Item label="4 Persons" value={4} />
                      <Picker.Item label="5 Persons" value={5} />
                      <Picker.Item label="6 Persons" value={6} />
                      <Picker.Item label="7 Persons" value={7} />
                      <Picker.Item label="8 Persons" value={8} />
                      <Picker.Item label="9 Persons" value={9} />
                      <Picker.Item label="10 Persons" value={10} />
                    </Picker>
                  </Item>
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
                      <Picker.Item label="Yes" value={true} />
                      <Picker.Item label="No" value={false} />
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
                    date={this.state.date}
                    format=''
                    mode="datetime"
                    placeholder="Date and Time"
                    minDate={minDate}
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
                    onDateChange={(date) => { this.setState({ date: date }); }}
                  />
                </View>
              </View>
              <View>
                <Button
                  raised
                  title="Reserve Table"
                  onPress={() => navigation.navigate('MenuList')}
                  buttonStyle={{
                    backgroundColor: theme.sec700
                  }}
                />
              </View>
            </View>
          </Card>
        </Animatable.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#eaeaea',
  },
  containReserveForm: {

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

export default connect(mapStateToProps, { })(ReservationScreen);