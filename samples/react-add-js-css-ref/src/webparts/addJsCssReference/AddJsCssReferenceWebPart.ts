import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'AddJsCssReferenceWebPartStrings';
import AddJsCssReference from './components/AddJsCssReference';
import { IAddJsCssReferenceProps } from './components/IAddJsCssReferenceProps';

export interface IAddJsCssReferenceWebPartProps {
  description: string;
}

export default class AddJsCssReferenceWebPart extends BaseClientSideWebPart<IAddJsCssReferenceWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IAddJsCssReferenceProps > = React.createElement(
      AddJsCssReference,
      {
        description: this.properties.description,
        context:this.context
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
