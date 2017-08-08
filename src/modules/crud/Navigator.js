import React from 'react';
import { View, Image, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';
import ListContainer from './container/ListContainer';
import ViewContainer from './container/ViewContainer';
import AddContainer from './container/AddContainer';

import styles from '../generic/asset/styles';

import { DrawerButton } from '../generic/component/Button';

import { MODULE_KEY, MODULE_NAME } from './constant';

const HomeNavigator = StackNavigator({
	[`${MODULE_KEY}_List`]: { 
		screen: ListContainer,
		navigationOptions: ({navigation}) => ({
			title: `${MODULE_NAME}`,
			drawerLabel: MODULE_NAME,
    		headerLeft: <DrawerButton navigation={ navigation }/>,
			drawerIcon: ({ tintColor }) => (
				<Image
					source={ require('../generic/asset/logo.png') }
					style={ [styles.drawerIcon, { tintColor: tintColor }] }
				/>
			)
		})
	},
	[`${MODULE_KEY}_View`]: { 
		screen: ViewContainer,
		navigationOptions: ({navigation}) => ({
			title: `${navigation.state.params.key}`,
			drawerLabel: MODULE_NAME,
			drawerIcon: ({ tintColor }) => (
				<Image
					source={ require('../generic/asset/logo.png') }
					style={ [styles.drawerIcon, { tintColor: tintColor }] }
				/>
			)
		})
	},
	[`${MODULE_KEY}_Add`]: { 
		screen: AddContainer,
		navigationOptions: ({navigation}) => ({
			title: `ADD ${MODULE_NAME}`,
			drawerLabel: MODULE_NAME,
			drawerIcon: ({ tintColor }) => (
				<Image
					source={ require('../generic/asset/logo.png') }
					style={ [styles.drawerIcon, { tintColor: tintColor }] }
				/>
			)
		})
	}
});

export default HomeNavigator;