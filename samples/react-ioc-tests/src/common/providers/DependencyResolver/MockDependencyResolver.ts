import ICacheProvider from "../Cache/ICacheProvider";
import ILogProvider from "../Log/ILogProvider";
import IListsService from "../../services/Lists/IListsService";
import IDependencyResolver from "./IDependencyResolver";
import MockCacheProvider from "../Cache/MockCacheProvider";
import MockLogProvider from "../Log/MockLogProvider";
import MockListsService from "../../services/Lists/MockListsService";

export default class MockDependencyResolver implements IDependencyResolver { 

    public ResolveICacheProvider(): ICacheProvider {
        return new MockCacheProvider(window.sessionStorage);
    }

    public ResolveILogProvider(): ILogProvider {
        return new MockLogProvider();
    }

    public ResolveIListsService(): IListsService {
        return new MockListsService([]);
    }
}