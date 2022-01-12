import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'RatingsWebPartStrings';
import Ratings from './components/Ratings';
import { IRatingsProps } from './components/IRatingsProps';

export interface IRatingsWebPartProps {
  activeColor: string;
  inactiveColor: string;
}

export default class RatingsWebPart extends BaseClientSideWebPart<IRatingsWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IRatingsProps> = React.createElement(
      Ratings,
      {
        context: this.context,
        properties: this.properties
      }
    );
    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.1');
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
              groupFields: [
                PropertyPaneTextField('activeColor', {
                  label: strings.ActiveColorLabel
                }),
                PropertyPaneTextField('inactiveColor', {
                  label: strings.InactiveColorLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
