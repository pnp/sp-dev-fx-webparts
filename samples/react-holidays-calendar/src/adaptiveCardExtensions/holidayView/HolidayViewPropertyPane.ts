import { IPropertyPaneConfiguration, PropertyPaneTextField } from '@microsoft/sp-property-pane';
import * as strings from 'HolidayViewAdaptiveCardExtensionStrings';

export class HolidayViewPropertyPane {
  public getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: { description: strings.PropertyPaneDescription },
          groups: [
            {
              groupFields: [
                PropertyPaneTextField('title', {
                  label: strings.TitleFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
