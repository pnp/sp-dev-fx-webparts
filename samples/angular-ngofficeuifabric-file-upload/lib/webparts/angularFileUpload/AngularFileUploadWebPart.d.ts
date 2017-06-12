import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart, IPropertyPaneConfiguration, IWebPartContext } from '@microsoft/sp-webpart-base';
import './app/FileUploadModule';
import { IAngularFileUploadWebPartProps } from './IAngularFileUploadWebPartProps';
export default class AngularFileUploadWebPart extends BaseClientSideWebPart<IAngularFileUploadWebPartProps> {
    private $injector;
    constructor(context: IWebPartContext);
    render(): void;
    protected readonly dataVersion: Version;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
    protected readonly disableReactivePropertyChanges: boolean;
}
