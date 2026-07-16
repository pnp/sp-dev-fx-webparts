import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { IPropertyPaneConfiguration, PropertyPaneTextField, PropertyPaneToggle } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import McpClient from './components/McpClient';
import { IMcpClientProps } from './components/IMcpClientProps';

export interface IMcpClientWebPartProps {
  webPartTitle: string;
  bridgeUrl: string;
  defaultServerCommand: string;
  defaultServerArgs: string;
  autoConnect: boolean;
}

export default class McpClientWebPart extends BaseClientSideWebPart<IMcpClientWebPartProps> {
  private _isDarkTheme: boolean = false;

  public render(): void {
    const element: React.ReactElement<IMcpClientProps> = React.createElement(
      McpClient,
      {
        bridgeUrl: this.properties.bridgeUrl,
        defaultServerCommand: this.properties.defaultServerCommand,
        defaultServerArgs: this.properties.defaultServerArgs,
        isDarkTheme: this._isDarkTheme,
        webPartTitle: this.properties.webPartTitle,
        autoConnect: this.properties.autoConnect
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    this._isDarkTheme = !!currentTheme?.isInverted;
    this.render();
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [{
        header: { description: 'MCP Client settings' },
        groups: [{
          groupName: 'Connection',
          groupFields: [
            PropertyPaneTextField('webPartTitle', { label: 'Web part title' }),
            PropertyPaneTextField('bridgeUrl', { label: 'Bridge URL' }),
            PropertyPaneTextField('defaultServerCommand', { label: 'Default server command' }),
            PropertyPaneTextField('defaultServerArgs', { label: 'Default server arguments' }),
            PropertyPaneToggle('autoConnect', { label: 'Connect automatically' }),
          ]
        }]
      }]
    };
  }
}
