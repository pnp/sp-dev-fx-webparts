import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';

import * as strings from 'SiteDesignsWebPartStrings';
import SiteDesigns from './components/SiteDesigns';
import { ISiteDesignsProps } from './components/ISiteDesignsProps';

export interface ISiteDesignsWebPartProps {
  title: string;
}

export default class SiteDesignsWebPart extends BaseClientSideWebPart<ISiteDesignsWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ISiteDesignsProps> = React.createElement(
      SiteDesigns,
      {
        title: this.properties.title,
        context: this.context,
        displayMode: this.displayMode,
        updateProperty: (value: string) => {
          this.properties.title = value;
        }
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
                PropertyPaneTextField('title', {
                  label: 'Title'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
