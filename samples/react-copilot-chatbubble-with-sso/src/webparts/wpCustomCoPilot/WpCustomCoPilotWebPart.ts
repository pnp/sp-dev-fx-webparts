import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneToggle
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'WpCustomCoPilotWebPartStrings';
import WpCustomCoPilot from './components/WpCustomCoPilot';
import { IWpCustomCoPilotProps } from './components/IWpCustomCoPilotProps';


export interface IWpCustomCoPilotWebPartProps {
  botName: string;
  botURL: string;
  clientID: string;
  authority: string;
  customScope: string;
  greet: boolean;
  userDisplayName: string;
}

export default class WpCustomCoPilotWebPart extends BaseClientSideWebPart<IWpCustomCoPilotWebPartProps> {

  private _environmentMessage: string = '';

  public render(): void {
    console.log(this._environmentMessage);
    const element: React.ReactElement<IWpCustomCoPilotProps> = React.createElement(
      WpCustomCoPilot,
      {
        botName: this.properties.botName ,
        botURL: this.properties.botURL,
        clientID: this.properties.clientID,
        authority: this.properties.authority,
        customScope: this.properties.customScope,
        userEmail: this.context.pageContext.user.email,
        userFriendlyName: this.context.pageContext.user.displayName,
        greet: this.properties.greet,
        userDisplayName: this.context.pageContext.user.displayName,
      }
    );

    ReactDom.render(element, this.domElement);
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
                PropertyPaneTextField('botName', {
                  label: 'Bot Name',
                  value: this.properties.botName
                }),
                PropertyPaneTextField('botURL', {
                  label: 'Bot URL',
                  value: this.properties.botURL ? btoa(this.properties.botURL) : ''
                }),
                PropertyPaneTextField('clientID', {
                  label: 'Client ID',
                  value: this.properties.clientID ? btoa(this.properties.clientID) : ''
                }),
                PropertyPaneTextField('authority', {
                  label: 'Authority',
                  value: this.properties.authority ? btoa(this.properties.authority) : ''
                }),
                PropertyPaneTextField('customScope', {
                  label: 'Custom Scope',
                  value: this.properties.customScope ? btoa(this.properties.customScope) : ''
                }),
                PropertyPaneToggle('greet', {
                  label: 'Greet User on Start?'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
