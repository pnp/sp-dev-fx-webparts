import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart, IPropertyPaneConfiguration, IWebPartContext } from '@microsoft/sp-webpart-base';
import { IAngularWebApiWebPartProps } from './IAngularWebApiWebPartProps';
import 'ng-office-ui-fabric';
import './app/app.module';
export default class AngularWebApiWebPart extends BaseClientSideWebPart<IAngularWebApiWebPartProps> {
    private $injector;
    constructor(context: IWebPartContext);
    render(): void;
    protected readonly dataVersion: Version;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
}
