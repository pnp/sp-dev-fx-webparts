export enum ActionTypes {
	ADD_LIST_REQUEST,
	ADD_LIST_SUCCESS,
	ADD_LIST_ERROR,
	UPDATE_TITLE,
}

export type Action =
	{ type: ActionTypes.ADD_LIST_REQUEST } |
	{ type: ActionTypes.ADD_LIST_SUCCESS, payload: string } |
	{ type: ActionTypes.ADD_LIST_ERROR, payload: string } |
	{ type: ActionTypes.UPDATE_TITLE, payload: string };
