import { ConfigStore } from "./ConfigStore";

export enum Stores {
    AppStore = "appStore",
    ConfigurationStore = "configStore"
}

export class RootStore {
    public readonly appStore: any;
    public readonly configStore: any;
    public readonly rootStore: RootStore;

    constructor() {
        this.rootStore = this;
        this.configStore = new ConfigStore(this);
        this.appStore = null;
    }
}