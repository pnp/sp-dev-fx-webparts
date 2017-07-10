import { Action, ActionTypes } from '../actions/actionTypes';
import { ListState, initialState } from '../state/ListState';
import { Reducer } from 'redux';

const listsReducer: Reducer<ListState> = (state: ListState = initialState, action: Action): ListState => {
	switch (action.type) {
		case ActionTypes.ADD_LIST_REQUEST:
			return {...state, message:"Loading..." };
		case ActionTypes.ADD_LIST_SUCCESS:
			return {...state, lists: state.lists.concat(action.payload) };
		case ActionTypes.ADD_LIST_ERROR:
			return {...state, message:action.payload };
		case ActionTypes.UPDATE_TITLE:
			return {...state, title:action.payload };
		default: return state;
	}
};

export default listsReducer;