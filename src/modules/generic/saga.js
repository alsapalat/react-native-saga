import { delay } from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import { preloader, navigateTo } from '../../Utils';

function* splash(){
	yield put(preloader('SPLASH'));

	//yield delay(1500);

	yield put(preloader(null));

	yield put({ type: "HAS_INIT", has_init: true });

	yield delay(50);

	yield put({ type: "NAVIGATE_TO", key: "EDTR" });
}

export default function* genericSaga(){
	yield [
		takeEvery("SPLASH", splash)
	]
}