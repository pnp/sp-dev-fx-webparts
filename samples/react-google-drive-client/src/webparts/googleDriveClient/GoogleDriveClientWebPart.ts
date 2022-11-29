import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as strings from 'GoogleDriveClientWebPartStrings';
import GoogleDriveClient from './components/GoogleDriveClient';
import { IGoogleDriveClientProps } from './components/IGoogleDriveClientProps';
import { oAuthHandlerService } from '../../services/oAuthHandlerService';
import { GoogleDriveDataProvider } from '../../dal/google/GoogleDriveDataProvider';
import { AuthHttpClient, FetchHttpClient } from 'mgwdev-m365-helpers';
import { TeamsGoogleDriveAuthService } from '../../services/TeamsGoogleDriveAuthService';
import { GoogleDriveAuthService } from '../../services/GoogleDriveAuthService';

export interface IGoogleDriveClientWebPartProps {
  googleDriveClientId: string;
  callbackPageUrl: string;
}

const defaultClientId = "YOUR_CLIENT_ID";
const defaultCallbackPageUrl = "YOUR_CALLBACK_PAGE_URL";
export default class GoogleDriveClientWebPart extends BaseClientSideWebPart<IGoogleDriveClientWebPartProps> {
  protected googleDriveClient: GoogleDriveDataProvider;
  public render(): void {
    const element: React.ReactElement<IGoogleDriveClientProps> = React.createElement(
      GoogleDriveClient,
      {
        googleDriveClient: this.googleDriveClient,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected async onInit(): Promise<void> {
    //no need to await this it can check the query parameters in the background
    oAuthHandlerService.handleOAuthResponse(this.context.sdks.microsoftTeams?.teamsJs);
    this.googleDriveClient = await this.buildGoogleDriveClient();
  }

  private async buildGoogleDriveClient(): Promise<GoogleDriveDataProvider> {
    return new Promise((resolve, error) => {
      if (this.context.sdks?.microsoftTeams?.teamsJs) {
        this.context.sdks.microsoftTeams.teamsJs.app.initialize([window.location.origin, "https://www.googleapis.com/auth/drive"]).then(() => {
          resolve(new GoogleDriveDataProvider(new AuthHttpClient(new TeamsGoogleDriveAuthService(this.properties.googleDriveClientId || defaultClientId,
            this.context.sdks.microsoftTeams.teamsJs,
            this.properties.callbackPageUrl || defaultCallbackPageUrl),
            new FetchHttpClient())));
        });
      }
      else {
        resolve(new GoogleDriveDataProvider(new AuthHttpClient(new GoogleDriveAuthService(
          this.properties.googleDriveClientId || defaultClientId),
          new FetchHttpClient())));
      }
    });
  }

  protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: any, newValue: any): void {
    super.onPropertyPaneFieldChanged(propertyPath, oldValue, newValue);
    if (propertyPath === "googleDriveClientId" || propertyPath === "callbackPageUrl") {
      this.buildGoogleDriveClient().then(client => {
        this.googleDriveClient = client;
      });
    }
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
                PropertyPaneTextField('googleDriveClientId', {
                  label: strings.GoogleDriveClientIdFieldLabel
                }),
                PropertyPaneTextField('callbackPageUrl', {
                  label: strings.CallbackPageUrlFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
