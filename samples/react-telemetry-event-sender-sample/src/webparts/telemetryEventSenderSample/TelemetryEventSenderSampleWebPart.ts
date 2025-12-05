import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneToggle,
  PropertyPaneDropdown,
  type IPropertyPaneDropdownOption
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'TelemetryEventSenderSampleWebPartStrings';
import TelemetryEventSenderSample from './components/TelemetryEventSenderSample';
import { ITelemetryEventSenderSampleProps } from './components/ITelemetryEventSenderSampleProps';

export interface ITelemetryEventSenderSampleWebPartProps {
  description: string;
  scenarioName: string;
  importance: string;
  enableTelemetry: boolean;
}

export default class TelemetryEventSenderSampleWebPart
  extends BaseClientSideWebPart<ITelemetryEventSenderSampleWebPartProps> {

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';

  public render(): void {
    const element: React.ReactElement<ITelemetryEventSenderSampleProps> = React.createElement(
      TelemetryEventSenderSample,
      {
        description: this.properties.description,
        scenarioName: this.properties.scenarioName,
        importance: this.properties.importance,
        enableTelemetry: this.properties.enableTelemetry,
        isDarkTheme: this._isDarkTheme,
        environmentMessage: this._environmentMessage,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        userDisplayName: this.context.pageContext.user.displayName,
        // allow the React component to fire telemetry events as well
        onSendTelemetry: (eventName: string, extra?: Record<string, unknown>) =>
          this._sendTelemetry(eventName, extra)
      }
    );

    ReactDom.render(element, this.domElement);

    // Example: track render event
    this._sendTelemetry('TelemetrySampleWebPart_Render', {
      environment: this._environmentMessage
    });


  }

  protected onInit(): Promise<void> {
    return this._getEnvironmentMessage().then(message => {
      this._environmentMessage = message;

      // Example: track initialization event
      this._sendTelemetry('TelemetrySampleWebPart_Initialized', {
        environment: this._environmentMessage
      });
    });
  }

  /**
   * Helper that sends a telemetry event to the TenantTelemetryApplicationCustomizer
   * by dispatching a CustomEvent("spfx-telemetry").
   */
  private _sendTelemetry(eventName: string, extra?: Record<string, unknown>): void {
    if (!this.properties.enableTelemetry) {
      return;
    }

    const detail: Record<string, unknown> = {
      eventName,
      componentId: this.context.manifest.id,
      componentName: this.context.manifest.alias,
      componentVersion: this.context.manifest.version,
      scenarioName: this.properties.scenarioName,
      importance: this.properties.importance,
      isServedFromLocalhost: this.context.isServedFromLocalhost,
      siteUrl: this.context.pageContext.web.absoluteUrl,
      pageUrl: window.location.href,
      ...extra
    };

    // Just for demo purposes, log the telemetry event to console as well
    console.groupCollapsed(
      `%c[TelemetryEventSenderSampleWebPart] Sending telemetry: %c${eventName}`,
      'color: #605e5c; font-weight: 600;',
      'color: #107c10; font-weight: 600;'
    );
    console.log('Detail payload:', detail);
    console.groupEnd();


    window.dispatchEvent(
      new CustomEvent('spfx-telemetry', { detail })
    );
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

    return Promise.resolve(
      this.context.isServedFromLocalhost
        ? strings.AppLocalEnvironmentSharePoint
        : strings.AppSharePointEnvironment
    );
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    this._isDarkTheme = !!currentTheme.isInverted;
    const { semanticColors } = currentTheme;

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
    const importanceOptions: IPropertyPaneDropdownOption[] = [
      { key: 'Low', text: strings.ImportanceLowLabel || 'Low' },
      { key: 'Normal', text: strings.ImportanceNormalLabel || 'Normal' },
      { key: 'High', text: strings.ImportanceHighLabel || 'High' }
    ];

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
                }),
                PropertyPaneTextField('scenarioName', {
                  label: strings.ScenarioNameFieldLabel,
                  description: strings.ScenarioNameFieldDescription
                }),
                PropertyPaneDropdown('importance', {
                  label: strings.ImportanceFieldLabel,
                  options: importanceOptions
                }),
                PropertyPaneToggle('enableTelemetry', {
                  label: strings.EnableTelemetryFieldLabel,
                  onText: strings.EnableTelemetryOnText,
                  offText: strings.EnableTelemetryOffText
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
