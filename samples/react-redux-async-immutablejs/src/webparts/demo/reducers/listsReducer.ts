import { Action, ActionTypes } from '../actions/actionTypes';
import { ListState } from '../state/ListState';
import { Reducer } from 'redux';

const initState = new ListState();

//Reducer determines how the state should change after every action.
const listsReducer: Reducer<ListState> = (state: ListState = initState, action: Action): ListState => {
	switch (action.type) {
		case ActionTypes.ADD_LIST_REQUEST:
			return state; //You can show a loading message here.
		case ActionTypes.ADD_LIST_SUCCESS:
			return state.addList(action.payload);
		case ActionTypes.ADD_LIST_ERROR:
			return state;
		case ActionTypes.GET_LISTS_REQUEST:
			return state;
		case ActionTypes.GET_LISTS_SUCCESS:
			return state.setLists(action.payload);
		case ActionTypes.GET_LISTS_ERROR:
			return state; //.setMessage(action.payload); //You can show an error message here
		case ActionTypes.UPDATE_TITLE:
			return state.setTitle(action.payload);
		default: return state;
	}
};

export default listsReducer;