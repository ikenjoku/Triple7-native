import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Card, Badge, Icon, Button } from 'react-native-elements';

import { fetchHighlights } from '../../redux/actions/highlightActions';
import AnimatedLoader from '../../components/animatedLoader';
import CustomHeader from '../../components/Header';
import ErrorPage from '../../components/ErrorPage';
import AnimatedPlateIcon from '../../components/AnimatedPlateIcon';
class HighlightsScreen extends Component {

  static navigationOptions = {
    drawerLabel: 'Highlights',
    drawerIcon: () => (
      <Icon
        name='newspaper-o'
        type='font-awesome'
        size={24}
        color='#777f7c'
      />
    ),
    header: null,
  }

  // componentDidMount() {
  //   this.props.fetchHighlights();
  // }

  renderRightHeaderIcon = (navigation) => {
    return <Icon
      name='home'
      size={24}
      color='#fff'
      underlayColor='transparent'
      onPress={() => navigation.navigate('Menu')}
    />;
  }

  renderHighlight = (highlight) => {
    const { theme } = this.props;

    return (
      <Animatable.View key={highlight._id} animation="fadeInRightBig" duration={400}>
        <Card
          image={{ uri: highlight.imgurl }}
          imageStyle={{
            height: 200,
          }}
          containerStyle={{
            borderRadius: 5,
            marginBottom: '3%',
            marginTop: '3%'
          }}
          imageWrapperStyle={{
            width: '100%',
          }}
          PlaceholderContent={<ActivityIndicator />}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ marginBottom: 10, fontWeight: '700', fontFamily: 'sans-serif-medium' }}>
              {highlight.title}
            </Text>
            <Badge
              activeOpacity={0.9}
              value="+ Add to Cart"
              badgeStyle={{ backgroundColor: theme.sec700, padding: 5 }}
            />
          </View>
          <Text style={{ marginBottom: 10, fontFamily: 'sans-serif-condensed' }}>
            {highlight.details}
          </Text>
        </Card>
      </Animatable.View>
    );
  }

  renderNoHighlights = () => {
    const { theme } = this.props;
    const { navigate } = this.props.navigation;
    return (
      <Fragment>
        <View>
          <AnimatedPlateIcon />
        </View>
        <View style={{ paddingLeft: '3%', paddingRight: '3%', paddingBottom: '3%', marginTop: '6%' }}>
          <Text style={{ textAlign: 'center', fontSize: 25, fontWeight: '500' }}>No updates yet</Text>
          <Text style={{ textAlign: 'center', fontSize: 15, fontWeight: '400' }}>Check again for new highlights</Text>
        </View>
        <View style={{ marginTop: '6%', paddingRight: '5%', paddingLeft: '5%' }}>
          <Button
            raised
            title="See Today's Menu"
            onPress={() => navigate('MenuList')}
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

  renderPage = () => {
    const { error, highlights } = this.props;

    if (error) {
      return <ErrorPage onRefresh={this.props.fetchHighlights} />;
    }
    return (
      <ScrollView style={[{ flex: 1, paddingBottom: '30%' }, styles.container]}>
        {
          highlights.length ? highlights.map(this.renderHighlight) : this.renderNoHighlights()
        }
      </ScrollView>
    );
  }

  render() {
    const { navigation, isLoading } = this.props;
    return (
      <View style={styles.container}>
        <CustomHeader
          title={'Highlights'}
          navigation={navigation}
          rightComponent={this.renderRightHeaderIcon}
        />
        {isLoading ? <AnimatedLoader loading={isLoading} />
          : this.renderPage()}
      </View>
    );
  }
}

const mapStateToProps = ({ themeReducer, highlightReducer }) => ({
  highlights: highlightReducer.highlights,
  isLoading: highlightReducer.isLoading,
  error: highlightReducer.error,
  theme: themeReducer.theme,
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#eaeaea',
  }
});

export default connect(mapStateToProps, { fetchHighlights })(HighlightsScreen);
