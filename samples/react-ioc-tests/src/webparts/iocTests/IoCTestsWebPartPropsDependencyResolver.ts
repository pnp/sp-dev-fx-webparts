import { IIocTestsWebPartProps } from "./IocTestsWebPart";
import { IListOfListsProps } from "./components/ListOfLists";
import IListsService from "../../common/services/Lists/IListsService";
import ICacheProvider from "../../common/providers/Cache/ICacheProvider";
import ILogProvider from "../../common/providers/Log/ILogProvider";
import DependencyResolver from "../../common/providers/DependencyResolver/DependencyResolver";

export default class IoCTestsWebPartPropsDependencyResolver {
    public resolve(properties: IIocTestsWebPartProps, webUrl: string): IListOfListsProps {

        const resolver = new DependencyResolver();

        const listsService: IListsService = resolver.ResolveIListsService(webUrl);
        const cacheProvider: ICacheProvider = resolver.ResolveICacheProvider();
        const logProvider: ILogProvider = resolver.ResolveILogProvider();

        const props: IListOfListsProps = {
            description: properties.description,
            listsService: listsService,
            cacheProvider: cacheProvider,
            logProvider: logProvider
        };

        return props;
    }
}