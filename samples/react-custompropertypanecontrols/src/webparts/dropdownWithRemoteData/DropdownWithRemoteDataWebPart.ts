import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  BaseClientSideWebPart,
  IPropertyPaneSettings,
  IWebPartContext,
} from '@microsoft/sp-client-preview';
import { IDropdownOption } from 'office-ui-fabric-react';

import * as strings from 'dropdownWithRemoteDataStrings';
import DropdownWithRemoteData, { IDropdownWithRemoteDataProps } from './components/DropdownWithRemoteData';
import { IDropdownWithRemoteDataWebPartProps } from './IDropdownWithRemoteDataWebPartProps';
import { IListInfo } from './IListInfo';

import { PropertyPaneAsyncDropdown } from '../../controls/PropertyPaneAsyncDropdown/PropertyPaneAsyncDropdown';

export default class DropdownWithRemoteDataWebPart extends BaseClientSideWebPart<IDropdownWithRemoteDataWebPartProps> {
  private itemsDropDown: PropertyPaneAsyncDropdown;

  public constructor(context: IWebPartContext) {
    super(context);
  }

  public render(): void {
    const element: React.ReactElement<IDropdownWithRemoteDataProps> = React.createElement(DropdownWithRemoteData, {
      list: this.properties.list,
      item: this.properties.item
    });

    ReactDom.render(element, this.domElement);
  }

  protected get propertyPaneSettings(): IPropertyPaneSettings {
    // reference to item dropdown needed later after selecting a list
    this.itemsDropDown = new PropertyPaneAsyncDropdown('item', {
      label: strings.ItemFieldLabel,
      loadOptions: this.loadItems.bind(this),
      onPropertyChange: this.onPropertyChange.bind(this),
      selectedKey: this.properties.item,
      // should be disabled if no list has been selected
      disabled: !this.properties.list
    });

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
                new PropertyPaneAsyncDropdown('list', {
                  label: strings.ListFieldLabel,
                  loadOptions: this.loadLists.bind(this),
                  onPropertyChange: this.onListChange.bind(this),
                  selectedKey: this.properties.list
                }),
                this.itemsDropDown
              ]
            }
          ]
        }
      ]
    };
  }

  private loadLists(): Promise<IDropdownOption[]> {
    return new Promise<IDropdownOption[]>((resolve: (options: IDropdownOption[]) => void, reject: (error: any) => void) => {
      // uncomment to load mock lists
      setTimeout(() => {
        resolve([{
          key: 'sharedDocuments',
          text: 'Shared Documents'
        },
          {
            key: 'myDocuments',
            text: 'My Documents'
          }]);
      }, 2000);

      // uncomment to load lists from the current web
      // this.context.httpClient.get(this.context.pageContext.web.absoluteUrl + '/_api/web/lists?$select=Id,Title', {
      //   headers: {
      //     'Accept': 'application/json;odata=nometadata',
      //     'odata-version': ''
      //   }
      // })
      //   .then((response: Response): Promise<{ value: IListInfo[] }> => {
      //     return response.json();
      //   })
      //   .then((listsResponse: { value: IListInfo[] }): void => {
      //     resolve(listsResponse.value.map((value: IListInfo, index: number, array: IListInfo[]): IDropdownOption => {
      //       return {
      //         key: value.Id,
      //         text: value.Title
      //       };
      //     }));
      //   }, (error: any): void => {
      //     reject(error);
      //   });
    });
  }

  private loadItems(): Promise<IDropdownOption[]> {
    if (!this.properties.list) {
      // resolve to empty options since no list has been selected
      return Promise.resolve();
    }

    // uncomment to load mock items
    const wp: DropdownWithRemoteDataWebPart = this;

    return new Promise<IDropdownOption[]>((resolve: (options: IDropdownOption[]) => void, reject: (error: any) => void) => {
      // uncomment to load mock items
      setTimeout(() => {
        const items = {
          sharedDocuments: [
            {
              key: 'spfx_presentation.pptx',
              text: 'SPFx for the masses'
            },
            {
              key: 'hello-world.spapp',
              text: 'hello-world.spapp'
            }
          ],
          myDocuments: [
            {
              key: 'clippy_cv.docx',
              text: 'Clippy CV'
            },
            {
              key: 'clippy_expenses.xlsx',
              text: 'Clippy Expenses'
            }
          ]
        }
        resolve(items[wp.properties.list]);
      }, 2000);

      // uncomment to load items from the current list
      // this.context.httpClient.get(this.context.pageContext.web.absoluteUrl + `/_api/web/lists('${this.properties.list}')/items?$select=Id,Title`, {
      //   headers: {
      //     'Accept': 'application/json;odata=nometadata',
      //     'odata-version': ''
      //   }
      // })
      //   .then((response: Response): Promise<{ value: IListInfo[] }> => {
      //     return response.json();
      //   })
      //   .then((listsResponse: { value: IListInfo[] }): void => {
      //     resolve(listsResponse.value.map((value: IListInfo, index: number, array: IListInfo[]): IDropdownOption => {
      //       return {
      //         key: value.Id,
      //         text: value.Title
      //       };
      //     }));
      //   }, (error: any): void => {
      //     reject(error);
      //   });
    });
  }

  private onListChange(propertyPath: string, newValue: any): void {
    // store new value in web part properties
    this.onPropertyChange(propertyPath, newValue);
    // reset selected item
    this.properties.item = undefined;
    // store selected item reset in web part properties
    this.onPropertyChange('item', this.properties.item);
    // reset selected values in item dropdown
    this.itemsDropDown.properties.selectedKey = this.properties.item;
    // allow to load items
    this.itemsDropDown.properties.disabled = false;
    // load items and re-render items dropdown
    this.itemsDropDown.render();
  }
}
