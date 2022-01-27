import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { sp } from "@pnp/sp/presets/all";
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'TaxonomyFileExplorerWebPartStrings';
import { TaxonomyFileExplorer } from './components/TaxonomyFileExplorer';
import { ITaxonomyFileExplorerProps } from './components/ITaxonomyFileExplorerProps';

export interface ITaxonomyFileExplorerWebPartProps {
  fieldName: string;
  listName: string;
}

export default class TaxonomyFileExplorerWebPart extends BaseClientSideWebPart<ITaxonomyFileExplorerWebPartProps> {
  protected onInit(): Promise<void> {
    return super.onInit().then(_ => {
      sp.setup({
        spfxContext: this.context
      });
    });
  }

  public render(): void {
    const element: React.ReactElement<ITaxonomyFileExplorerProps> = React.createElement(
      TaxonomyFileExplorer,
      {
        fieldName: this.properties.fieldName,
        listName: this.properties.listName
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
                PropertyPaneTextField('listName', {
                  label: strings.ListnameFieldLabel
                }),
                PropertyPaneTextField('fieldName', {
                  label: strings.FieldnameFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
