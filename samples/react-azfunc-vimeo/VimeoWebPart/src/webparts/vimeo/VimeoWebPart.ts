import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  IWebPartEvent,
  WebPartContext
} from '@microsoft/sp-webpart-base';

import * as strings from 'VimeoWebPartStrings';
import Vimeo from './components/Vimeo';
import { IVimeoProps } from './components/IVimeoProps';
import { HttpClient } from '@microsoft/sp-http';


export interface IVimeoWebPartProps {
  VimeoUrl: string;
  httpClient: HttpClient;
  onSave: any;
  properties: any;
  editMode: boolean;
}

export default class VimeoWebPart extends BaseClientSideWebPart<IVimeoWebPartProps> {

  public render(): void {

    const element: React.ReactElement<IVimeoProps> = React.createElement(
      Vimeo,
      {
        VimeoUrl: this.properties.VimeoUrl,
        httpClient: this.context.httpClient,
        onSave: this.onSave,
        properties: this.properties,
        editMode: this.displayMode === 2 ? true : false
      }
    );

    ReactDom.render(element, this.domElement);

  }

  private onSave(item) {

    this.properties.VimeoUrl = item.url;

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
                PropertyPaneTextField('VimeoUrl', {
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
