import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'RetailDashboardWebPartStrings';
import RetailDashboard from './components/RetailDashboard';
import { IRetailDashboardProps } from './components/IRetailDashboardProps';
import { IRetailDataService } from '../../services/IRetailDataService';
import { ISettingsService } from '../../services/ISettingsService';
import { FakeRetailDataService } from '../../services/FakeRetailDataService';
import { SettingsService } from '../../services/SettingsService';

export interface IRetailDashboardWebPartProps {
}

export default class RetailDashboardWebPart extends BaseClientSideWebPart<IRetailDashboardWebPartProps> {

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';

  private _retailDataService: IRetailDataService; 
  private _settingsService: ISettingsService;

  public render(): void {
    const element: React.ReactElement<IRetailDashboardProps> = React.createElement(
      RetailDashboard,
      {
        retailDataService: this._retailDataService,
        settingsService: this._settingsService,
        isDarkTheme: this._isDarkTheme,
        environmentMessage: this._environmentMessage,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        userDisplayName: this.context.pageContext.user.displayName
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected async onInit(): Promise<void> {

    // Build the service instances and initialize them
    this._retailDataService = this.context.serviceScope.consume(FakeRetailDataService.serviceKey);
    this._settingsService = this.context.serviceScope.consume(SettingsService.serviceKey);

    const packageSolution: any = await require('../../../config/package-solution.json');
    console.log(`React-Retail-Dashboard.RetailDashboardWebPart: v.${packageSolution.solution.version}`);

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
              environmentMessage = this.context.isServedFromLocalhost ? strings.Generic.AppLocalEnvironmentOffice : strings.Generic.AppOfficeEnvironment;
              break;
            case 'Outlook': // running in Outlook
              environmentMessage = this.context.isServedFromLocalhost ? strings.Generic.AppLocalEnvironmentOutlook : strings.Generic.AppOutlookEnvironment;
              break;
            case 'Teams': // running in Teams
              environmentMessage = this.context.isServedFromLocalhost ? strings.Generic.AppLocalEnvironmentTeams : strings.Generic.AppTeamsTabEnvironment;
              break;
            default:
              throw new Error('Unknown host');
          }

          return environmentMessage;
        });
    }

    return Promise.resolve(this.context.isServedFromLocalhost ? strings.Generic.AppLocalEnvironmentSharePoint : strings.Generic.AppSharePointEnvironment);
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
      pages: []
    };
  }
}
