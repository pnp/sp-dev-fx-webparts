import {
  createStore,
  applyMiddleware,
  compose,
  Middleware
} from "redux";
import { fromJS } from "immutable";
import { createMemoryHistory } from "react-router";
import { routerMiddleware } from "react-router-redux";
import thunk from "redux-thunk";

import promiseMiddleware from "redux-promise-middleware";
import logger from "./logger";
import { RootReducer } from "../reducers/rootReducer";
const __DEV__: boolean = true; // from webpack
function configureStore(initialState) {
  const store = createStore(
    RootReducer,
    initialState,
    compose(
      applyMiddleware(..._getMiddleware()),
      /////      persistState("session", _getStorageConfig()),
      __DEV__ && environment.devToolsExtension ?
        environment.devToolsExtension() :
        f => f));
  // _enableHotLoader(store);
  return store;
}

function _getMiddleware(): Middleware[] {
  const history = createMemoryHistory();
  let middleware = [
    routerMiddleware(history),
    promiseMiddleware(),
    thunk,
  ];
  if (__DEV__) {
    middleware = [...middleware, logger];
  }
  return middleware;
}
const environment: any = window || this;

// function _enableHotLoader(store) {
//   if (!__DEV__) {
//     return;
//   }

//   const { hot } = module as any;
//   if (hot) {
//     hot.accept("../reducers", () => {
//       const nextRootReducer = require("../reducers");
//       store.replaceReducer(nextRootReducer);
//     });
//   }
// }

function _getStorageConfig() {
  return {
    key: "typescript-react-redux-seed",
    serialize: (store) => {
      return store && store.session ?
        JSON.stringify(store.session.toJS()) : store;
    },
    deserialize: (state) => ({
      session: state ? fromJS(JSON.parse(state)) : fromJS({}),
    }),
  };
}

export default configureStore;
