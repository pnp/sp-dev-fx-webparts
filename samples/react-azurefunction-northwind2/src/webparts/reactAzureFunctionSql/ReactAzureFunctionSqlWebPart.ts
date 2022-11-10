import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneDropdown
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'ReactAzureFunctionSqlWebPartStrings';
import ReactAzureFunctionSql from './components/ReactAzureFunctionSql';
import { IReactAzureFunctionSqlProps } from './components/IReactAzureFunctionSqlProps';
export interface IReactAzureFunctionSqlWebPartProps {
  description: string;
  authtype: string;
  functurl: string;
}

export default class ReactAzureFunctionSqlWebPart extends BaseClientSideWebPart<IReactAzureFunctionSqlWebPartProps> {

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';

  public render(): void {
    const element: React.ReactElement<IReactAzureFunctionSqlProps> = React.createElement(
      ReactAzureFunctionSql,
      {
        description: this.properties.description,
        funcurl: this.properties.functurl,
        isDarkTheme: this._isDarkTheme,
        environmentMessage: this._environmentMessage,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        userDisplayName: this.context.pageContext.user.displayName,
        httpclient:this.context.httpClient
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onInit(): Promise<void> {
    this._environmentMessage = this._getEnvironmentMessage();

    return super.onInit();
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

  protected get disableReactivePropertyChanges(): boolean {
    return true;
  }

  protected onAfterPropertyPaneChangesApplied(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
    this.render();
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    let authEnable: any;

    if (this.properties.authtype !== "2") {
      authEnable =  PropertyPaneTextField('functurl', {
        label: strings.FunctionUrl
      })
    } else {
      authEnable =  PropertyPaneTextField('functurl', {
        disabled: true,
        label: strings.FunctionUrl,
      })
    }

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
                PropertyPaneDropdown('authtype', {
                  label: strings.AuthLabel,
                  options: [
                    { key: '1', text: 'No Authentication'},
                    { key: '2', text: 'aadHttpClientFactory' }
                  ],
                  selectedKey: '1',
                }),
                authEnable
              ]
            }
          ]
        }
      ]
    };
  }
}
