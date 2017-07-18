import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'demoStrings';
import Demo from './components/Demo';
import { IDemoProps } from './components/IDemoProps';
import { IDemoWebPartProps } from './IDemoWebPartProps';

import {}

export default class DemoWebPart extends BaseClientSideWebPart<IDemoWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IDemoProps > = React.createElement(
      Demo,
      {
        description: this.properties.description
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
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel,
                  validateOnFocusOut: true,
                  onGetErrorMessage: this._validateTitleAsync.bind(this)
                })
              ]
            }
          ]
        }
      ]
    };
  }

  private _validateTitleAsync(value: string): Promise<string> {
    return this.context.spHttpClient.get(`${this.context.pageContext.web.absoluteUrl}/_api/web/title`, SPHttpClient.)
      .then((response: Response) => {
        return response.json().then((responseJSON) => {
          // If validation is not successful, return a Promise<string> with error message.
          if (responseJSON.value.toLowerCase() === value.toLowerCase()) {
            return "Title cannot be the same as the SharePoint site title";
          }
          else {
            // If validation is successful, return a Promise<string> with empty string.
            return "";
          }
        });
      });
  }
}
