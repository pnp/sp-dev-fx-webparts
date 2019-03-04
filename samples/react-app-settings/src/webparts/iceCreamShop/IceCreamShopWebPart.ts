import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'IceCreamShopWebPartStrings';
import IceCreamShop from './components/IceCreamShop';
import { IIceCreamShopProps } from './components/IIceCreamShopProps';

export interface IIceCreamShopWebPartProps {
  description: string;
}

export default class IceCreamShopWebPart extends BaseClientSideWebPart<IIceCreamShopWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IIceCreamShopProps > = React.createElement(
      IceCreamShop,
      {
        description: this.properties.description
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
