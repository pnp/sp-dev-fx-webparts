import * as React from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'SpFxHttpClientWebPartStrings';
import SpFxHttpClient from './components/SpFxHttpClient';
import { ISpFxHttpClientProps } from './components/ISpFxHttpClientProps';

import {
  HttpClient,
  HttpClientResponse
} from '@microsoft/sp-http';

import { INasaImageSearchResponse } from '../../models/INasaImageSearchResponse';

export interface ISpFxHttpClientWebPartProps {
  description: string;
}

export default class SpFxHttpClientWebPart extends BaseClientSideWebPart<ISpFxHttpClientWebPartProps> {

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';
  private _root: Root | undefined;

  private async _getApolloImage(): Promise<INasaImageSearchResponse> {
    const response: HttpClientResponse = await this.context.httpClient.get(
      `https://images-api.nasa.gov/search?q=Apollo%204&media_type=image`,
      HttpClient.configurations.v1
    );

    if (!response.ok) {
      const responseText = await response.text();
      throw new Error(responseText);
    }

    const responseJson = await response.json();
    return responseJson as INasaImageSearchResponse;
  }

  protected get isRenderAsync(): boolean {
    return true;
  }

  public async render(): Promise<void> {
    if (!this.renderedOnce) {
      const response: INasaImageSearchResponse = await this._getApolloImage();

      const element: React.ReactElement<ISpFxHttpClientProps> = React.createElement(
        SpFxHttpClient,
        {
          apolloMissionImage: response.collection.items[0],
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

    this.renderCompleted();
  }

  protected renderCompleted(): void {
    super.renderCompleted();
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
