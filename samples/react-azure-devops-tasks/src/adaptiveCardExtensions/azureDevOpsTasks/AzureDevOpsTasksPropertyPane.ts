import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';

export class AzureDevOpsTasksPropertyPane {
  public getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: []
    };
  }
}
