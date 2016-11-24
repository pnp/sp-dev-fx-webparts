import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  BaseClientSideWebPart,
  IPropertyPaneSettings,
  IWebPartContext,
  PropertyPaneDropdown
} from '@microsoft/sp-client-preview';
import { IDropdownOption } from 'office-ui-fabric-react';
// import { IListInfo } from './IListInfo';

import * as strings from 'dropdownWithRemoteDataWithoutCustomControlsStrings';
import DropdownWithRemoteDataWithoutCustomControls, { IDropdownWithRemoteDataWithoutCustomControlsProps } from './components/DropdownWithRemoteDataWithoutCustomControls';
import { IDropdownWithRemoteDataWithoutCustomControlsWebPartProps } from './IDropdownWithRemoteDataWithoutCustomControlsWebPartProps';

export default class DropdownWithRemoteDataWithoutCustomControlsWebPart extends BaseClientSideWebPart<IDropdownWithRemoteDataWithoutCustomControlsWebPartProps> {
  private lists: IDropdownOption[];
  private items: IDropdownOption[];
  private itemsDropdownDisabled: boolean;

  public constructor(context: IWebPartContext) {
    super(context);
  }

  protected onInit(): Promise<void> {
    this.itemsDropdownDisabled = !this.properties.list;
    this.context.statusRenderer.displayLoadingIndicator(this.domElement, 'lists');

    return this.loadLists()
      .then((listOptions: IDropdownOption[]): Promise<IDropdownOption[]> => {
        this.lists = listOptions;
        return this.loadItems();
      })
      .then((itemOptions: IDropdownOption[]): void => {
        this.items = itemOptions;
        this.context.statusRenderer.clearLoadingIndicator(this.domElement);
      });
  }

  protected onPropertyChange(propertyPath: string, newValue: any): void {
    if (propertyPath === 'list' &&
      newValue) {
      // push new list value
      super.onPropertyChange(propertyPath, newValue);
      // reset selected item
      this.properties.item = undefined;
      // push new item value
      this.onPropertyChange('item', this.properties.item);
      // disable item selector until new items are loaded
      this.itemsDropdownDisabled = true;
      // refresh the item selector control by repainting the property pane
      this.configureStart();
      // communicate loading items
      this.context.statusRenderer.displayLoadingIndicator(this.domElement, 'items');

      this.loadItems()
        .then((itemOptions: IDropdownOption[]): void => {
          // store items
          this.items = itemOptions;
          // enable item selector
          this.itemsDropdownDisabled = false;
          // clear status indicator
          this.context.statusRenderer.clearLoadingIndicator(this.domElement);
          // re-render the web part as clearing the loading indicator removes the web part body
          this.render();
          // refresh the item selector control by repainting the property pane
          this.configureStart();
        });
    }
    else {
      super.onPropertyChange(propertyPath, newValue);
    }
  }

  public render(): void {
    const element: React.ReactElement<IDropdownWithRemoteDataWithoutCustomControlsProps> = React.createElement(DropdownWithRemoteDataWithoutCustomControls, {
      list: this.properties.list,
      item: this.properties.item
    });

    ReactDom.render(element, this.domElement);
  }

  protected get propertyPaneSettings(): IPropertyPaneSettings {
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
                PropertyPaneDropdown('list', {
                  label: strings.ListFieldLabel,
                  options: this.lists
                }),
                PropertyPaneDropdown('item', {
                  label: strings.ItemFieldLabel,
                  options: this.items,
                  isDisabled: this.itemsDropdownDisabled
                })
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
    const wp: DropdownWithRemoteDataWithoutCustomControlsWebPart = this;

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
        };
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
}
