import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'UpgradeMeWebPartStrings';
import UpgradeMe from './components/UpgradeMe';
import { IUpgradeMeProps } from './components/IUpgradeMeProps';

export interface IUpgradeMeWebPartProps {
  description: string;
}

export default class UpgradeMeWebPart extends BaseClientSideWebPart<IUpgradeMeWebPartProps> {

  public render(): void {

    const element: React.ReactElement<IUpgradeMeProps > = React.createElement(
      UpgradeMe,
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
