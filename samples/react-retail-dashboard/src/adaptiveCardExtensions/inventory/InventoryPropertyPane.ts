import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';

export class InventoryPropertyPane {
  public getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: []
    };
  }
}
