import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'PowerPlatformEnvironmentsWebPartStrings';
import PowerPlatformEnvironments from './components/PowerPlatformEnvironments';
import { IPowerPlatformEnvironmentsProps } from './components/IPowerPlatformEnvironmentsProps';

import { AadHttpClient } from '@microsoft/sp-http';

export interface IPowerPlatformEnvironmentsWebPartProps {
  environments: string;
  deleteEnvironment: (environmentId: string) => Promise<void>;
}

export interface IEnvironment {
  name: string;
  location: string;
  id: string;
  type: string;
  properties: {
    displayName: string;
    environmentSku: string;
    provisioningState: string;
    createdTime: string;
    isManaged?: boolean;
    linkedEnvironmentMetadata?: {
      instanceUrl: string;
    };
  };
}

export default class PowerPlatformEnvironmentsWebPart extends BaseClientSideWebPart<IPowerPlatformEnvironmentsWebPartProps> {

  private _environments: IEnvironment[] = [];

  public async render(): Promise<void> {
    console.log('render called, environments:', this._environments);

    const element: React.ReactElement<IPowerPlatformEnvironmentsProps> = React.createElement(
      PowerPlatformEnvironments,
      {
        environments: this._environments,
        deleteEnvironment: this._deleteEnvironment
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected async onInit(): Promise<void> {
    this._environments = await this._getEnvironments();

    console.log('onInit():', this._environments);
  }

  private async _getEnvironments(): Promise<IEnvironment[]> {
    const response = await this.context.aadHttpClientFactory
      .getClient('https://service.flow.microsoft.com')
      .then((client: AadHttpClient) =>
        client.get(
          'https://api.flow.microsoft.com/providers/Microsoft.ProcessSimple/environments?api-version=2016-11-01',
          AadHttpClient.configurations.v1
        )
      );

    const json = await response.json();

    if (json.error) {
      throw new Error(json.error);
    }

    console.log('_getEnvironments():', json.value);

    return json.value as IEnvironment[];
  }

  private _deleteEnvironment = async (environmentId: string): Promise<void> => {
    const client =
      await this.context.aadHttpClientFactory.getClient(
        'https://api.powerplatform.com'
      );

    const response = await client.fetch(
      `https://api.powerplatform.com/environmentmanagement/environments/${environmentId}?api-version=2024-10-01`,
      AadHttpClient.configurations.v1,
      {
        method: 'DELETE'
      }
    );

    if (!response.ok) {

      const error =
        await response.text();

      throw new Error(error);
    }
  };

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
