/// <reference types="es6-promise" />
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart, IPropertyPaneConfiguration } from '@microsoft/sp-webpart-base';
import { IPnpJsCrudWithBatchWebPartProps } from './IPnpJsCrudWithBatchWebPartProps';
export default class PnpJsCrudWithBatchWebPart extends BaseClientSideWebPart<IPnpJsCrudWithBatchWebPartProps> {
    protected onInit(): Promise<void>;
    render(): void;
    private setButtonsState();
    private setButtonsEventHandlers();
    protected readonly dataVersion: Version;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
    private listNotConfigured();
    private createItem();
    private getLatestItemId();
    private readItems();
    private updateItem();
    private deleteItem();
    private updateStatus(status, items?);
    private updateItemsHtml(items);
}
