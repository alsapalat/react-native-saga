//import moduleSaga from './modules/module/saga';
import genericSaga from './modules/generic/saga';
import edtrSaga from './modules/e-dtr/saga';

export default function* rootSaga(){
	yield [
		genericSaga(),
		edtrSaga()
		//moduleSaga()	
	]
}