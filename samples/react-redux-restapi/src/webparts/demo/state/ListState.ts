import * as Immutable from 'immutable';

export interface IListState {
	title: string;
	lists: string[];
	message: string;
	setTitle: (newTitle: string) => void;
	setMessage: (item: string) => void;
	addList:(text: string) => void;
}

export const initialState: IListState = {
	title: "Lists in the current site",
	message: "",
	lists: [],
	setTitle: (newTitle: string) => {},
	setMessage: (item: string) => {},
	addList:(text: string) => {},

};

export class ListState extends Immutable.Record(initialState) implements IListState {

	//Getters
	public title: string;
	public lists: string[];
	public message: string;

	//Setters
	public setTitle(newTitle: string): ListState {
		return this.set("title", newTitle) as ListState;
	}

	public addList(item: string): ListState {
		return this.update("lists", (list: string[]) => {
			return list.concat(item);
		}) as ListState;
	}

	public setMessage(text: string): ListState {
		return this.set("message", text) as ListState;
	}
}