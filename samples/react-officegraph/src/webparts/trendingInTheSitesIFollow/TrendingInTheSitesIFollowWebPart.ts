import { Version } from '@microsoft/sp-core-library';
import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  IWebPartContext,
  PropertyPaneSlider

} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import * as strings from 'trendingInTheSitesIFollowStrings';
import TrendingInTheSitesIFollow, { ITrendingInTheSitesIFollowProps } from './components/TrendingInTheSitesIFollow';
import { ITrendingInTheSitesIFollowWebPartProps } from './ITrendingInTheSitesIFollowWebPartProps';

export default class TrendingInTheSitesIFollowWebPart extends BaseClientSideWebPart<ITrendingInTheSitesIFollowWebPartProps> {

  public constructor(context: IWebPartContext) {
    super();
  }

  public render(): void {
    const element: React.ReactElement<ITrendingInTheSitesIFollowProps> = React.createElement(TrendingInTheSitesIFollow, {
      title: this.properties.title,
      numberOfDocuments: this.properties.numberOfDocuments,
      httpClient: this.context.spHttpClient,
      siteUrl: this.context.pageContext.web.absoluteUrl
    });

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
