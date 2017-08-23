import { combineReducers } from 'redux';
import _ from 'lodash';
import { NavigationActions } from 'react-navigation';
import { AppNavigator } from './AppNavigator';

const INIT_APP_STATE = {
	preloaders: [],
	has_init: false,
	show_drawer: false
}

const app = (state = INIT_APP_STATE, action) => {
	switch(action.type){
		case "SET_LOADING":
			let setLoading = state.preloaders.concat([action.key]);
			return _.assign({}, state, {
				preloaders: setLoading
			})
		case "DONE_LOADING":
			let doneLoading = state.preloaders.filter((type) => !(action.key === type))
			return _.assign({}, state, {
				preloaders: doneLoading
			})
		case "CLEAR_PRE_LOADER":
			return _.assign({}, state, {
				preloaders: []
			})
		case "HAS_INIT":
			return _.assign({}, state,{
				has_init: action.has_init
			})
		case "DRAWER":
			return _.assign({}, state,{
				show_drawer: action.show
			})
		default:
			return state;
	}
}

const INIT_NAV_STATE = AppNavigator.router.getStateForAction(
	AppNavigator.router.getActionForPathAndParams('Main')
);

const nav = (state = INIT_NAV_STATE, action) => {
  	let nextState;
	switch(action.type){
		case "NAVIGATE_TO":
			nextState = AppNavigator.router.getStateForAction(
				NavigationActions.navigate({ routeName: action.key }),
				state
			);
			break;
		default:
			nextState = AppNavigator.router.getStateForAction(action, state);
			break;
	}

	return nextState || state;
}

const appReducers = combineReducers({
	//module: require('./modules/module/reducer')
	app,
	nav,
	edtr: require('./modules/e-dtr/reducer'),
	expenses: require('./modules/expenses/reducer')
})

export default appReducers;