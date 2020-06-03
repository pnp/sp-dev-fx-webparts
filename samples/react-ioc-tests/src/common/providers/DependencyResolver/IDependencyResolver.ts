import ICacheProvider from "../Cache/ICacheProvider";
import ILogProvider from "../Log/ILogProvider";
import IListsService from "../../services/Lists/IListsService";

export default interface IDependencyResolver {
    ResolveICacheProvider(): ICacheProvider;
    ResolveILogProvider(): ILogProvider;
    ResolveIListsService(): IListsService;
}