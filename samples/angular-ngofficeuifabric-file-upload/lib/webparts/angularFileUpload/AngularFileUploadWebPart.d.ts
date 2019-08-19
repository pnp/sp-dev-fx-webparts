import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart, IPropertyPaneConfiguration, IWebPartContext } from '@microsoft/sp-webpart-base';
import { IAngularFileUploadWebPartProps } from './IAngularFileUploadWebPartProps';
import 'ng-office-ui-fabric';
export default class AngularFileUploadWebPart extends BaseClientSideWebPart<IAngularFileUploadWebPartProps> {
    context: IWebPartContext;
    private $injector;
    constructor(context: IWebPartContext);
    render(): void;
    protected initAngularApp(pageContext: any): void;
    protected readonly dataVersion: Version;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
    protected readonly disableReactivePropertyChanges: boolean;
}
