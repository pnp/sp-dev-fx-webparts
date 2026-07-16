import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'AzureAiChatStrings';
import AzureAiChat from './components/AzureAiChat';
import { IAzureAiChatProps } from './components/IAzureAiChatProps';

export interface IAzureAiChatWebPartProps {
  connectionString: string;
  agentName: string;
  webPartTitle: string;
}

export default class AzureAiChatWebPart extends BaseClientSideWebPart<IAzureAiChatWebPartProps> {

  private _isDarkTheme: boolean = false;
  public render(): void {
    const element: React.ReactElement<IAzureAiChatProps> = React.createElement(
      AzureAiChat,
      {
        connectionString: this.properties.connectionString,
        agentName: this.properties.agentName,
        webPartTitle: this.properties.webPartTitle,
        isDarkTheme: this._isDarkTheme,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    this._isDarkTheme = !!currentTheme.isInverted;
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
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
                PropertyPaneTextField('connectionString', { label: strings.ConnectionStringFieldLabel }),
                PropertyPaneTextField('agentName', { label: strings.AgentNameFieldLabel }),
                PropertyPaneTextField('webPartTitle', { label: strings.WebPartTitleFieldLabel })
              ]
            }
          ]
        }
      ]
    };
  }
}
