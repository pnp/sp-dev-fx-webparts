import { RootStore } from "./RootStore";
import { observable, action, computed } from "mobx";

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

    @observable public isLoading: boolean;
    @observable public status: ApplicationStatus;
    @observable public listTitle: string;
    @observable public items: IFakeItem[];

    constructor(private rootStore: RootStore) {
        this.setInitialState();
    }

    @action
    private setInitialState() {
        this.status = ApplicationStatus.CreateList;
        this.listTitle = null;
        this.items = [];
        this.isLoading = true;
    }

    @computed
    public get appStatus(): string {
        return `The current status is: ${this.status}`;
    }

    @action
    public confirmListCreation(listTitle: string) {
        this.status = ApplicationStatus.CreateItems;
        this.listTitle = listTitle;
    }

    @action
    public addListItem(item: IFakeItem) {
        this.items.push(item);
    }

    @action
    public confirmItems() {
        this.status = ApplicationStatus.Completed;
    }
}