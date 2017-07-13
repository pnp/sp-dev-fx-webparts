export enum ActionTypes {
	ADD_LIST_REQUEST,// = "ADD_LIST_REQUEST" //String enums in TypeScript 2.4+
	ADD_LIST_SUCCESS,
	ADD_LIST_ERROR,
	GET_LISTS_REQUEST,
	GET_LISTS_SUCCESS,
	GET_LISTS_ERROR,
	UPDATE_TITLE,
}

export type Action =
	{ type: ActionTypes.ADD_LIST_REQUEST } |
	{ type: ActionTypes.ADD_LIST_SUCCESS, payload: string } |
	{ type: ActionTypes.ADD_LIST_ERROR, payload: string } |
	{ type: ActionTypes.GET_LISTS_REQUEST } |
	{ type: ActionTypes.GET_LISTS_SUCCESS, payload: string[] } |
	{ type: ActionTypes.GET_LISTS_ERROR, payload: string } |
	{ type: ActionTypes.UPDATE_TITLE, payload: string };
