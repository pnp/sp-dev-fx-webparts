import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'ImageMagnifierWebPartStrings';
import ImageMagnifier from './components/ImageMagnifier';
import { IImageMagnifierProps } from './components/IImageMagnifierProps';
import { IImageMagnifierWebPartProps } from './IImageMagnifierWebPartProps';

export default class ImageMagnifierWebPart extends BaseClientSideWebPart<IImageMagnifierWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IImageMagnifierProps > = React.createElement(
      ImageMagnifier,
      {
        description: this.properties.description
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
