import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'NutrientPdfViewerWebPartForSharePointWebPartStrings';
import NutrientPdfViewerWebPartForSharePoint from './components/NutrientPdfViewerWebPartForSharePoint';


import { PropertyFieldFilePicker, IFilePickerResult } from "@pnp/spfx-property-controls/lib/PropertyFieldFilePicker";
import { sp } from "@pnp/sp";

export interface INutrientPdfViewerWebPartForSharePointWebPartProps {
  documentUrl: IFilePickerResult;
  licensekey: string;
}

export default class NutrientPdfViewerWebPartForSharePointWebPart extends BaseClientSideWebPart<INutrientPdfViewerWebPartForSharePointWebPartProps> {

  public render(): void {
    ReactDom.render(
      <div>
        <NutrientPdfViewerWebPartForSharePoint document={this.properties.documentUrl?.fileAbsoluteUrl} licensekey={this.properties.licensekey}/>
        </div>,
      this.domElement);
  }

  protected onInit(): Promise<void> {
    return super.onInit().then(() => {
      sp.setup({
        spfxContext: this.context
      });
    });
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
                PropertyFieldFilePicker("documentUrl", {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  context: this.context as any,
                  filePickerResult: this.properties.documentUrl,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                  accepts: [".pdf", ".png", ".jpg", ".jpeg", ".tif", ".tiff"],
                  hideLinkUploadTab: true,
                  hideStockImages: true,
                  hideWebSearchTab: true,
                  hideRecentTab: true,
                  hideOrganisationalAssetTab: true,
                  hideOneDriveTab: true,
                  hideLocalUploadTab: true,
                  onSave: (e: IFilePickerResult) => {
                    this.properties.documentUrl = e;
                  },
                  onChanged: (e: IFilePickerResult) => {
                    this.properties.documentUrl = e;
                  },
                  key: "filePickerId",
                  buttonLabel: "Select Document",
                  label: "Document"
                }),
                PropertyPaneTextField('licensekey', {
                  label: 'License key',
                  multiline: true,
                  rows: 5
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
