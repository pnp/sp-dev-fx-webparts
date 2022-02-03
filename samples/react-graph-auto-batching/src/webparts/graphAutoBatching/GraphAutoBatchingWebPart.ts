import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'GraphAutoBatchingWebPartStrings';
import GraphAutoBatching from './components/GraphAutoBatching';
import { IGraphAutoBatchingProps } from './components/IGraphAutoBatchingProps';
import { IHttpClient } from '../../dal/http/IHttpClient';
import { SPFxHttpClient } from '../../dal/http/SPFxHttpClient';
import { BatchGraphClient } from '../../dal/http/BatchGraphClient';

export interface IGraphAutoBatchingWebPartProps {
  description: string;
}

export default class GraphAutoBatchingWebPart extends BaseClientSideWebPart<IGraphAutoBatchingWebPartProps> {
  protected httpClient: IHttpClient;

  protected async onInit(): Promise<void> {
    let client = await this.context.aadHttpClientFactory.getClient('https://graph.microsoft.com');
    this.httpClient = new BatchGraphClient(new SPFxHttpClient(client));
  }

  public render(): void {
    const element: React.ReactElement<IGraphAutoBatchingProps> = React.createElement(
      GraphAutoBatching,
      {
        graphClient: this.httpClient
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
