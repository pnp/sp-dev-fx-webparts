import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  BaseClientSideWebPart,
  IPropertyPaneSettings,
  IWebPartContext,
  PropertyPaneSlider,
  PropertyPaneTextField
} from '@microsoft/sp-client-preview';

import * as strings from 'myRecentDocumentsStrings';
import MyRecentDocuments, { IMyRecentDocumentsProps } from './components/MyRecentDocuments';
import { IMyRecentDocumentsWebPartProps } from './IMyRecentDocumentsWebPartProps';

export default class MyRecentDocumentsWebPart extends BaseClientSideWebPart<IMyRecentDocumentsWebPartProps> {

  public constructor(context: IWebPartContext) {
    super(context);
  }

  public render(): void {
    const element: React.ReactElement<IMyRecentDocumentsProps> = React.createElement(MyRecentDocuments, {
      numberOfDocuments: this.properties.numberOfDocuments,
      title: this.properties.title,
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
