import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { sp } from "@pnp/sp";
import * as strings from 'ClassicReactWebPartWebPartStrings';
import ClassicReactWebPart from './components/ClassicReactWebPart';
import { IClassicReactWebPartProps } from './components/IClassicReactWebPartProps';

export interface IClassicReactWebPartWebPartProps {
  description: string;
}

export default class ClassicReactWebPartWebPart extends BaseClientSideWebPart<IClassicReactWebPartWebPartProps> {

  public render(): void {
    sp.setup({
      spfxContext: this.context
    });
    const element: React.ReactElement<IClassicReactWebPartProps > = React.createElement(
      ClassicReactWebPart,
      {
        description: this.properties.description
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
