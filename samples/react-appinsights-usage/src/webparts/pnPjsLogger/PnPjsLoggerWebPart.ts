import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'PnPjsLoggerWebPartStrings';
import PnPjsLogger from './components/PnPjsLogger';
import { IPnPjsLoggerProps } from './components/IPnPjsLoggerProps';
import { ApplicationInsights, DistributedTracingModes, ITelemetryItem } from '@microsoft/applicationinsights-web';
import { ConsoleListener, LogLevel, Logger } from '@pnp/logging';
import { AppInsightListener } from './listener/appinsight-loglistener';
import { AIConnectionString } from '../../EnvProps';

export interface IPnPjsLoggerWebPartProps {
  description: string;
}

export default class PnPjsLoggerWebPart extends BaseClientSideWebPart<IPnPjsLoggerWebPartProps> {

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';
  private _appInsights: ApplicationInsights;
  
  public render(): void {
    const element: React.ReactElement<IPnPjsLoggerProps> = React.createElement(
      PnPjsLogger,
      {
        description: this.properties.description,
        isDarkTheme: this._isDarkTheme,
        environmentMessage: this._environmentMessage,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        userDisplayName: this.context.pageContext.user.displayName
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onInit(): Promise<void> {
    const allAsynCalls = []
    allAsynCalls.push(this._getEnvironmentMessage().then(message => {
      this._environmentMessage = message;
    })
    )

    const userId: string = this.context.pageContext.user.loginName.replace(/([\\|:;=])/g, '');

    // App Insights JS Documentation: https://github.com/microsoft/applicationinsights-js
    this._appInsights = new ApplicationInsights({
      config: {
        connectionString: AIConnectionString,
        accountId: userId,
        disableFetchTracking: false,
        enableRequestHeaderTracking: true,
        enableResponseHeaderTracking: true,
        enableAjaxErrorStatusText: true,
        enableAjaxPerfTracking: true,
        enableUnhandledPromiseRejectionTracking: true,
        enableCorsCorrelation: true,
        disableExceptionTracking: false,
        distributedTracingMode: DistributedTracingModes.AI
      }
    });

    this._appInsights.loadAppInsights();
    this._appInsights.addTelemetryInitializer(this._appInsightsInitializer);
    this._appInsights.setAuthenticatedUserContext(userId, userId, true);
    this._appInsights.trackPageView();

    Logger.subscribe(new AppInsightListener(this._appInsights));
    Logger.subscribe( ConsoleListener("pnpjs"));
    Logger.activeLogLevel =  LogLevel.Info;

    return Promise.all(allAsynCalls).then(() => {
      return super.onInit();
    });
  }

  private _appInsightsInitializer = (telemetryItem: ITelemetryItem): boolean | void => {
    if (telemetryItem) {
      if (!telemetryItem.tags) telemetryItem.tags = {};
      telemetryItem.tags['ai.cloud.role'] = "app-insights-spfx-webparts";
      telemetryItem.tags['ai.cloud.roleInstance'] = "PnPjsLoggerWebPart";

      if (telemetryItem.baseType === 'RemoteDependencyData' && telemetryItem.baseData?.target) {
        const isExcluded = telemetryItem.baseData.target.toLowerCase().indexOf('my_un_monitored_api ') !== -1;
        if (isExcluded) return false; // don't track
      }
    }
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
