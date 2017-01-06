import { Iterable } from 'immutable';

/**
 * [immutableToJS
 *    converts properties of the provided [state] object from immutable
 *    data structures to regular JavaScript data structures - used with
 *    redux-logger
 *
 * @param  {object} state [state reference]
 * @return {object}       [transformed state]
 */
export default function immutableToJS(state) {
  return Object.keys(state).reduce((newState, key) => {
    const val = state[key];
    newState[key] = Iterable.isIterable(val) ? val.toJS() : val;
    return newState;
  }, {});
}
