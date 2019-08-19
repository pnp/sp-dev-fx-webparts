import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'msalWpStrings';
import MsalWp from './components/MsalWp';
import { IMsalWpProps } from './components/IMsalWpProps';
import { IMsalWpWebPartProps } from './IMsalWpWebPartProps';

export default class MsalWpWebPart extends BaseClientSideWebPart<IMsalWpWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IMsalWpProps > = React.createElement(
      MsalWp,
      {
        description: this.properties.description,
        context: this.context
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
