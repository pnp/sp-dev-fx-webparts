import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  BaseClientSideWebPart,
  IPropertyPaneSettings,
  IWebPartContext,
  PropertyPaneTextField,
  PropertyPaneSlider
} from '@microsoft/sp-client-preview';

import * as strings from 'trendingInTheSitesIFollowStrings';
import TrendingInTheSitesIFollow, { ITrendingInTheSitesIFollowProps } from './components/TrendingInTheSitesIFollow';
import { ITrendingInTheSitesIFollowWebPartProps } from './ITrendingInTheSitesIFollowWebPartProps';

export default class TrendingInTheSitesIFollowWebPart extends BaseClientSideWebPart<ITrendingInTheSitesIFollowWebPartProps> {

  public constructor(context: IWebPartContext) {
    super(context);
  }

  public render(): void {
    const element: React.ReactElement<ITrendingInTheSitesIFollowProps> = React.createElement(TrendingInTheSitesIFollow, {
      title: this.properties.title,
      numberOfDocuments: this.properties.numberOfDocuments,
      httpClient: this.context.httpClient,
      siteUrl: this.context.pageContext.web.absoluteUrl
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
              groupName: strings.ViewGroupName,
              groupFields: [
                PropertyPaneTextField('title', {
                  label: strings.TitleFieldLabel
                }),
                PropertyPaneSlider('numberOfDocuments', {
                  label: strings.NumberOfDocumentsFieldLabel,
                  min: 1,
                  max: 10,
                  step: 1
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
