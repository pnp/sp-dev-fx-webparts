import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'AbTestWebPartStrings';
import AbTest from './components/AbTest';
import { IAbTestProps } from './components/IAbTestProps';
import { ApplicationInsights, DistributedTracingModes, ITelemetryItem, SeverityLevel } from '@microsoft/applicationinsights-web';
import { AIConnectionString } from '../../EnvProps';
import { AILogLevel, IAILogEntry } from './components/IAILogEntry';

export interface IAbTestWebPartProps {
  description: string;
}

export default class AbTestWebPart extends BaseClientSideWebPart<IAbTestWebPartProps> {

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';
  private _appInsights: ApplicationInsights;

  public render(): void {

    const element: React.ReactElement<IAbTestProps> = React.createElement(
      AbTest,
      {
        description: this.properties.description,
        isDarkTheme: this._isDarkTheme,
        environmentMessage: this._environmentMessage,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        userDisplayName: this.context.pageContext.user.displayName,
        trackEvent: (eventName: string, properties?: { [key: string]: string }) =>
          this._appInsights.trackEvent({ name: eventName }, properties),
        log: this.log.bind(this)  
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

    return Promise.all(allAsynCalls).then(() => {
      return super.onInit();
    });
  }

  private _appInsightsInitializer = (telemetryItem: ITelemetryItem): boolean | void => {
    if (telemetryItem) {
      if (!telemetryItem.tags) telemetryItem.tags = {};
      telemetryItem.tags['ai.cloud.role'] = "app-insights-spfx-webparts";
      telemetryItem.tags['ai.cloud.roleInstance'] = "ABTestWebPart";

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

  private _logMessageFormat(entry: IAILogEntry): string {
    //  const date = entry.timestamp ? entry.timestamp.toISOString() : new Date().toISOString();
    const msg = `${entry.message}`;
    return msg;
  }

  private getAdditionalProperties(): { [key: string]: string } {
    return {};
  }

  private log(entry: IAILogEntry): void {
    const msg = this._logMessageFormat(entry);
    if (entry.level === AILogLevel.Off) {
      // No log required since the level is Off
      return;
    }
    const additionalProperties =  {...this.getAdditionalProperties(),...entry.properties};

    if (this._appInsights) {
      switch (entry.level) {
        case AILogLevel.Verbose:
          this._appInsights.trackTrace({ message: msg, severityLevel: SeverityLevel.Verbose }, additionalProperties);
          console.log({ ...additionalProperties, Message: msg });
          break;
        case AILogLevel.Info:
          this._appInsights.trackTrace({ message: msg, severityLevel: SeverityLevel.Information }, additionalProperties);
          console.log({ ...additionalProperties, Message: msg });
          break;
        case AILogLevel.Warning:
          this._appInsights.trackTrace({ message: msg, severityLevel: SeverityLevel.Warning }, additionalProperties);
          console.warn({ ...additionalProperties, Message: msg });
          break;
        case AILogLevel.Error:
          this._appInsights.trackException({ error: new Error(msg), exception: entry.exception, severityLevel: SeverityLevel.Error },additionalProperties);
          console.error({ ...additionalProperties, Message: msg });
          break;
      }
    }
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
