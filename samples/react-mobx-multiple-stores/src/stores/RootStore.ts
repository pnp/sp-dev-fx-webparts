import { AppStore } from "./AppStore";
import { ConfigStore } from "./ConfigStore";

export enum Stores {
    AppStore = "appStore",
    ConfigurationStore = "configStore"
}

export class RootStore {
    public readonly appStore: AppStore;
    public readonly configStore: ConfigStore;

    constructor() {
        this.configStore = new ConfigStore(this);
        this.appStore = new AppStore(this);
    }
}