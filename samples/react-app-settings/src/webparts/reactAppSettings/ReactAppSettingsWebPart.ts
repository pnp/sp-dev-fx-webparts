import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'reactAppSettingsStrings';
import ReactAppSettings from './components/ReactAppSettings';
import { IReactAppSettingsProps } from './components/IReactAppSettingsProps';
import { IReactAppSettingsWebPartProps } from './IReactAppSettingsWebPartProps';

export default class ReactAppSettingsWebPart extends BaseClientSideWebPart<IReactAppSettingsWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IReactAppSettingsProps > = React.createElement(
      ReactAppSettings,
      {
        description: this.properties.description
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
