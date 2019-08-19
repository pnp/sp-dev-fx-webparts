import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  BaseClientSideWebPart,
  IPropertyPaneSettings,
  IWebPartContext,
  PropertyPaneTextField
} from '@microsoft/sp-client-preview';

import * as strings from 'recentOrdersStrings';
import RecentOrders, { IRecentOrdersProps } from './components/RecentOrders';
import { IRecentOrdersWebPartProps } from './IRecentOrdersWebPartProps';

export default class RecentOrdersWebPart extends BaseClientSideWebPart<IRecentOrdersWebPartProps> {

  public constructor(context: IWebPartContext) {
    super(context);
  }

  public render(): void {
    const element: React.ReactElement<IRecentOrdersProps> = React.createElement(RecentOrders, {
      title: this.properties.title,
      httpClient: this.context.httpClient,
      webPartId: this.context.instanceId
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
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('title', {
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
