import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, Image } from 'react-native';
import Carousel from 'react-native-looped-carousel';
import NavigationService from '../navigation/NavigationService';
import { storeData } from '../utils/asyncStore';

const images = [
  require('../assets/tuts21.png'),
  require('../assets/tuts22.png'),
  require('../assets/tuts23.png'),
  require('../assets/tuts24.png')
];

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
    NavigationService.navigate('Auth');
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
        <View style={styles.containOnboardText}>
          <Text style={styles.onboardText} onPress={this.handleFinish}>{isEnd ? 'Let\'s Go' : 'Skip'}</Text>
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tutorial: {
    marginTop: -50,
    flex: 1
  },
  imageContainer: {
    height: '100%',
    flex: 1
  },
  containOnboardText: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    maxHeight: 50,
    backgroundColor: 'transparent',
    zIndex: 1
  },
  onboardText: {
    paddingTop: '6%',
    paddingRight: '6%',
    paddingLeft: '3%',
    fontSize: 20,
    color: '#ffffff',
    fontWeight:'900'
  }
});

export default OnboardingScreen;