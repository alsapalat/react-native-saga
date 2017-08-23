import * as c from './constant';
import _ from 'lodash';

module.exports = (state = c.INIT_STATE, action) => {
	switch(action.type){
		case c.LIST:
			return _.assign({}, state, {
				list: action.data
			})
		case c.SELECT:
			return _.assign({}, state, {
				selected: action.data
			})
		case c.INCLUDE:
			return _.assign({}, state, {
				selected: _.assign({}, state.selected, {
					...action.data
				})
			})
		case c.EXCLUDE:
			return _.assign({}, state, {
				selected: _.omit(state.selected, action.data)
			})
		default: 
			return state;
	}
}