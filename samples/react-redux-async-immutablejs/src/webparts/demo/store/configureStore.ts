import { createStore, applyMiddleware, Store } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import listsReducer from '../reducers/listsReducer';
import { ListState } from '../state/ListState';

const loggerMiddleware = createLogger();

export default function configureStore() {

	//do not use loggerMiddleware in production
	const listSateStore: Store<ListState> = createStore<ListState>(listsReducer, applyMiddleware(thunkMiddleware, loggerMiddleware));
	
	return listSateStore;
}
