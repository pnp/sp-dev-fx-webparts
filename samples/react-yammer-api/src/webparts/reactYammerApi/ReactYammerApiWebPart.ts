import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'reactYammerApiStrings';
import ReactYammerApi from './components/ReactYammerApi';
import { IReactYammerApiProps } from './components/IReactYammerApiProps';
import { IReactYammerApiWebPartProps } from './IReactYammerApiWebPartProps';

import { IConfiguration } from './yammer/IConfiguration';
import { ProdConfiguration } from './yammer/ProdConfiguration';
import { IYammerProvider } from './yammer/IYammerProvider';
import YammerProvider from './yammer/YammerProvider';

export default class ReactYammerApiWebPart extends BaseClientSideWebPart<IReactYammerApiWebPartProps> {

  public render(): void {
    let config: IConfiguration = new ProdConfiguration();
    let yammerProvider: IYammerProvider = new YammerProvider(config);

    const element: React.ReactElement<IReactYammerApiProps > = React.createElement(
      ReactYammerApi,
      {
        yammer: yammerProvider,
        defaultSearchQuery: this.properties.defaultSearchQuery,
        strings: strings
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
            description: strings.PropertyPaneSearchOptions
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('defaultSearchQuery', {
                  label: strings.DefaultSearchQueryFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
