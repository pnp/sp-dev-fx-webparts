import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'upcomingMeetingsStrings';
import UpcomingMeetings from './components/UpcomingMeetings';
import { IUpcomingMeetingsProps } from './components/IUpcomingMeetingsProps';
import { IUpcomingMeetingsWebPartProps } from './IUpcomingMeetingsWebPartProps';

export default class UpcomingMeetingsWebPart extends BaseClientSideWebPart<IUpcomingMeetingsWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IUpcomingMeetingsProps> = React.createElement(
      UpcomingMeetings,
      {
        httpClient: this.context.httpClient,
        title: this.properties.title,
        webPartId: this.context.instanceId
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
              groupName: strings.ViewGroupName,
              groupFields: [
                PropertyPaneTextField('title', {
                  label: strings.TitleFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
