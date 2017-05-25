import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart, IPropertyPaneConfiguration, IWebPartContext } from '@microsoft/sp-webpart-base';
import 'ng-office-ui-fabric';
import { IMostPopularItemsWebPartProps } from './IMostPopularItemsWebPartProps';
export default class MostPopularItemsWebPart extends BaseClientSideWebPart<IMostPopularItemsWebPartProps> {
    private $injector;
    constructor(context: IWebPartContext);
    render(): void;
    protected readonly dataVersion: Version;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
    protected readonly disableReactivePropertyChanges: boolean;
}
