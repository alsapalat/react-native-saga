//import moduleSaga from './modules/module/saga';
import genericSaga from './modules/generic/saga';
import edtrSaga from './modules/e-dtr/saga';
import expensesSaga from './modules/expenses/saga';

export default function* rootSaga(){
	yield [
		genericSaga(),
		edtrSaga(),
		expensesSaga()
		//moduleSaga()	
	]
}