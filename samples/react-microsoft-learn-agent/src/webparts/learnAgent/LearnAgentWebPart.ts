import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneToggle
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'LearnAgentWebPartStrings';
import LearnAgentCombined from './components/LearnAgentCombined';
import { ILearnAgentCombinedProps } from './components/LearnAgentCombined';

export interface ILearnAgentWebPartProps {
  environmentId: string;
  agentIdentifier: string;
  tenantId: string;
  appClientId: string;
  useWebChatMode: boolean;
  directConnectUrl: string;
}

export default class LearnAgentWebPart extends BaseClientSideWebPart<ILearnAgentWebPartProps> {

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';

  public render(): void {
    try {
      const element: React.ReactElement<ILearnAgentCombinedProps> = React.createElement(
        LearnAgentCombined,
        {
          isDarkTheme: this._isDarkTheme,
          environmentMessage: this._environmentMessage,
          hasTeamsContext: !!this.context.sdks.microsoftTeams,
          userDisplayName: this.context.pageContext.user.displayName,
          userEmail: this.context.pageContext.user.email || '',
          environmentId: this.properties.environmentId || '',
          agentIdentifier: this.properties.agentIdentifier || '',
          tenantId: this.properties.tenantId || '',
          appClientId: this.properties.appClientId || '',
          useWebChatMode: !!this.properties.useWebChatMode,
          directConnectUrl: this.properties.directConnectUrl || ''
        }
      );

      ReactDom.render(element, this.domElement);
    } catch (error) {
      console.error('Error rendering LearnAgentWebPart:', error);
      this.domElement.innerHTML = `
        <div style="padding: 20px; border: 2px solid red; background: #ffe6e6; border-radius: 8px;">
          <h3>Web Part Error</h3>
          <p>There was an error loading the Microsoft Learn Agent web part.</p>
          <p><strong>Error:</strong> ${error instanceof Error ? error.message : 'Unknown error'}</p>
          <p>Please check the browser console for more details.</p>
        </div>
      `;
    }
  }

  protected onInit(): Promise<void> {
    // Set default values for properties if not already set
    if (this.properties.useWebChatMode === undefined) {
      this.properties.useWebChatMode = false;
    }
    if (!this.properties.directConnectUrl) {
      this.properties.directConnectUrl = '';
    }
    if (!this.properties.environmentId) {
      this.properties.environmentId = '';
    }
    if (!this.properties.agentIdentifier) {
      this.properties.agentIdentifier = '';
    }
    if (!this.properties.tenantId) {
      this.properties.tenantId = '';
    }
    if (!this.properties.appClientId) {
      this.properties.appClientId = '';
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
                PropertyPaneToggle('useWebChatMode', {
                  label: 'Use WebChat Mode',
                  onText: 'WebChat',
                  offText: 'Custom UI'
                }),
                PropertyPaneTextField('environmentId', {
                  label: 'Environment ID'
                }),
                PropertyPaneTextField('agentIdentifier', {
                  label: 'Agent Identifier'
                }),
                PropertyPaneTextField('tenantId', {
                  label: 'Tenant ID'
                }),
                PropertyPaneTextField('appClientId', {
                  label: 'App Client ID'
                }),
                PropertyPaneTextField('directConnectUrl', {
                  label: 'Direct Connect URL (optional)'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
