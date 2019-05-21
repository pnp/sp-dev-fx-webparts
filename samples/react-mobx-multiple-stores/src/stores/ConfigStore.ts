import { RootStore } from "./RootStore";
import { observable, action, runInAction } from "mobx";

export class ConfigStore {

    @observable public isLoading: boolean;
    @observable public allowImportantItems: boolean;
    @observable public applicationTitle: string;

    constructor(private rootStore: RootStore) {
        this.setInitialState();

        // Mock REST call for fetching configuration data, 5 seconds
        setTimeout(() => {
            this.loadConfigration();
        }, 5000);
    }

    @action
    public setInitialState(): void {
        this.isLoading = true;
        this.applicationTitle = null;
        this.allowImportantItems = false;
    }

    @action
    private loadConfigration() {
        this.isLoading = false;
        this.applicationTitle = "So cool man";
        this.allowImportantItems = true;
        this.rootStore.appStore.isLoading = false;
    }

    @action
    public setApplicationTitle(title: string): void {
        this.applicationTitle = title;
    }
}