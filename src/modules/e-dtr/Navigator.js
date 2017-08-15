import React from 'react';
import { StackNavigator } from 'react-navigation';

import LoginContainer from './container/LoginContainer';
import MainContainer from './container/MainContainer';

const Navigator = StackNavigator({
	EDTR_LOGIN: {
		screen: LoginContainer,
		navigationOptions: ({ navigation }) => ({
			header: false
		})
	},
	EDTR_MAIN: {
		screen: MainContainer,
		navigationOptions: ({ navigation }) => ({
			header: false
		})
	}
})

export default Navigator;