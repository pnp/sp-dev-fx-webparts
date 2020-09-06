import { IWebPartContext } from "@microsoft/sp-webpart-base";
import * as lodash from "@microsoft/sp-lodash-subset";
import IDataProvider from "../components/dataproviders/IDataProvider";
import List from "../components/models/List";

export default class MockDataProvider implements IDataProvider {

    // private fields
    private _lists: List[];
    private _selectedList: List;
    private _webPartContext: IWebPartContext;

    constructor() {
        this._lists = [
            this._createMockTaskList("1", "Basic List"),
            this._createMockTaskList("2", "Announcements List"),
            this._createMockTaskList("3", "News List"),
            this._createMockTaskList("4", "Directory List"),
        ];
    }

    // getters and Setters
    public set webPartContext(value: IWebPartContext) {
        this._webPartContext = value;
    }

    public get webPartContext(): IWebPartContext {
        return this._webPartContext;
    }

    public set selectedList(value: List) {
        this._selectedList = value;
    }

    public get selectedList(): List {
        return this._selectedList;
    }

    public getLists(): Promise<List[]> {
        const taskLists: List[] = this._lists;
        return new Promise<List[]>((resolve) => {
            setTimeout(() => resolve(taskLists), 500);
        });
    }

    private _createMockTaskList(id: string, title: string): List {
        const mockTaskList: List = {
            Id: id,
            Title: title
        };
        return mockTaskList;
    }
}