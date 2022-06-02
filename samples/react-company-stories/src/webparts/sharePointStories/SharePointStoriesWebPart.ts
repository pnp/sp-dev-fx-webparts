import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'SharePointStoriesWebPartStrings';
import SharePointStories from './components/SharePointStories';
import { ISharePointStoriesProps } from './components/ISharePointStoriesProps';

import { Providers, SharePointProvider } from '@microsoft/mgt-spfx';

export interface ISharePointStoriesWebPartProps {
  description: string;
}

export default class SharePointStoriesWebPart extends BaseClientSideWebPart<ISharePointStoriesWebPartProps> {

  protected async onInit(): Promise<void> {
    if (!Providers.globalProvider) {
      Providers.globalProvider = new SharePointProvider(this.context);
    }
  }

  public render(): void {
    const element: React.ReactElement<ISharePointStoriesProps> = React.createElement(
      SharePointStories,
      {
        webpartContext: this.context
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
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
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
