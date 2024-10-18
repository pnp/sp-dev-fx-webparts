import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'SvgToJsonWebPartStrings';
import SvgToJson from './components/SvgToJson';
import { ISvgToJsonProps } from './components/ISvgToJsonProps';

export interface ISvgToJsonWebPartProps {
  siteUrl: string;
  libraryName: string;
}

export default class SvgToJsonWebPart extends BaseClientSideWebPart<ISvgToJsonWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ISvgToJsonProps> = React.createElement(
      SvgToJson,
      {
        siteUrl: this.properties.siteUrl,
        libraryName: this.properties.libraryName,
        isDarkTheme: this.context.pageContext.legacyPageContext.isDarkTheme,
        environmentMessage: this.context.pageContext.legacyPageContext.environmentMessage,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        userDisplayName: this.context.pageContext.user.displayName,
        context: this.context // Pass the context
      }
    );

    ReactDom.render(element, this.domElement);
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
                PropertyPaneTextField('siteUrl', {
                  label: strings.SiteUrlFieldLabel
                }),
                PropertyPaneTextField('libraryName', {
                  label: strings.LibraryNameFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}