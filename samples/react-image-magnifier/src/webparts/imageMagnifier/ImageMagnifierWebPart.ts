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
        description: this.properties.description,
        smallImgUrl: this.properties.smallImgUrl,
        smallImgWidth: this.properties.smallImgWidth,
        smallImgHeight: this.properties.smallImgHeight,
        largeImgUrl: this.properties.largeImgUrl,
        largeImgWidth: this.properties.largeImgWidth,
        largeImgHeight: this.properties.largeImgHeight,
        cursorOffsetX: this.properties.cursorOffsetX,
        cursorOffsetY: this.properties.cursorOffsetY,
        size: this.properties.size
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
                PropertyPaneTextField('smallImgUrl', {
                  label: strings.SmallImgUrlFieldLabel
                }),
                PropertyPaneTextField('smallImgWidth', {
                  label: strings.SmallImgWidthFieldLabel
                }),
                PropertyPaneTextField('smallImgHeight', {
                  label: strings.SmallImgHeightFieldLabel
                }),
                PropertyPaneTextField('largeImgUrl', {
                  label: strings.LargeImgUrlFieldLabel
                }),
                PropertyPaneTextField('largeImgWidth', {
                  label: strings.LargeImgWidthFieldLabel
                }),
                PropertyPaneTextField('largeImgHeight', {
                  label: strings.LargeImgHeightFieldLabel
                }),
                PropertyPaneTextField('cursorOffsetX', {
                  label: strings.CursorOffsetXFieldLabel
                }),
                PropertyPaneTextField('cursorOffsetY', {
                  label: strings.CursorOffsetYFieldLabel
                }),
                PropertyPaneTextField('size', {
                  label: strings.SizeFieldLabel
                }),
              ]
            }
          ]
        }
      ]
    };
  }
}
