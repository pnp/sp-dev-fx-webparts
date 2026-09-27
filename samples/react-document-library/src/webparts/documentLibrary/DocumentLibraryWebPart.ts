import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneSlider,
  PropertyPaneTextField,
  PropertyPaneToggle
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as strings from 'DocumentLibraryWebPartStrings';
import DocumentLibrary from './components/DocumentLibrary';
import { IDocumentLibraryProps } from './components/IDocumentLibraryProps';
import { DocumentLibraryService } from './services/DocumentLibraryService';

export interface IDocumentLibraryWebPartProps {
  libraryTitle: string;
  libraryRootPath: string;
  webPartTitle: string;
  pageSize: number;
  showFolders: boolean;
  showFileType: boolean;
  showModifiedDate: boolean;
}

export default class DocumentLibraryWebPart extends BaseClientSideWebPart<IDocumentLibraryWebPartProps> {
  private service?: DocumentLibraryService;

  protected async onInit(): Promise<void> {
    await super.onInit();
    this.service = new DocumentLibraryService(this.context);
  }

  public render(): void {
    const element: React.ReactElement<IDocumentLibraryProps> = React.createElement(DocumentLibrary, {
      context: this.context,
      libraryTitle: this.properties.libraryTitle || '',
      libraryRootPath: this.properties.libraryRootPath || '',
      webPartTitle: this.properties.webPartTitle || '',
      pageSize: this.properties.pageSize || 25,
      showFolders: this.properties.showFolders !== false,
      showFileType: this.properties.showFileType !== false,
      showModifiedDate: this.properties.showModifiedDate !== false,
      service: this.service || (this.service = new DocumentLibraryService(this.context))
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
              groupName: strings.LibraryGroupName,
              groupFields: [
                PropertyPaneTextField('libraryTitle', { label: strings.LibraryTitleFieldLabel }),
                PropertyPaneTextField('libraryRootPath', {
                  label: strings.LibraryRootPathFieldLabel,
                  description: strings.LibraryRootPathFieldDescription
                }),
                PropertyPaneTextField('webPartTitle', { label: strings.WebPartTitleFieldLabel })
              ]
            },
            {
              groupName: strings.DisplayGroupName,
              groupFields: [
                PropertyPaneSlider('pageSize', {
                  label: strings.PageSizeFieldLabel,
                  min: 1,
                  max: 100,
                  step: 1,
                  showValue: true
                }),
                PropertyPaneToggle('showFolders', { label: strings.ShowFoldersFieldLabel, checked: true }),
                PropertyPaneToggle('showFileType', { label: strings.ShowFileTypeFieldLabel, checked: true }),
                PropertyPaneToggle('showModifiedDate', { label: strings.ShowModifiedDateFieldLabel, checked: true })
              ]
            }
          ]
        }
      ]
    };
  }
}
