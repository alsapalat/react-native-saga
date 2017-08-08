import React from 'react';
import { View, Image, Button } from 'react-native';
import { TabNavigator } from 'react-navigation';
import Tab1Container from './container/Tab1Container';
import Tab2Container from './container/Tab2Container';
import Tab3Container from './container/Tab3Container';

import styles from '../generic/asset/styles';

import { DrawerButton } from '../generic/component/Button';

import { MODULE_KEY, MODULE_NAME } from './constant';

const HomeNavigator = TabNavigator({
	[`${MODULE_KEY}_Tab1`]: { 
		screen: Tab1Container,
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
			tabBarLabel: 'Tab 1',
		    tabBarIcon: ({ tintColor }) => (
	      		<Image
					source={ require('../generic/asset/logo.png') }
					style={ [styles.drawerIcon, { tintColor: tintColor }] }
				/>
		    ),
		})
	},
	[`${MODULE_KEY}_Tab2`]: { 
		screen: Tab2Container,
		navigationOptions: ({navigation}) => ({
			title: `${MODULE_NAME}`,
			drawerLabel: MODULE_NAME,
			drawerIcon: ({ tintColor }) => (
				<Image
					source={ require('../generic/asset/logo.png') }
					style={ [styles.drawerIcon, { tintColor: tintColor }] }
				/>
			),
			tabBarLabel: 'Tab 2',
		    tabBarIcon: ({ tintColor }) => (
	      		<Image
					source={ require('../generic/asset/logo.png') }
					style={ [styles.drawerIcon, { tintColor: tintColor }] }
				/>
		    ),
		})
	},
	[`${MODULE_KEY}_Tab3`]: { 
		screen: Tab3Container,
		navigationOptions: ({navigation}) => ({
			title: `${MODULE_NAME}`,
			drawerLabel: MODULE_NAME,
			drawerIcon: ({ tintColor }) => (
				<Image
					source={ require('../generic/asset/logo.png') }
					style={ [styles.drawerIcon, { tintColor: tintColor }] }
				/>
			),
			tabBarLabel: 'Tab 3',
		    tabBarIcon: ({ tintColor }) => (
	      		<Image
					source={ require('../generic/asset/logo.png') }
					style={ [styles.drawerIcon, { tintColor: tintColor }] }
				/>
		    ),
		})
	}
});

export default HomeNavigator;