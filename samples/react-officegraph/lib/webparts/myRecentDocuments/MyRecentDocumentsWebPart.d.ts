import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart, IPropertyPaneConfiguration, IWebPartContext } from '@microsoft/sp-webpart-base';
import { IMyRecentDocumentsWebPartProps } from './IMyRecentDocumentsWebPartProps';
export default class MyRecentDocumentsWebPart extends BaseClientSideWebPart<IMyRecentDocumentsWebPartProps> {
    constructor(context: IWebPartContext);
    render(): void;
    protected readonly dataVersion: Version;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
}
