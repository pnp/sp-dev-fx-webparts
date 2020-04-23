import { action, computed, observable, runInAction } from "mobx";
import { RootStore } from "./RootStore";

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

    @observable public isLoadingConfiguration: boolean;
    @observable public isLoadingOtherStuff: boolean;
    @observable public status: ApplicationStatus;
    @observable public listTitle: string;
    @observable public items: IFakeItem[];

    constructor(private rootStore: RootStore) {
        this.setInitialState();
    }

    @action
    private setInitialState(): void {
        this.status = ApplicationStatus.CreateList;
        this.listTitle = null;
        this.items = [];
        this.isLoadingConfiguration = true;
        this.isLoadingOtherStuff = false;
    }

    @computed
    public get appStatus(): string {
        let result: string = `The current status is '${this.status}'. `;
        result += this.status === ApplicationStatus.CreateItems || this.items.length > 0 ? `List '${this.listTitle}' successfully created. ` : "";
        result += this.status === ApplicationStatus.Completed ? `In total there were ${this.items.length} items added. ` : "";
        return result + `${this.rootStore.configStore.allowImportantItems ? "" : "Adding important items is currently not allowed."}`;
    }

    @computed
    public get importantItems(): IFakeItem[] {
        return this.items.filter(x => x.important);
    }

    @computed
    public get isInitializing(): boolean {
        return this.isLoadingConfiguration || this.isLoadingOtherStuff;
    }

    @action
    public async createList(listTitle: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            // Mock creating list
            setTimeout(() => {
                // Make sure we change our state in an action. 
                runInAction(() => {
                    this.status = ApplicationStatus.CreateItems;
                    this.listTitle = listTitle;
                    resolve();
                });

            }, 1000);
        });
    }

    @action
    public async addListItem(item: IFakeItem): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            // Mock adding item a new item
            setTimeout(() => {
                // Make sure we change our state in an action. 
                runInAction(() => {
                    this.items.push(item);
                    resolve();
                });

            }, 500);
        });
    }

    @action
    public confirmItems(): void {
        this.status = ApplicationStatus.Completed;
    }
}