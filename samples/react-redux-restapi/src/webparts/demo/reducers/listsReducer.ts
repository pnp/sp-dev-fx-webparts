import { Action, ActionTypes } from '../actions/actionTypes';
import { ListState, initialState } from '../state/ListState';
import { Reducer } from 'redux';

const initState = new ListState();

const listsReducer: Reducer<ListState> = (state: ListState = initState, action: Action): ListState => {
	switch (action.type) {
		case ActionTypes.ADD_LIST_REQUEST:
			return state.setMessage("Loading...");
		case ActionTypes.ADD_LIST_SUCCESS:
			return state.addList(action.payload);
		case ActionTypes.ADD_LIST_ERROR:
			return state.setMessage(action.payload);
		case ActionTypes.GET_LISTS_REQUEST:
			return state.setMessage("Loading...");
		case ActionTypes.GET_LISTS_SUCCESS:
			return state.setMessage('').setLists(action.payload);
		case ActionTypes.GET_LISTS_ERROR:
			return state.setMessage(action.payload);
		case ActionTypes.UPDATE_TITLE:
			return state.setTitle(action.payload);
		default: return state;
	}
};

export default listsReducer;