import * as React from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'SpFxHttpClientDemoWebPartStrings';
import SpFxHttpClientDemo from './components/SpFxHttpClientDemo';
import { ISpFxHttpClientDemoProps } from './components/ISpFxHttpClientDemoProps';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { ICountryListItem } from '../../models';

export interface ISpFxHttpClientDemoWebPartProps {
  description: string;
}

export default class SpFxHttpClientDemoWebPart extends BaseClientSideWebPart<ISpFxHttpClientDemoWebPartProps> {

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';
  private _root: Root | undefined;
  private _countries: ICountryListItem[] = [];

  public render(): void {
    const element: React.ReactElement<ISpFxHttpClientDemoProps> = React.createElement(
      SpFxHttpClientDemo,
      {
        spListItems: this._countries,
        onGetListItems: this._onGetListItems,
        onAddListItem: this._onAddListItem,
        onUpdateListItem: this._onUpdateListItem,
        onDeleteListItem: this._onDeleteListItem,
        isDarkTheme: this._isDarkTheme,
        environmentMessage: this._environmentMessage,
        userDisplayName: this.context.pageContext.user.displayName
      }
    );

    if (!this._root) {
      this._root = createRoot(this.domElement);
    }

    this._root.render(element);
  }

  private _onGetListItems = async (): Promise<void> => {
    const response: ICountryListItem[] = await this._getListItems();
    this._countries = response;
    this.render();
  }

  private async _getListItems(): Promise<ICountryListItem[]> {
    const response = await this.context.spHttpClient.get(
      this.context.pageContext.web.absoluteUrl + `/_api/web/lists/getbytitle('Countries')/items?$select=Id,Title`,
      SPHttpClient.configurations.v1);

    if (!response.ok) {
      const responseText = await response.text();
      throw new Error(responseText);
    }

    const responseJson = await response.json();

    return responseJson.value as ICountryListItem[];
  }

  private _onAddListItem = async (): Promise<void> => {
    const addResponse: SPHttpClientResponse = await this._addListItem();

    if (!addResponse.ok) {
      const responseText = await addResponse.text();
      throw new Error(responseText);
    }

    const getResponse: ICountryListItem[] = await this._getListItems();
    this._countries = getResponse;
    this.render();
  }

  private _onUpdateListItem = async (): Promise<void> => {
    const updateResponse: SPHttpClientResponse = await this._updateListItem();

    if (!updateResponse.ok) {
      const responseText = await updateResponse.text();
      throw new Error(responseText);
    }

    const getResponse: ICountryListItem[] = await this._getListItems();
    this._countries = getResponse;
    this.render();
  }

  private _onDeleteListItem = async (): Promise<void> => {
    const deleteResponse: SPHttpClientResponse = await this._deleteListItem();

    if (!deleteResponse.ok) {
      const responseText = await deleteResponse.text();
      throw new Error(responseText);
    }

    const getResponse: ICountryListItem[] = await this._getListItems();
    this._countries = getResponse;
    this.render();
  }

  private async _getItemEntityType(): Promise<string> {
    const endpoint: string = this.context.pageContext.web.absoluteUrl +
      `/_api/web/lists/getbytitle('Countries')?$select=ListItemEntityTypeFullName`;

    const response = await this.context.spHttpClient.get(
      endpoint,
      SPHttpClient.configurations.v1);

    if (!response.ok) {
      const responseText = await response.text();
      throw new Error(responseText);
    }

    const responseJson = await response.json();

    return responseJson.ListItemEntityTypeFullName;
  }

  private async _addListItem(): Promise<SPHttpClientResponse> {
    const itemEntityType = await this._getItemEntityType();

    /* eslint-disable @typescript-eslint/no-explicit-any */
    const request: any = {};
    request.body = JSON.stringify({
      Title: new Date().toUTCString(),
      '@odata.type': itemEntityType
    });
    /* eslint-enable @typescript-eslint/no-explicit-any */

    const endpoint = this.context.pageContext.web.absoluteUrl +
      `/_api/web/lists/getbytitle('Countries')/items`;

    return this.context.spHttpClient.post(
      endpoint,
      SPHttpClient.configurations.v1,
      request);
  }

  private async _updateListItem(): Promise<SPHttpClientResponse> {
    const getEndpoint: string = this.context.pageContext.web.absoluteUrl +
      `/_api/web/lists/getbytitle('Countries')/items?` +
      `$select=Id,Title&$filter=Title eq 'United States'`;

    const getResponse = await this.context.spHttpClient.get(
      getEndpoint,
      SPHttpClient.configurations.v1);

    if (!getResponse.ok) {
      const responseText = await getResponse.text();
      throw new Error(responseText);
    }

    const responseJson = await getResponse.json();
    if (responseJson.value.length === 0) {
      throw new Error(`The Countries list has no item with the title 'United States'.`);
    }
    const listItem: ICountryListItem = responseJson.value[0];

    listItem.Title = 'USA';
    /* eslint-disable @typescript-eslint/no-explicit-any */
    const request: any = {};
    request.headers = {
      'X-HTTP-Method': 'MERGE',
      'IF-MATCH': (listItem as any)['@odata.etag']
    };
    /* eslint-enable @typescript-eslint/no-explicit-any */
    request.body = JSON.stringify(listItem);

    const postEndpoint: string = this.context.pageContext.web.absoluteUrl +
      `/_api/web/lists/getbytitle('Countries')/items(${listItem.Id})`;

    return this.context.spHttpClient.post(
      postEndpoint,
      SPHttpClient.configurations.v1,
      request);
  }

  private async _deleteListItem(): Promise<SPHttpClientResponse> {
    const getEndpoint = this.context.pageContext.web.absoluteUrl +
      `/_api/web/lists/getbytitle('Countries')/items?` +
      `$select=Id,Title&$orderby=ID desc&$top=1`;

    const getResponse = await this.context.spHttpClient.get(
      getEndpoint,
      SPHttpClient.configurations.v1);

    if (!getResponse.ok) {
      const responseText = await getResponse.text();
      throw new Error(responseText);
    }

    const responseJson = await getResponse.json();
    const listItem: ICountryListItem = responseJson.value[0];

    /* eslint-disable @typescript-eslint/no-explicit-any */
    const request: any = {};
    request.headers = {
      'X-HTTP-Method': 'DELETE',
      'IF-MATCH': '*'
    };
    /* eslint-enable @typescript-eslint/no-explicit-any */

    const postEndpoint = this.context.pageContext.web.absoluteUrl +
      `/_api/web/lists/getbytitle('Countries')/items(${listItem.Id})`;

    return this.context.spHttpClient.post(
      postEndpoint,
      SPHttpClient.configurations.v1,
      request);
  }

  protected onInit(): Promise<void> {
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
    this._root?.unmount();
    this._root = undefined;
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
