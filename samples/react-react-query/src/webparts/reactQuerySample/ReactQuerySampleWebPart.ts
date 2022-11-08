import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'ReactQuerySampleWebPartStrings';
import ReactQuerySample from './components/ReactQuerySample';
import { IReactQuerySampleProps } from './components/IReactQuerySampleProps';
import { BatchGraphClient, IHttpClient, SPFxGraphHttpClient } from 'mgwdev-m365-helpers';
import { ContextProvider } from '../../infrastructure/ContextProvider';

export interface IReactQuerySampleWebPartProps {
  description: string;
}

export default class ReactQuerySampleWebPart extends BaseClientSideWebPart<IReactQuerySampleWebPartProps> {

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';
  protected graphClient: IHttpClient;

  public render(): void {
    const element: React.ReactElement<IReactQuerySampleProps> = React.createElement(
      ReactQuerySample,
      {
        description: this.properties.description,
        isDarkTheme: this._isDarkTheme,
        environmentMessage: this._environmentMessage,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        userDisplayName: this.context.pageContext.user.displayName,
        graphClient: this.graphClient
      }
    );
    const appContext = ContextProvider({ children: element, graphClient: this.graphClient})
    ReactDom.render(appContext, this.domElement);
  }

  protected async onInit(): Promise<void> {
    this._environmentMessage = this._getEnvironmentMessage();
    this.graphClient = new BatchGraphClient(new SPFxGraphHttpClient(await this.context.aadHttpClientFactory.getClient("https://graph.microsoft.com")))
    return await super.onInit();
  }

  private _getEnvironmentMessage(): string {
    if (!!this.context.sdks.microsoftTeams) { // running in Teams
      return this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentTeams : strings.AppTeamsTabEnvironment;
    }

    return this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentSharePoint : strings.AppSharePointEnvironment;
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
