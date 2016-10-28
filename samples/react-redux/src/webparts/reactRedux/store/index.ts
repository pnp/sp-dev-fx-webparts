import { Store, createStore as reduxCreateStore, compose, applyMiddleware } from 'redux';
import createLogger = require('redux-logger');
import { rootReducer, IState } from '../reducers';

export { IState } from '../reducers'

export function createStore(initialState?: IState): Store<IState> {
  const loggerMiddleware = createLogger();

  const middlewares = [
    // add additional middleware like redux-thunk here
    loggerMiddleware
  ];

  return reduxCreateStore(rootReducer, initialState, compose(
    applyMiddleware(...middlewares)
  ));
}
