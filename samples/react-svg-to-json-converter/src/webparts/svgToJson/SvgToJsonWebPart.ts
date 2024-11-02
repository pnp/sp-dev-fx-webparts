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


const validateUrl = (value: string): string => {
  const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
  if (!urlPattern.test(value)) {
    return urlPattern.test(value) ? '' : strings.InvalidUrlErrorMessage;
  }
  return '';
};

// Validate list title format (no special characters or emojis)
const validateListTitle = (value: string): string => {
  const listTitlePattern = /^[a-zA-Z0-9\s]+$/;
  if (!listTitlePattern.test(value)) {
    return listTitlePattern.test(value) ? '' : strings.InvalidListTitleErrorMessage; // Use the localized string here
  }
  return '';
};

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
        context: this.context
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
                    label: strings.SiteUrlFieldLabel, 
                    onGetErrorMessage: validateUrl,
                    deferredValidationTime: 500
                  }),
                  PropertyPaneTextField('libraryName', {
                    label: strings.LibraryNameFieldLabel, 
                    onGetErrorMessage: validateListTitle,
                    deferredValidationTime: 500
                  })
                ]
              }
            ]
          }
        ]
      };
    }
  }