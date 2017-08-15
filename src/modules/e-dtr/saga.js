import { delay } from 'redux-saga';
import { takeEvery, put, select, call } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';
import { preloader, navigateTo, services, apiError } from '../../Utils';
import * as c from './constant';
import _ from 'lodash';

function* checkAuth(){
	yield put(preloader('EDTR_CHECK_AUTH'));

	const { edtr } = yield select();
	
	const token = yield AsyncStorage.getItem('@EDTR:token');
	const profile = yield AsyncStorage.getItem('@EDTR:profile');

	yield put(preloader(null));

	const data = {
		token: token,
		profile: JSON.parse(profile) || {},
		isAuthenticated: (token)
	}

	yield put({ 
		type: c.AUTH,
		data
	})

	if(edtr.isAuthenticated === (token)) return;

	if(token){
		yield put(navigateTo("EDTR_MAIN"));
		return;
	}
	yield put(navigateTo("EDTR_LOGIN"));
}

function* login({ args }){
	yield put(preloader('EDTR_LOGIN'));

	const url = `auth`;

	const response = yield call(services.post(url), args)
	
	yield put(preloader(null));

	if(apiError(response.data)) return;

	const { data } = response.data;

	const token = data.token;
	const profile = _.assign({} ,_.pick(data.profile, [
		"first_name",
		"middle_name",
		"last_name",
		"photo",
		"github_username",
	]), {
		name: `${data.profile.first_name} ${data.profile.last_name}`
	})

	yield AsyncStorage.setItem('@EDTR:token', token);
	yield AsyncStorage.setItem('@EDTR:profile', JSON.stringify(profile));

	yield put({ type: "EDTR_CHECK_AUTH" });
}

function* logout(){
	yield put(preloader('EDTR_LOGOUT'));
	yield AsyncStorage.removeItem('@EDTR:token');
	yield AsyncStorage.removeItem('@EDTR:profile');
	yield put(preloader(null));

	yield put({ type: "EDTR_CHECK_AUTH" });
}

function* getRecords({ args }){
	yield put(preloader('EDTR_GET_RECORDS'));

	const url = `ste/time_log?filter=${args.filter}`;

	const response = yield call(services.get(url), args)

	yield put(preloader(null));	

	if(apiError(response.data)) return;

	const { data } = response.data;

	yield put({
		type: c.RECORDS,
		data
	})
}

export default function* edtrSaga(){
	yield [
		takeEvery("EDTR_CHECK_AUTH", checkAuth),
		takeEvery("EDTR_LOGIN", login),
		takeEvery("EDTR_LOGOUT", logout),
		takeEvery("EDTR_GET_RECORDS", getRecords)
	]
}