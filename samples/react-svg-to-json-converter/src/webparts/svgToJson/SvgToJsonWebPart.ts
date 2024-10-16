import * as React from 'react';
import * as ReactDom from 'react-dom';

import { IPropertyPaneConfiguration, PropertyPaneTextField } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import SvgToJson from './components/SvgToJson';
import { ISvgToJsonProps } from './components/ISvgToJsonProps';

export interface ISvgToJsonWebPartProps {
  description: string;
}

export default class SvgToJsonWebPart extends BaseClientSideWebPart<ISvgToJsonWebPartProps> {
  public render(): void {
    const element: React.ReactElement<ISvgToJsonProps> = React.createElement(
      SvgToJson,
      {
        description: this.properties.description,
        isDarkTheme: this.context.sdks.microsoftTeams ? this.context.sdks.microsoftTeams.context.theme === 'dark' : false,
        environmentMessage: this._getEnvironmentMessage(),
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        userDisplayName: this.context.pageContext.user.displayName
      }
    );

    ReactDom.render(element, this.domElement);
  }

  private _getEnvironmentMessage(): string {
    if (!!this.context.sdks.microsoftTeams) {
      return this.context.isServedFromLocalhost ? "Running in Microsoft Teams" : "Running in Microsoft Teams";
    }

    return this.context.isServedFromLocalhost ? "Running in SharePoint Online" : "Running in SharePoint Online";
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: "SVG Converter Settings"
          },
          groups: [
            {
              groupName: "Settings",
              groupFields: [
                PropertyPaneTextField('description', {
                  label: 'Description'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
