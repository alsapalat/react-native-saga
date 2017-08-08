import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, DrawerNavigator } from 'react-navigation';
import { View } from 'react-native';

import AppDrawer from './AppDrawer';
import SplashContainer from './modules/generic/container/SplashContainer';

import CrudNavigator from './modules/crud/Navigator';
import TabNavigator from './modules/tabbed-crud/Navigator';

export const AppNavigator = DrawerNavigator({
	Main: { screen: CrudNavigator },
	Tab: { screen: TabNavigator }
},{
	contentComponent: props => <AppDrawer { ...props }/>
})

const AppNavigatorState = ({ dispatch, nav, app }) => {

	if(!app.has_init)
		return(
			<SplashContainer />
		)
	return(
		<AppNavigator navigation={ addNavigationHelpers({ dispatch, state: nav }) }/>
	)
}

AppNavigatorState.propTypes = {
	dispatch: PropTypes.func.isRequired,
	nav: PropTypes.object.isRequired
}

const mapStateToProps = ({ nav, app }) => ({
	nav,
	app
})

export default connect(mapStateToProps)(AppNavigatorState);