import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IPropertyPaneConfiguration, PropertyPaneTextField } from "@microsoft/sp-property-pane";

import * as strings from 'IceCreamShopWebPartStrings';
import IceCreamShop from './components/IceCreamShop';
import { IIceCreamShopProps } from './components/IIceCreamShopProps';
import { IceCreamFakeProvider } from './iceCreamProviders/IceCreamFakeProvider'; // when offline workbench.

import { sp } from "@pnp/sp";
import { IceCreamPnPJsProvider } from './iceCreamProviders/IceCreamPnPJsProvider';

export interface IIceCreamShopWebPartProps {
  description: string;
}

export default class IceCreamShopWebPart extends BaseClientSideWebPart<IIceCreamShopWebPartProps> {

  public onInit(): Promise<void> {

    return super.onInit().then(_ => {
      sp.setup({
        spfxContext: this.context
      });
    });
  }

  public render(): void {
    const element: React.ReactElement<IIceCreamShopProps> = React.createElement(
      IceCreamShop,
      {
        iceCreamProvider: new IceCreamFakeProvider(), // replace with real provider when online workbench using new IceCreamPnPJsProvider(sp) instead of new IceCreamFakeProvider()
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
