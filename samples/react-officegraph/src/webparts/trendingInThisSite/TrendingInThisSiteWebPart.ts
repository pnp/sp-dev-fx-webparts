import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  BaseClientSideWebPart,
  IPropertyPaneSettings,
  IWebPartContext,
  PropertyPaneSlider
} from '@microsoft/sp-client-preview';

import * as strings from 'trendingInThisSiteStrings';
import TrendingInThisSite, { ITrendingInThisSiteProps } from './components/TrendingInThisSite';
import { ITrendingInThisSiteWebPartProps } from './ITrendingInThisSiteWebPartProps';

export default class TrendingInThisSiteWebPart extends BaseClientSideWebPart<ITrendingInThisSiteWebPartProps> {

  public constructor(context: IWebPartContext) {
    super(context);
  }

  public render(): void {
    const element: React.ReactElement<ITrendingInThisSiteProps> = React.createElement(TrendingInThisSite, {
      numberOfDocuments: this.properties.numberOfDocuments,
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
