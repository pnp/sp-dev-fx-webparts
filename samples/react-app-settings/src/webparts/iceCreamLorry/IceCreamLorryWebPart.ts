import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'IceCreamLorryWebPartStrings';
import IceCreamLorry from './components/IceCreamLorry';
import { IIceCreamLorryProps } from './components/IIceCreamLorryProps';

export interface IIceCreamLorryWebPartProps {
  description: string;
}

export default class IceCreamLorryWebPart extends BaseClientSideWebPart<IIceCreamLorryWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IIceCreamLorryProps > = React.createElement(
      IceCreamLorry,
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
