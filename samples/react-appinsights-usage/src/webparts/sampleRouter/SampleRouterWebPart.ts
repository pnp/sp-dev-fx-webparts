import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'SampleRouterWebPartStrings';
import SampleRouter from './components/SampleRouter';
import { ISampleRouterProps } from './components/ISampleRouterProps';

import { ApplicationInsights, ITelemetryItem } from '@microsoft/applicationinsights-web';
import { ReactPlugin } from '@microsoft/applicationinsights-react-js';
import { AIConnectionString } from '../../EnvProps';



export interface ISampleRouterWebPartProps {
  description: string;
}

export default class SampleRouterWebPart extends BaseClientSideWebPart<ISampleRouterWebPartProps> {

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';
  

  public render(): void {
    const element: React.ReactElement<ISampleRouterProps> = React.createElement(
      SampleRouter,
      {
        description: this.properties.description,
        isDarkTheme: this._isDarkTheme,
        environmentMessage: this._environmentMessage,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        userDisplayName:this.context.pageContext.user.displayName
        
      }
    );
    const userId: string = this.context.pageContext.user.loginName.replace(/([\\|:;=])/g, '');

    const reactPlugin = new ReactPlugin();
    const appInsights = new ApplicationInsights({
        config: {
            connectionString: AIConnectionString,
            accountId: userId,
            extensions: [reactPlugin],
            enableAutoRouteTracking: true,
            autoTrackPageVisitTime: true,
        }
    });
    appInsights.loadAppInsights();
    appInsights.addTelemetryInitializer((telemetryItem: ITelemetryItem) => {
      if (telemetryItem) {
        if (!telemetryItem.tags) telemetryItem.tags = {};
        telemetryItem.tags['ai.cloud.role'] = "app-insights-spfx-webparts";
        telemetryItem.tags['ai.cloud.roleInstance'] = "SampleRouterWebPart";
      }
    });
    appInsights.setAuthenticatedUserContext(userId, userId, true);
    appInsights.trackPageView();
    
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


