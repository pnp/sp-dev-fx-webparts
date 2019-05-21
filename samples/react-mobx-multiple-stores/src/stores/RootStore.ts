import { ConfigStore } from "./ConfigStore";
import { AppStore } from "./AppStore";

export enum Stores {
    AppStore = "appStore",
    ConfigurationStore = "configStore"
}

export class RootStore {
    public readonly appStore: AppStore;
    public readonly configStore: ConfigStore;
    public readonly rootStore: RootStore;

    constructor() {
        this.rootStore = this;
        this.configStore = new ConfigStore(this);
        this.appStore = new AppStore(this);
    }

}