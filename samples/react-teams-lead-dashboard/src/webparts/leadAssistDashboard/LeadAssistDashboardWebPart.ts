import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneButton,
  PropertyPaneButtonType
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'LeadAssistDashboardWebPartStrings';
import LeadAssistDashboard from './components/LeadAssistDashboard';
import { ILeadAssistDashboardProps } from './components/ILeadAssistDashboardProps';
import { Providers, SharePointProvider } from '@microsoft/mgt-spfx';
import { sp } from "@pnp/sp/presets/all";
import DataService from '../../services/DataService';
import { MSGraphClient } from "@microsoft/sp-http";
import SettingsService from '../../services/SettingsService';

export interface ILeadAssistDashboardWebPartProps {
}

export default class LeadAssistDashboardWebPart extends BaseClientSideWebPart<ILeadAssistDashboardWebPartProps> {
  private isTeamsContext: boolean;
  private siteUrl: string;
  private graphClient: MSGraphClient;

  protected async onInit() {
    // Determine if we are in the Teams context
    this.isTeamsContext = !!this.context.sdks.microsoftTeams;

    if (this.isTeamsContext) { 
      const teamsContext = this.context.sdks.microsoftTeams.context;
      this.applyTheme(teamsContext.theme || 'default');
      this.context.sdks.microsoftTeams.teamsJs.registerOnThemeChangeHandler(this.applyTheme);
    }

    // Create the Microsoft Graph client
    this.graphClient = await this.context.msGraphClientFactory.getClient();

    // Get the settings
    const settings = await SettingsService.getSettings(this.graphClient, this.context.httpClient, 'lead_dashboard_settings.json');

    // If there are settings specified
    if (settings) {
      // Get the site URL
      this.siteUrl = settings.siteUrl;
    }

    // If no global provider has been specified
    if (!Providers.globalProvider) {
      // Create a global SharePoint provider
      Providers.globalProvider = new SharePointProvider(this.context);
    }

    // If site url has been specified
    if (this.siteUrl && this.siteUrl.length > 0) {
      // Setup the SharePoint client
      sp.setup({
        spfxContext: this.context,
        sp: {
          baseUrl: this.siteUrl
        }
      });
    }
  }

  private buttonsAreDisabled() {
    return !this.siteUrl || this.siteUrl.length == 0;
  }

  private applyTheme = (theme: string): void => {
    this.context.domElement.setAttribute('data-theme', theme);
    document.body.setAttribute('data-theme', theme);
  }

  public render(): void {    
    const element: React.ReactElement<ILeadAssistDashboardProps> = React.createElement(
      LeadAssistDashboard,
      {
        isTeamsContext: this.isTeamsContext,
        siteUrl: this.siteUrl,
        graphClient: this.graphClient
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  private async generateSharePointDemoListsClick(): Promise<void> {  
    await DataService.generateDemoLists();
  }

  private async generateSharePointDemoDataClick(): Promise<void> {  
    await DataService.generateListsDemoData();
  }

  private async generateGraphDemoDataClick(): Promise<void> {  
    await DataService.generateGraphDemoData();
  }

  private async deleteSharePointDemoListsClick(): Promise<void> {  
    await DataService.deleteSharePointDemoLists();
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
              groupName: strings.GenerateDemoDataGroupName,
              groupFields: [
                PropertyPaneButton('GenerateSharePointDemoLists',
                {
                  text: strings.GenerateSharePointDemoListsButton,
                  buttonType: PropertyPaneButtonType.Normal,
                  onClick: this.generateSharePointDemoListsClick.bind(this),
                  disabled: this.buttonsAreDisabled()
                }),
                PropertyPaneButton('GenerateSharePointDemoData',
                {
                  text: strings.GenerateSharePointDemoDataButton,
                  buttonType: PropertyPaneButtonType.Normal,
                  onClick: this.generateSharePointDemoDataClick.bind(this),
                  disabled: this.buttonsAreDisabled()
                }),
                PropertyPaneButton('GenerateGraphDemoData',
                {
                  text: strings.GenerateGraphDemoDataButton,
                  buttonType: PropertyPaneButtonType.Normal,
                  onClick: this.generateGraphDemoDataClick.bind(this),
                  disabled: this.buttonsAreDisabled()
                })
              ]
            },
            {
              groupName: strings.CleanDemoDataGroupName,
              groupFields: [
                PropertyPaneButton('DeleteSharePointDemoLists',
                {
                  text: strings.DeleteDemoDataButton,
                  buttonType: PropertyPaneButtonType.Normal,
                  onClick: this.deleteSharePointDemoListsClick.bind(this),
                  disabled: this.buttonsAreDisabled()
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
