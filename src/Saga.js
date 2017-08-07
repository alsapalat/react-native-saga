//import moduleSaga from './modules/module/saga';
import genericSaga from './modules/generic/saga';

export default function* rootSaga(){
	yield [
		genericSaga()
		//moduleSaga()	
	]
}