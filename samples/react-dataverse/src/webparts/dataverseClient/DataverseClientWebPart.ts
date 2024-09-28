import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneDropdown,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'DataverseClientWebPartStrings';
import DataverseClient from './components/DataverseClient';
import { DataverseService } from '../../services/DataverseService';
import { EntitiesTableWrapper } from '../../components/EntitiesTableWrapper';

export interface IDataverseClientWebPartProps {
  dataverseEnvUri: string;
  tableName: string;
}

export default class DataverseClientWebPart extends BaseClientSideWebPart<IDataverseClientWebPartProps> {

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';
  private _dataverseService: DataverseService;
  private _tables: { id: string, entityName: string, displayName: string }[] = [];
  public render(): void {
    let element: React.ReactElement;
    if (this.properties.dataverseEnvUri && this.properties.tableName) {
      element = React.createElement(EntitiesTableWrapper, {
        environmentUri: this.properties.dataverseEnvUri,
        tableName: this.properties.tableName,
        clientFactory: this.context.aadHttpClientFactory
      });
    }
    else {
      element = React.createElement(
        DataverseClient,
        {
          description: "",
          isDarkTheme: this._isDarkTheme,
          environmentMessage: this._environmentMessage,
          hasTeamsContext: !!this.context.sdks.microsoftTeams,
          userDisplayName: this.context.pageContext.user.displayName
        }
      );
    }

    ReactDom.render(element, this.domElement);
  }

  protected async onInit(): Promise<void> {
    if (this.properties.dataverseEnvUri) {
      try {
        const httpClient = await this.context.aadHttpClientFactory.getClient(this.properties.dataverseEnvUri);
        this._dataverseService = new DataverseService(httpClient, this.properties.dataverseEnvUri);
        this._tables = await this._dataverseService.getAvailableTables();
        this.context.propertyPane.refresh();
      }
      catch (error) {
        console.error(error);
      }
    }
    return this._getEnvironmentMessage().then(message => {
      this._environmentMessage = message;
    });
  }



  private _getEnvironmentMessage(): Promise<string> {
    if (!!this.context.sdks.microsoftTeams) { // running in Teams, office.com or Outlook
      return this.context.sdks.microsoftTeams.teamsJs.app.getContext()
        .then(context => {
          let environmentMessage: string = '';
          switch (context.app.host.name) {
            case 'Office': // running in Office
              environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentOffice : strings.AppOfficeEnvironment;
              break;
            case 'Outlook': // running in Outlook
              environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentOutlook : strings.AppOutlookEnvironment;
              break;
            case 'Teams': // running in Teams
            case 'TeamsModern':
              environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentTeams : strings.AppTeamsTabEnvironment;
              break;
            default:
              environmentMessage = strings.UnknownEnvironment;
          }

          return environmentMessage;
        });
    }

    return Promise.resolve(this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentSharePoint : strings.AppSharePointEnvironment);
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    this._isDarkTheme = !!currentTheme.isInverted;
    const {
      semanticColors
    } = currentTheme;

    if (semanticColors) {
      this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
      this.domElement.style.setProperty('--link', semanticColors.link || null);
      this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered || null);
    }

  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected async onPropertyPaneFieldChanged(propertyPath: string, oldValue: any, newValue: any): Promise<void> {
    if (propertyPath === 'dataverseEnvUri') {
      this._dataverseService = new DataverseService(await this.context.aadHttpClientFactory.getClient(newValue), newValue);
      this._tables = await this._dataverseService.getAvailableTables();
      this.context.propertyPane.refresh();
      super.onPropertyPaneFieldChanged(propertyPath, oldValue, newValue);
    }
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
                PropertyPaneTextField('dataverseEnvUri', {
                  label: "Dataverse Environment URI",
                  description: "Enter the URI of the Dataverse environment for example https://xxxx.crm4.dynamics.com. Remember to grant permissions for SPO Extensibility Princiapl to Dynamics CRM.",
                }),
                PropertyPaneDropdown('tableName', {
                  label: 'Select a table',
                  options: this._tables.map(table => {
                    return {
                      key: table.entityName,
                      text: table.displayName
                    }
                  })
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
