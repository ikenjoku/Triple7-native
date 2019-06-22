import React, { Component, Fragment } from 'react';
import { View, Text, StyleSheet, Button, StatusBar, Image } from 'react-native';
import Carousel from 'react-native-looped-carousel';
import NavigationService from "../navigation/NavigationService";
import { storeData } from "../utils/asyncStore";

const images = [
  require('../assets/gradonboad.png'),
  require('../assets/gradsplash.png'),
  require('../assets/newsplash.png'),
  require('../assets/brownsplash.png')
];

const tradeLogo = require('../assets/brownlogo.png');

class OnboardingScreen extends Component {
  constructor() {
    super();
    this.state = {
      isEnd: false
    };
  }

  static navigationOptions = {
  }

  handleNextPage = page => {
    const isEnd = page === images.length - 1;
    this.setState({ isEnd });
  };

  handleFinish = async () => {
    await storeData('@triple-tutorial-cookie', 'true');
    NavigationService.navigate('Main');
  };

  renderImages = images =>
    images.map((image, key) => (
      <Image
        key={key}
        style={styles.imageContainer}
        resizeMode="cover"
        source={image}
      />
    ));

  render() {
    const { isEnd } = this.state;

    return (
      <View style={styles.container}>
          <StatusBar hidden={true} />
          <View style={styles.skipLine}>
            <Image
              style={styles.leftLogo}
              resizeMode="contain"
              source={tradeLogo}
            />
            <Text style={styles.skipText} onPress={this.handleFinish}>
              {isEnd ? 'Got it!' : 'Skip'}
            </Text>
          </View>
          <Carousel
            style={styles.tutorial}
            autoplay={true}
            isLooped={false}
            bullets={true}
            bulletStyle={{ color: 'grey' }}
            onAnimateNextPage={page => this.handleNextPage(page)}
          >
            {this.renderImages(images)}
          </Carousel>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  skipLine: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20,
    marginLeft: 20,
    marginRight: 20,
    maxHeight: 50,
    backgroundColor: 'transparent',
    zIndex: 99
  },
  skipText: {
    width: 80,
    height: 60,
    fontSize: 20,
    fontWeight:'bold',
    color: 'grey',
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  leftLogo: {
    width: 80,
    height: 60
  },
  tutorial: {
    marginTop: -50,
    flex: 1
  },
  imageContainer: {
    height: '100%',
    flex: 1
  }
});

export default OnboardingScreen;