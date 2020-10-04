import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';


import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IPropertyPaneConfiguration, PropertyPaneTextField, PropertyPaneSlider } from "@microsoft/sp-property-pane";

import * as strings from 'YoutubeWebPartStrings';
import Youtube from './components/Youtube';
import { IYoutubeProps } from './components/IYoutubeProps';

export interface IYoutubeWebPartProps {
  description: string;
  apiKey: string;
  channelId: string;
  maxResults: number;
}

export default class YoutubeWebPart extends BaseClientSideWebPart<IYoutubeWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IYoutubeProps > = React.createElement(
      Youtube,
      {
        description: this.properties.description,
        apiKey: this.properties.apiKey,
        channelId: this.properties.channelId,
        maxResults: this.properties.maxResults
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
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneTextField('apiKey', {
                  label: strings.ApiKeyFieldLabel
                }),
                PropertyPaneTextField('channelId', {
                  label: strings.ChannelIdFieldLabel
                }),
                PropertyPaneSlider('maxResults', {
                  label: strings.MaxResults,
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
