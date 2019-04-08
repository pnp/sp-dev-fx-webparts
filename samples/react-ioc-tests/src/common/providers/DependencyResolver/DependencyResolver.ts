import StorageCacheProvider from "../Cache/StorageCacheProvider";
import ConsoleLogProvider from "../Log/ConsoleLogProvider";
import PnPListsService from "../../services/Lists/PnPListsService";
import PnPListsServiceExecutor from "../../services/Lists/executor/PnPListsServiceExecutor";
import ICacheProvider from "../Cache/ICacheProvider";
import ILogProvider from "../Log/ILogProvider";
import IListsService from "../../services/Lists/IListsService";

export default class DependencyResolver { // implements IDependencyResolver 
    // private useMockServices: boolean;

    // constructor(useMockServices: boolean = false) {
    //     this.useMockServices = useMockServices;
    // }

    public ResolveICacheProvider(): ICacheProvider {
        return new StorageCacheProvider(window.sessionStorage);
    }

    public ResolveILogProvider(): ILogProvider {
        return new ConsoleLogProvider();
    }

    public ResolveIListsService(webUrl: string): IListsService {
        return new PnPListsService(new PnPListsServiceExecutor(webUrl));
    }
}