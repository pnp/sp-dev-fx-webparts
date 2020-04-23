import { action, observable } from "mobx";
import { RootStore } from "./RootStore";

export class ConfigStore {

    @observable public isLoading: boolean;
    @observable public allowImportantItems: boolean;
    @observable public applicationTitle: string;

    constructor(private rootStore: RootStore) {
        this.setInitialState();

        // Mock REST call for fetching configuration data
        setTimeout(() => {
            this.loadConfigration();
        }, 1000);
    }

    @action
    public setInitialState(): void {
        this.isLoading = true;
        this.allowImportantItems = true;
        this.applicationTitle = null;
    }

    @action
    private loadConfigration() {
        this.isLoading = false;
        this.rootStore.appStore.isLoadingConfiguration = false;
    }

    @action
    public setApplicationTitle(title: string): void {
        this.applicationTitle = title;
    }

    @action
    public setAllowImportantItems(allow: boolean): void {
        this.allowImportantItems = allow;
    }
}