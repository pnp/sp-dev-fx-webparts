import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version, DisplayMode } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'SiteCollectionCatalogWebPartStrings';
import SiteCollectionCatalog from './components/SiteCollectionCatalog';
import { sp } from "@pnp/sp";


export interface ISiteCollectionCatalogWebPartProps {
  description: string;
  title: string;
  displayMode: DisplayMode;
  updateProperty: (value: string) => void;
}

export default class SiteCollectionCatalogWebPart extends BaseClientSideWebPart<ISiteCollectionCatalogWebPartProps> {

  public onInit(): Promise<void> {

    return super.onInit().then(_ => {

      // other init code may be present

      sp.setup({
        spfxContext: this.context
      });
    });
  }

  public render(): void {
    const element: React.ReactElement<ISiteCollectionCatalogWebPartProps> = React.createElement(
      SiteCollectionCatalog,
      {
        description: this.properties.description,
        title: this.properties.title,
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
