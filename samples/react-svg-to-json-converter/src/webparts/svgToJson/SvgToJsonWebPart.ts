import * as React from 'react';
import * as ReactDom from 'react-dom';
import { IPropertyPaneConfiguration, PropertyPaneTextField } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import SvgToJson from './components/SvgToJson';
import { ISvgToJsonProps } from './components/ISvgToJsonProps';

export interface ISvgToJsonWebPartProps {
  siteUrl: string;
  libraryName: string;
}

export default class SvgToJsonWebPart extends BaseClientSideWebPart<ISvgToJsonWebPartProps> {
  public render(): void {
    if (!this.properties.siteUrl || !this.properties.libraryName) {
      this.domElement.innerHTML = `
        <div>
          Please select the edit icon to configure your Web Part.
        </div>`;
      return;
    }

    const element: React.ReactElement<ISvgToJsonProps> = React.createElement(
      SvgToJson,
      {
        siteUrl: this.properties.siteUrl,
        libraryName: this.properties.libraryName,
        isDarkTheme: this.context.sdks.microsoftTeams ? this.context.sdks.microsoftTeams.context.theme === 'dark' : false,
        environmentMessage: this._getEnvironmentMessage(),
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        userDisplayName: this.context.pageContext.user.displayName
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: "Configure your web part by providing the Site URL and library name you want your SVGs to select from."
          },
          groups: [
            {
              groupName: "Settings",
              groupFields: [
                PropertyPaneTextField('siteUrl', {
                  label: "Site URL"
                }),
                PropertyPaneTextField('libraryName', {
                  label: "Library Name"
                })
              ]
            }
          ]
        }
      ]
    };
  }

  private _getEnvironmentMessage(): string {
    if (!!this.context.sdks.microsoftTeams) { // running in Teams
      return this.context.isServedFromLocalhost ? 'Local environment (Teams)' : 'Teams tab';
    }

    return this.context.isServedFromLocalhost ? 'Local environment (SharePoint)' : 'SharePoint';
  }
}