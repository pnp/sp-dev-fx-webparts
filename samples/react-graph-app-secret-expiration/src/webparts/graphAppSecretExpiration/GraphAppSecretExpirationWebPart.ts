import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  IPropertyPaneDropdownOption,
  PropertyPaneDropdown,
  PropertyPaneToggle
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'GraphAppSecretExpirationWebPartStrings';
import GraphAppSecretExpiration from './components/GraphAppSecretExpiration';
import { IGraphAppSecretExpirationProps } from './components/IGraphAppSecretExpirationProps';
import { MSGraphClient } from '@microsoft/sp-http';

export interface IGraphAppSecretExpirationWebPartProps {
  groupByColumn: string;
  expiringSoon: boolean;
  displaySampleData: boolean;

}

export default class GraphAppSecretExpirationWebPart extends BaseClientSideWebPart<IGraphAppSecretExpirationWebPartProps> {
  private graphClient: MSGraphClient;
  private dropdownOptions: IPropertyPaneDropdownOption[] = [
    { key: "none", text: "None" },
    { key: "applicationId", text: "Application ID" },
    { key: "type", text: "Type" }];

  public onInit(): Promise<void> {
    return new Promise<void>((resolve: () => void, reject: (error: any) => void): void => {
      this.context.msGraphClientFactory
        .getClient()
        .then((client: MSGraphClient): void => {
          this.graphClient = client;
          resolve();
        }, err => reject(err));
    });
  }

  public render(): void {
    const element: React.ReactElement<IGraphAppSecretExpirationProps> = React.createElement(
      GraphAppSecretExpiration,
      {
        graphClient: this.graphClient,
        groupByColumn: this.properties.groupByColumn,
        expiringSoon: this.properties.expiringSoon,
        displaySampleData: this.properties.displaySampleData
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
                PropertyPaneDropdown('groupByColumn', {
                  label: strings.DefaultGroupColumnFieldLabel,
                  options: this.dropdownOptions,
                  selectedKey: "none"
                }),
                PropertyPaneToggle('expiringSoon', {
                  label: strings.DisplayOnlySecretsFieldLabel,
                  onText: "Yes",
                  offText: "No"

                })
              ]
            },
            {
              groupName: strings.OtherGroupName,
              groupFields: [
                PropertyPaneToggle('displaySampleData', {
                  label: strings.DisplaySampleDataFieldLabel,
                  onText: "Yes",
                  offText: "No"

                })
              ]
            }
          ]
        }
      ]
    };
  }
}
