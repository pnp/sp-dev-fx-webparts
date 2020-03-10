import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'PnPListViewWebPartStrings';
import PnPListView from './components/PnPListView';
import { IPnPListViewProps } from './components/IPnPListViewProps';
import { sp } from '@pnp/sp';
import '@pnp/sp/webs';
import '@pnp/sp/lists';
import '@pnp/sp/items';

export interface IPnPListViewWebPartProps {
  description: string;
}

export default class PnPListViewWebPart extends BaseClientSideWebPart <IPnPListViewWebPartProps> {

  private _items: any[];

  protected async onInit(): Promise<void> {
    await super.onInit();

    sp.setup({
      spfxContext: this.context
    });

    const countries = await sp.web.lists.getByTitle('Country').items.get();

    this._items = await sp.web.lists.getByTitle('Journeys').getItemsByCAMLQuery({
      ViewXml: ''
    });

    this._items.forEach(item => {
      const visitedCountriesIds: number[] = item['VisitedCountriesId'] as number[];
      item['VisitedCountries'] = countries.filter(c => visitedCountriesIds.indexOf(c['ID']) !== -1).map(c => c['Title']);
    });

  }

  public render(): void {
    const element: React.ReactElement<IPnPListViewProps> = React.createElement(
      PnPListView,
      {
        items: this._items,
        context: this.context
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
