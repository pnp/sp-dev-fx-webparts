import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  BaseClientSideWebPart,
  IPropertyPaneSettings,
  IWebPartContext,
  PropertyPaneTextField
} from '@microsoft/sp-client-preview';

import * as strings from 'reactCrudStrings';
import ReactCrud, { IReactCrudProps } from './components/ReactCrud';
import { IReactCrudWebPartProps } from './IReactCrudWebPartProps';

export default class ReactCrudWebPart extends BaseClientSideWebPart<IReactCrudWebPartProps> {

  public constructor(context: IWebPartContext) {
    super(context);
  }

  public render(): void {
    const element: React.ReactElement<IReactCrudProps> = React.createElement(ReactCrud, {
      httpClient: this.context.httpClient,
      siteUrl: this.context.pageContext.web.absoluteUrl,
      listName: this.properties.listName
    });

    ReactDom.render(element, this.domElement);
  }

  protected get propertyPaneSettings(): IPropertyPaneSettings {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.DataGroupName,
              groupFields: [
                PropertyPaneTextField('listName', {
                  label: strings.ListNameFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
