import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IPropertyPaneConfiguration, PropertyPaneTextField } from "@microsoft/sp-property-pane";

import * as strings from 'AdaptiveCardsImageGalleryWebPartStrings';
import AdaptiveCardsImageGallery from './components/AdaptiveCardsImageGallery';
import { IAdaptiveCardsImageGalleryProps } from './components/IAdaptiveCardsImageGalleryProps';
import { sp } from '@pnp/sp/presets/all';

export interface IAdaptiveCardsImageGalleryWebPartProps {
  imageGalleryName: string;
  imagesToDisplay: number;
}

export default class AdaptiveCardsImageGalleryWebPart extends BaseClientSideWebPart<IAdaptiveCardsImageGalleryWebPartProps> {
  public async onInit(): Promise<void> {
    return super.onInit().then(_ => {
      // Setup context to PnPjs
      sp.setup({
        spfxContext: this.context
      });
    });
  }

  public render(): void {
    const element: React.ReactElement<IAdaptiveCardsImageGalleryProps > = React.createElement(
      AdaptiveCardsImageGallery,
      {
        context: this.context,
        serviceScope: this.context.serviceScope,
        imageGalleryName: this.properties.imageGalleryName || "Adaptive Card Images",
        imagesToDisplay: this.properties.imagesToDisplay || 10
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
                PropertyPaneTextField('imageGalleryName', {
                  label: strings.ImageGalleryNameFieldLabel
                }),
                PropertyPaneTextField('imagesToDisplay', {
                  label: strings.ImagesToDisplayFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
