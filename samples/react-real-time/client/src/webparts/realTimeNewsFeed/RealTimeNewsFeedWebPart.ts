import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  BaseClientSideWebPart,
  IPropertyPaneSettings,
  IWebPartContext,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'realTimeNewsFeedStrings';
import RealTimeNewsFeed, { IRealTimeNewsFeedProps } from './components/RealTimeNewsFeed';
import { IRealTimeNewsFeedWebPartProps } from './IRealTimeNewsFeedWebPartProps';

// Corresponds to the SharePoint site column internal names for a news item
export interface INewsItem {
    Title: string;
    Id: number;
    Description: string,
    PreviewImageUrl: any
}

export interface IList {
    Title: string;
}

export default class RealTimeNewsFeedWebPart extends BaseClientSideWebPart<IRealTimeNewsFeedWebPartProps> {

  public constructor(context: IWebPartContext) {
    super(context);
  }

  public render(): void {
    const element: React.ReactElement<IRealTimeNewsFeedProps> = React.createElement(RealTimeNewsFeed, {
      listTitle: this.properties.listTitle,
      environmentType: this.context.environment.type,
      siteUrl: this.context.pageContext.web.absoluteUrl,
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
                PropertyPaneTextField('listTitle', {
                  label: strings.ListTitleFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
