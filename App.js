import React from 'react';
import { Provider } from 'react-redux';
import { StatusBar } from 'react-native';
import configureStore from './src/Store';
import AppNavigator from './src/AppNavigator';

var store = configureStore();

export default class App extends React.Component {

	componentDidMount(){
		StatusBar.setHidden(true);
	}

	render() {
		return (
			<Provider store={ store }>
				<AppNavigator />
			</Provider>
		);
	}
}
