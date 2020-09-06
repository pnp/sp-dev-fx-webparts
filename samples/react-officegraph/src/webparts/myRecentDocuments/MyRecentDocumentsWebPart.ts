import { Version } from '@microsoft/sp-core-library';
import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  IWebPartContext,
  PropertyPaneSlider,  
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';


import MyRecentDocuments, { IMyRecentDocumentsProps } from './components/MyRecentDocuments';
import * as strings from 'myRecentDocumentsStrings';
import { IMyRecentDocumentsWebPartProps } from './IMyRecentDocumentsWebPartProps';

export default class MyRecentDocumentsWebPart extends BaseClientSideWebPart<IMyRecentDocumentsWebPartProps> {

  public constructor(context: IWebPartContext) {
    super();
  }

  public render(): void {
    const element: React.ReactElement<IMyRecentDocumentsProps> = React.createElement(MyRecentDocuments, {
      numberOfDocuments: this.properties.numberOfDocuments,
      title: this.properties.title,
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
