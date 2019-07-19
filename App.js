import React, {Component} from 'react';
import { Provider } from 'react-redux';
import store from './src/redux/configureStore';
import RootApp from './src/navigation/AppNavigator';

export default class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <RootApp />
      </Provider>
    );
  }
}
