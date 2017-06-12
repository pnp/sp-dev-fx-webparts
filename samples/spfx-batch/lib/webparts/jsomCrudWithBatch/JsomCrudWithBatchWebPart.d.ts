import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart, IPropertyPaneConfiguration } from '@microsoft/sp-webpart-base';
import { IJsomCrudWithBatchWebPartProps } from './IJsomCrudWithBatchWebPartProps';
export default class JsomCrudWithBatchWebPart extends BaseClientSideWebPart<IJsomCrudWithBatchWebPartProps> {
    private webpartTitle;
    render(): void;
    private setButtonsState();
    private listNotConfigured();
    private setButtonsEventHandlers();
    private updateStatus(status, items?);
    private updateItemsHtml(items);
    readItems(): void;
    private createItem();
    private getLatestItemId(successCallback, errorCallback);
    private updateItem();
    private deleteItem();
    protected readonly dataVersion: Version;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
}
