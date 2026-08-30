import { Version } from '@microsoft/sp-core-library';
import { IPropertyPaneConfiguration, PropertyPaneSlider, PropertyPaneTextField } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as React from 'react';
import * as ReactDom from 'react-dom';

import DocumentMetadataReview from './components/DocumentMetadataReview';
import { IDocumentMetadataReviewProps } from './components/IDocumentMetadataReviewProps';
import { DocumentMetadataService } from './services/DocumentMetadataService';
import * as strings from 'DocumentMetadataReviewWebPartStrings';

export interface IDocumentMetadataReviewWebPartProps {
  libraryPath: string;
  folderPath: string;
  metadataFields: string;
  maxRows: number;
}

export default class DocumentMetadataReviewWebPart extends BaseClientSideWebPart<IDocumentMetadataReviewWebPartProps> {
  private service!: DocumentMetadataService;

  protected onInit(): Promise<void> {
    return super.onInit().then(() => {
      this.service = new DocumentMetadataService(this.context);
    });
  }

  public render(): void {
    const element: React.ReactElement<IDocumentMetadataReviewProps> = React.createElement(DocumentMetadataReview, {
      libraryPath: this.properties.libraryPath || '',
      folderPath: this.properties.folderPath || '',
      metadataFields: this.properties.metadataFields || '',
      maxRows: this.properties.maxRows || 100,
      service: this.service
    });
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
          header: { description: strings.PropertyPaneDescription },
          groups: [
            {
              groupName: 'Source',
              groupFields: [
                PropertyPaneTextField('libraryPath', { label: strings.LibraryPathFieldLabel, placeholder: '/sites/your-site/Shared Documents' }),
                PropertyPaneTextField('folderPath', { label: strings.FolderPathFieldLabel, placeholder: '/sites/your-site/Shared Documents/Contracts' }),
                PropertyPaneTextField('metadataFields', { label: strings.MetadataFieldsFieldLabel, multiline: true, rows: 10, description: 'At most 8 fields. See the README for the JSON shape.' }),
                PropertyPaneSlider('maxRows', { label: strings.MaxRowsFieldLabel, min: 1, max: 500, step: 1, showValue: true })
              ]
            }
          ]
        }
      ]
    };
  }
}
