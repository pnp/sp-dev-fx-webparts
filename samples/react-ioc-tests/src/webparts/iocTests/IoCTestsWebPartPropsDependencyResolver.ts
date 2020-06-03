import { IIocTestsWebPartProps } from "./IocTestsWebPart";
import { IListOfListsProps } from "./components/ListOfLists";
import IListsService from "../../common/services/Lists/IListsService";
import ICacheProvider from "../../common/providers/Cache/ICacheProvider";
import ILogProvider from "../../common/providers/Log/ILogProvider";
import IDependencyResolver from "../../common/providers/DependencyResolver/IDependencyResolver";

export default class IoCTestsWebPartPropsDependencyResolver {
    private resolver: IDependencyResolver;

    constructor(resolver: IDependencyResolver) {
        this.resolver = resolver;
    }

    public resolve(properties: IIocTestsWebPartProps): IListOfListsProps {

        const listsService: IListsService = this.resolver.ResolveIListsService();
        const cacheProvider: ICacheProvider = this.resolver.ResolveICacheProvider();
        const logProvider: ILogProvider = this.resolver.ResolveILogProvider();

        const props: IListOfListsProps = {
            description: properties.description,
            listsService: listsService,
            cacheProvider: cacheProvider,
            logProvider: logProvider
        };

        return props;
    }
}