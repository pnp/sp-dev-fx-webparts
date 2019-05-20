import { RootStore } from "./rootStore";
import { observable, action, runInAction } from "mobx";

export class ConfigStore {

    @observable public isLoading: boolean = true;
    @observable public applicationTitle: string = null;

    constructor(private rootStore: RootStore) {
        
    }

    @action setApplicationTitle(title: string) {
        this.applicationTitle = title;
    }
}