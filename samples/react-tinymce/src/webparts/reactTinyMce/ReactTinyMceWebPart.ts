// var tinymce = require('tinymce/tinymce');
// require('tinymce/themes/modern/theme');
// require('tinymce/plugins/paste');
// require('tinymce/plugins/link');

import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'ReactTinyMceWebPartStrings';
import ReactTinyMce from './components/ReactTinyMce';
import { IReactTinyMceProps } from './components/IReactTinyMceProps';

export interface IReactTinyMceWebPartProps {
  description: string;
}

export default class ReactTinyMceWebPart extends BaseClientSideWebPart<IReactTinyMceWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IReactTinyMceProps > = React.createElement(
      ReactTinyMce,
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
