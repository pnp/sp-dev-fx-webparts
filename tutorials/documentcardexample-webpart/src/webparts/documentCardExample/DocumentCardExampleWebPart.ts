require('set-webpack-public-path!');
import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  BaseClientSideWebPart,
  IPropertyPaneSettings,
  IWebPartContext,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'documentCardExampleStrings';
import DocumentCardExample, { IDocumentCardExampleProps } from './components/DocumentCardExample';
import { IDocumentCardExampleWebPartProps } from './IDocumentCardExampleWebPartProps';

export default class DocumentCardExampleWebPart extends BaseClientSideWebPart<IDocumentCardExampleWebPartProps> {

  public constructor(context: IWebPartContext) {
    super(context);
  }

  public render(): void {
    const element: React.ReactElement<IDocumentCardExampleProps> = React.createElement(DocumentCardExample, {
      description: this.properties.description
    });

    ReactDom.render(element, this.domElement);
  }

  protected get propertyPaneSettings(): IPropertyPaneSettings {
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
