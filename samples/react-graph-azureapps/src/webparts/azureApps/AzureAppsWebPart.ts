import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'AzureAppsWebPartStrings';
import azureApps from './components/AzureApps';
import { IAzureAppsProps } from './components/IAzureAppsProps';
import { MSGraphClientV3 } from '@microsoft/sp-http';

export interface IazureAppsWebPartProps {
  description: string;
}

export default class azureAppsWebPart extends BaseClientSideWebPart<IazureAppsWebPartProps> {
  private graphClient: MSGraphClientV3;

  protected onInit(): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return new Promise<void>((resolve: () => void, reject: (error: any) => void): void => {
      this.context.msGraphClientFactory
        .getClient("3")
        .then((client: MSGraphClientV3): void => {
          this.graphClient = client;
          resolve();
        }, err => reject(err));
    })
  }

  public render(): void {
    const element: React.ReactElement<IAzureAppsProps> = React.createElement(
      azureApps,
      {
        graphClient: this.graphClient
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
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
