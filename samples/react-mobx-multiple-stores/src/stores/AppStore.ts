import { RootStore } from "./rootStore";
import { observable, action } from "mobx";

export enum ApplicationStatus {
    CreateList = "Create List",
    CreateItems = "Create Items",
    Completed = "Completed"
}

export interface IFakeItem {
    title: string;
    important: boolean;
}

export class AppStore {

    @observable public status: ApplicationStatus = ApplicationStatus.CreateList;
    @observable public listTitle: string = null;
    @observable public items: IFakeItem[] = [];

    constructor(private rootStore: RootStore) {
    }

    @action confirmListCreation(listTitle: string) {
        this.status = ApplicationStatus.CreateItems;
        this.listTitle = listTitle;
    }

    @action addListItem(item: IFakeItem) {
        this.items.push(item);
    }

    @action confirmItems() {
        this.status = ApplicationStatus.Completed;
    }

}