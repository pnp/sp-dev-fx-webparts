import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart, IPropertyPaneConfiguration, IWebPartContext } from '@microsoft/sp-webpart-base';
import { IWorkingWithWebPartProps } from './IWorkingWithWebPartProps';
export default class WorkingWithWebPart extends BaseClientSideWebPart<IWorkingWithWebPartProps> {
    constructor(context: IWebPartContext);
    render(): void;
    protected readonly dataVersion: Version;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
}
