import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneToggle
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme, ThemeProvider } from '@microsoft/sp-component-base';

import * as strings from 'HrAssistantWebPartStrings';

import App, { IAppProps } from './components/App';

export interface IHrAssistantWebPartProps {
  title: string;
  description: string;  
  botURL: string;
  greet: boolean;
  clientId: string;
  tenantName: string;
  scope: string;
  botAvatarImage: string;
  botAvatarInitials: string;

}

export default class HrAssistantWebPart extends BaseClientSideWebPart<IHrAssistantWebPartProps> {

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';
  private _themeProvider: ThemeProvider;
  private _themeVariant: IReadonlyTheme | undefined;
  

  public render(): void {
    const element: React.ReactElement<IAppProps> = React.createElement(
      App,
      {
        
        context: this.context,
        themeVariant: this._themeVariant,
        webPartDisplayMode: this.displayMode,
        title: this.properties.title || '',
        description: this.properties.description || '',        
        botURL: this.properties.botURL || '',
        greet: this.properties.greet || false,
        clientId: this.properties.clientId || '',
        tenantName: this.properties.tenantName || '',
        scope: this.properties.scope || '',
        userEmail: this.context.pageContext.user.email || '',
        isDarkTheme: this._isDarkTheme || false,
        environmentMessage: this._environmentMessage || '',
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        userDisplayName: this.context.pageContext.user.displayName || '',
        botAvatarImage: this.properties.botAvatarImage || '',
        botAvatarInitials: this.properties.botAvatarInitials || '',
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onInit(): Promise<void> {
    return this._getEnvironmentMessage().then(message => {
      this._environmentMessage = message;
  
      this._themeProvider = this.context.serviceScope.consume(
        ThemeProvider.serviceKey
      );
      // If it exists, get the theme variant
      this._themeVariant = this._themeProvider.tryGetTheme();
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

    this._themeVariant = currentTheme;
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

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {         
          displayGroupsAsAccordion: true, // Enables expand/collapse icons for groups
          groups: [
            {
              groupName: 'Header settings',
              isCollapsed: true,
              groupFields: [
                PropertyPaneTextField('title', {
                  label: "Title"
                }),
                PropertyPaneTextField('description', {
                  label: 'Description'
                })
              ]
            },
            {
              groupName: 'Connection settings',
              isCollapsed: true,
              groupFields: [                
                PropertyPaneTextField('botURL', {
                  label: "Bot URL"
                }),               
                PropertyPaneTextField('clientId', {
                  label: "Client Id",
                }),
                PropertyPaneTextField('tenantName', {
                  label: "Tenant Name",
                }),
                PropertyPaneTextField('scope', {
                  label: "API Scope",
                }),
                PropertyPaneToggle('greet', {
                  label: "Greet",
                  onText: "On",
                  offText: "Off"
                }),
              ]
            },
            {
              groupName: 'Appearance settings',
              isCollapsed: true,
              groupFields: [
                PropertyPaneTextField('botAvatarImage', {
                  label: 'Avatar image used for bot'
                }),
                PropertyPaneTextField('botAvatarInitials', {
                  label: 'Avatar initials used for bot'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
