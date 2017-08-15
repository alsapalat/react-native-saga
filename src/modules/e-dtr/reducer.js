import * as c from './constant';
import _ from 'lodash';

module.exports = (state = c.INIT_STATE, action) => {
	switch(action.type){
		case c.AUTH:
			return _.assign({}, state, {
				...action.data
			})
		case c.RECORDS:
			return _.assign({}, state, {
				records: action.data
			})
		default: 
			return state;
	}
}