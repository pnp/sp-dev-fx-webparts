import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'ReactPnPjsTesterWebPartStrings';
import ReactPnPjsTester from './components/ReactPnPjsTester';
import { IReactPnPjsTesterProps } from './components/IReactPnPjsTesterProps';

export interface IReactPnPjsTesterWebPartProps {
  description: string;
}

export default class ReactPnPjsTesterWebPart extends BaseClientSideWebPart <IReactPnPjsTesterWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IReactPnPjsTesterProps> = React.createElement(
      ReactPnPjsTester,
      {
        description: this.properties.description,
        spcontext:this.context
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
