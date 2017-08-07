import React from 'react';
import { View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import ListContainer from './container/ListContainer';
import ViewContainer from './container/ViewContainer';
import AddContainer from './container/AddContainer';

const HomeNavigator = StackNavigator({
	List: { screen: ListContainer },
	View: { screen :ViewContainer },
	Add: { screen: AddContainer }
});

export default HomeNavigator;