import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  BaseClientSideWebPart,
  IPropertyPaneSettings,
  IWebPartContext,
  PropertyPaneTextField
} from '@microsoft/sp-client-preview';

import * as strings from 'upcomingMeetingsStrings';
import UpcomingMeetings, { IUpcomingMeetingsProps } from './components/UpcomingMeetings';
import { IUpcomingMeetingsWebPartProps } from './IUpcomingMeetingsWebPartProps';

export default class UpcomingMeetingsWebPart extends BaseClientSideWebPart<IUpcomingMeetingsWebPartProps> {

  public constructor(context: IWebPartContext) {
    super(context);
  }

  public render(): void {
    const element: React.ReactElement<IUpcomingMeetingsProps> = React.createElement(UpcomingMeetings, {
      httpClient: this.context.httpClient,
      title: this.properties.title,
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
