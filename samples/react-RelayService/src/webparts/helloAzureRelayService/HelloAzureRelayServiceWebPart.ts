import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'HelloAzureRelayServiceWebPartStrings';
import HelloAzureRelayService from './components/HelloAzureRelayService';
import { IHelloAzureRelayServiceProps } from './components/IHelloAzureRelayServiceProps';
import { HttpClient, IHttpClientOptions, HttpClientResponse } from '@microsoft/sp-http';

export interface IHelloAzureRelayServiceWebPartProps {
  description: string;
}

export default class HelloAzureRelayServiceWebPart extends BaseClientSideWebPart<IHelloAzureRelayServiceWebPartProps> {
  private results: Array<any>;
  public onInit(): Promise<any> {
    debugger;
    const requestHeaders: Headers = new Headers();
    requestHeaders.append('Content-type', 'application/json');
    requestHeaders.append('Cache-Control', 'no-cache');
    const httpClientOptions: IHttpClientOptions = {

      headers: requestHeaders
    };

    const url = "https://relayserviceproxy20180831034031.azurewebsites.net/api/Document?webID=917E82F1-FDF8-4298-AE73-1DD60E244C67";
    return this.context.httpClient.get(url, HttpClient.configurations.v1, httpClientOptions).then((response) => {
      response.json().then((r => {
        debugger;
        this.results = r;
      }))
    }).catch((err) => {
      console.log(err);
    })
  }
  public render(): void {
    const element: React.ReactElement<IHelloAzureRelayServiceProps> = React.createElement(
      HelloAzureRelayService,
      {
        description: this.properties.description,
        documents: this.results
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
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
