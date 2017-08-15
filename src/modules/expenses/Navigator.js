import React from 'react';
import { View, Image, Button } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import SummaryContainer from './container/SummaryContainer';
import HistoryContainer from './container/HistoryContainer';

import styles from '../generic/asset/styles';

import { DrawerButton } from '../generic/component/Button';

import { MODULE_KEY, MODULE_NAME } from './constant';

const HomeNavigator = TabNavigator({
	[`${MODULE_KEY}_SUMMARY`]: { 
		screen: SummaryContainer,
		navigationOptions: ({navigation}) => ({
			title: `${MODULE_NAME}`,
			drawerLabel: MODULE_NAME,
    		headerLeft: <DrawerButton navigation={ navigation }/>,
			drawerIcon: ({ tintColor }) => (
				<Image
					source={ require('../generic/asset/logo.png') }
					style={ [styles.drawerIcon, { tintColor: tintColor }] }
				/>
			),
			tabBarLabel: 'SUMMARY',
		    tabBarIcon: ({ tintColor }) => (
	      		<Image
					source={ require('../generic/asset/logo.png') }
					style={ [styles.drawerIcon, { tintColor: tintColor }] }
				/>
		    ),
		})
	},
	[`${MODULE_KEY}_Tab2`]: { 
		screen: HistoryContainer,
		navigationOptions: ({navigation}) => ({
			title: `${MODULE_NAME}`,
			drawerLabel: MODULE_NAME,
    		headerLeft: <DrawerButton navigation={ navigation }/>,
			drawerIcon: ({ tintColor }) => (
				<Image
					source={ require('../generic/asset/logo.png') }
					style={ [styles.drawerIcon, { tintColor: tintColor }] }
				/>
			),
			tabBarLabel: 'HISTORY',
		    tabBarIcon: ({ tintColor }) => (
	      		<Image
					source={ require('../generic/asset/logo.png') }
					style={ [styles.drawerIcon, { tintColor: tintColor }] }
				/>
		    ),
		})
	}
});

const MainNavigator = StackNavigator({
	[`${MODULE_KEY}`]: {
		screen: HomeNavigator
	}
})

export default MainNavigator;