import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './src/Store';
import AppNavigator from './src/AppNavigator';

var store = configureStore();

export default class App extends React.Component {
  render() {
    return (
      <Provider store={ store }>
        <AppNavigator />
      </Provider>
    );
  }
}
