import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneToggle
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'McpClientWebPartStrings';
import McpClientView from './components/McpClientView';
import { IMcpClientProps } from './components/IMcpClientProps';

export interface IMcpClientWebPartProps {
  endpointUrl: string;
  useMockServer: boolean;
  aadResourceUri: string;
}

export default class McpClientWebPart extends BaseClientSideWebPart<IMcpClientWebPartProps> {
  private _hasTeamsContext: boolean = false;
  private _getToken: (() => Promise<string | undefined>) | undefined = undefined;

  /**
   * Acquires an access token for the signed-in user from the SPFx AAD token
   * provider. Nothing secret reaches browser code: the token is short lived and
   * scoped to the resource the tenant administrator approved.
   *
   * Stable identity, so the React memo that builds the client is not
   * invalidated on every render.
   */
  private _buildTokenProvider(): void {
    this._getToken = async (): Promise<string | undefined> => {
      const resource = this.properties.aadResourceUri;
      if (!resource) {
        return undefined;
      }
      const provider = await this.context.aadTokenProviderFactory.getTokenProvider();
      return provider.getToken(resource);
    };
  }

  public render(): void {
    const element: React.ReactElement<IMcpClientProps> = React.createElement(McpClientView, {
      endpointUrl: this.properties.endpointUrl || '',
      useMockServer: this.properties.useMockServer !== false,
      aadResourceUri: this.properties.aadResourceUri || '',
      getToken: this._getToken,
      hasTeamsContext: this._hasTeamsContext
    });

    ReactDom.render(element, this.domElement);
  }

  protected onInit(): Promise<void> {
    this._hasTeamsContext = !!this.context.sdks.microsoftTeams;
    this._buildTokenProvider();
    return Promise.resolve();
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

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
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.ServerGroupName,
              groupFields: [
                PropertyPaneToggle('useMockServer', {
                  label: strings.UseMockServerFieldLabel,
                  onText: strings.MockOn,
                  offText: strings.MockOff
                }),
                PropertyPaneTextField('endpointUrl', {
                  label: strings.EndpointFieldLabel,
                  description: strings.EndpointFieldDescription,
                  disabled: this.properties.useMockServer !== false
                }),
                PropertyPaneTextField('aadResourceUri', {
                  label: strings.AadResourceFieldLabel,
                  description: strings.AadResourceFieldDescription,
                  disabled: this.properties.useMockServer !== false
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
