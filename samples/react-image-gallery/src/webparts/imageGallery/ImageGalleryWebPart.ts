import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneSlider
} from '@microsoft/sp-webpart-base';

import * as strings from 'ImageGalleryWebPartStrings';
import ImageGallery from './components/ImageGallery';
import { IImageGalleryProps } from './components/IImageGalleryProps';
import ConfigureWebPart from './components/ConfigureWebPart/ConfigureWebPart';
import { sp } from '@pnp/sp';
import { ListService } from '../../Services/ListService';

export interface IImageGalleryWebPartProps {
  imageLibrary: string;
  pageSize: number;

}

export default class ImageGalleryWebPart extends BaseClientSideWebPart<IImageGalleryWebPartProps> {
  private listService: ListService


  protected async onInit(): Promise<void> {
    const _ = await super.onInit();

    this.listService = new ListService(this.context.spHttpClient);

    sp.setup({
      spfxContext: this.context
    });
  }

  public render(): void {
    // const element: React.ReactElement<IImageGalleryProps > = React.createElement(
    //   ImageGallery,
    //   {
    //     description: this.properties.imageLibrary
    //   }
    // );


    let element: any;

    if (this.properties.imageLibrary && this.properties.pageSize) {

      element = React.createElement<IImageGalleryProps>(
        ImageGallery,
        {
          listName: this.properties.imageLibrary,
          context: this.context,
          siteUrl: this.context.pageContext.site.absoluteUrl,
          pageSize: this.properties.pageSize

        }
      );
    }
    else {
      // show configure web part react component
      element = React.createElement(
        ConfigureWebPart,
        {
          webPartContext: this.context,
          title: "Image Gallery",
          description: strings.MissingListConfiguration,
          buttonText: strings.ConfigureWebpartButtonText
        }
      );
    }


    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }
  protected get disableReactivePropertyChanges(): boolean {
    return true;
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {

          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('imageLibrary', {
                  label: strings.ImageLibraryFieldLabel
                }),
                PropertyPaneSlider('pageSize', {
                  label: "Page Size",
                  min: 2,
                  max: 20,
                  value: 5,
                  showValue: true,
                  step: 1
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
