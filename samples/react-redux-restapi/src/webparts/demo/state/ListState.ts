import * as Immutable from 'immutable';

export interface IListState {
	title: string;
	lists: string[];
	message: string;
}

export const initialState: IListState = {
	title: "Lists in the current site",
	message: "",
	lists: []
};

export class ListState implements IListState {

	//Getters
	public title: string;
	public lists: string[];
	public message: string;

	//Setters
	// public setTitle(newTitle: string): ListState {
	// 	return this.set("title", newTitle) as ListState;
	// }

	// public addList(item: string): ListState {
	// 	return this.update("lists", (list: string[]) => {
	// 		return list.concat(item);
	// 	}) as ListState;
	// }

	// public setMessage(text: string): ListState {
	// 	return this.set("message", text) as ListState;
	// }
}