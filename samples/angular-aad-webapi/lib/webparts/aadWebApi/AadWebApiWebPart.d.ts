import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart, IPropertyPaneConfiguration, IWebPartContext } from '@microsoft/sp-webpart-base';
import { IAadWebApiWebPartProps } from './IAadWebApiWebPartProps';
import './app/app.module';
import 'ng-office-ui-fabric';
export default class AadWebApiWebPart extends BaseClientSideWebPart<IAadWebApiWebPartProps> {
    private $injector;
    constructor(context: IWebPartContext);
    render(): void;
    protected readonly dataVersion: Version;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
}
