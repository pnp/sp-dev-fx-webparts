import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'WpCustomCoPilotWebPartStrings';
import WpCustomCoPilot from './components/WpCustomCoPilot';
import { IWpCustomCoPilotProps } from './components/IWpCustomCoPilotProps';
import { ConfigurationService } from './ConfigService/ConfigurationService';


export interface IWpCustomCoPilotWebPartProps {
  botName: string;
  botURL: string;
  clientID: string;
  authority: string;
  customScope: string;
  greet: boolean;
  userDisplayName: string;
  webpartHeader: string;
}

export default class WpCustomCoPilotWebPart extends BaseClientSideWebPart<IWpCustomCoPilotWebPartProps> {

  private _environmentMessage: string = '';
  private _configurationService: ConfigurationService;
  private _configuration : any;

  public render(): void {
    console.log(this._environmentMessage);
    const element: React.ReactElement<IWpCustomCoPilotProps> = React.createElement(
      WpCustomCoPilot,
      {
        botName: this._configuration.botName,
        botURL: this._configuration.botURL,
        clientID: this._configuration.clientID,
        authority: this._configuration.authority,
        customScope: this._configuration.customScope,
        userEmail: this.context.pageContext.user.email,
        userFriendlyName: this.context.pageContext.user.displayName,
        greet: this._configuration.greet,
        userDisplayName: this.context.pageContext.user.displayName,
        botAvatarImage: this._configuration.botAvatarImage,
        botAvatarInitials: this._configuration.botAvatarInitials,
        welcomeMessage: this.properties.webpartHeader ? this.properties.webpartHeader : 'Ask CoPilot a question'
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected async onInit(): Promise<void> {
    this._configurationService = new ConfigurationService(this.context);
    const configuration = await this._configurationService.getConfiguration();
    console.log(configuration);

    return this._getEnvironmentMessage().then(message => {
      this._environmentMessage = message;
      this._configuration = configuration;
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
          header: { description: strings.PropertyPaneDescription },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('webpartHeader', {
                  label: 'Welcome Message',
                  value: this.properties.webpartHeader
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
