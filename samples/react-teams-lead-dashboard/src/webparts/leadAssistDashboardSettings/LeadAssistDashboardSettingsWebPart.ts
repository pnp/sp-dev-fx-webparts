import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { sp } from "@pnp/sp/presets/all";
import * as strings from 'LeadAssistDashboardSettingsWebPartStrings';
import LeadAssistDashboardSettings from './components/LeadAssistDashboardSettings';
import { ILeadAssistDashboardSettingsProps } from './components/ILeadAssistDashboardSettingsProps';
import SettingsService from '../../services/SettingsService';

export interface ILeadAssistDashboardSettingsWebPartProps {
}

export default class LeadAssistDashboardSettingsWebPart extends BaseClientSideWebPart<ILeadAssistDashboardSettingsWebPartProps> {
  private siteUrl: string;

  protected async onInit() {
    if (this.context.sdks.microsoftTeams != undefined) { 
      const teamsContext = this.context.sdks.microsoftTeams.context;
      this.applyTheme(teamsContext.theme || 'default');
      this.context.sdks.microsoftTeams.teamsJs.registerOnThemeChangeHandler(this.applyTheme);
    }

    const graphClient = await this.context.msGraphClientFactory.getClient();

    // Get the settings
    const settings = await SettingsService.getSettings(graphClient, this.context.httpClient, 'lead_dashboard_settings.json');

    // If there are settings specified
    if (settings) {
      // Get the site URL
      this.siteUrl = settings.siteUrl;
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

  private applyTheme = (theme: string): void => {
    this.context.domElement.setAttribute('data-theme', theme);
    document.body.setAttribute('data-theme', theme);
  }

  public render(): void {
    const element: React.ReactElement<ILeadAssistDashboardSettingsProps> = React.createElement(
      LeadAssistDashboardSettings,
      {}
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
              ]
            }
          ]
        }
      ]
    };
  }
}
