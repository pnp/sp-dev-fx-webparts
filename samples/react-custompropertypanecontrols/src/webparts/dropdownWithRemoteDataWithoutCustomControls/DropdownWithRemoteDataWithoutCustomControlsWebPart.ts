import * as React from 'react';
import * as ReactDom from 'react-dom';
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IPropertyPaneConfiguration, PropertyPaneDropdown } from "@microsoft/sp-property-pane";
import {
  Environment,
  EnvironmentType
} from '@microsoft/sp-core-library';

import { IDropdownOption } from 'office-ui-fabric-react';

import * as strings from 'dropdownWithRemoteDataWithoutCustomControlsStrings';
import DropdownWithRemoteDataWithoutCustomControls from './components/DropdownWithRemoteDataWithoutCustomControls';
import { IDropdownWithRemoteDataWithoutCustomControlsProps } from './components/IDropdownWithRemoteDataWithoutCustomControlsProps';
import { IDropdownWithRemoteDataWithoutCustomControlsWebPartProps } from './IDropdownWithRemoteDataWithoutCustomControlsWebPartProps';

import { IList, IListItem, ListService, MockListService } from './services';

export default class DropdownWithRemoteDataWithoutCustomControlsWebPart extends BaseClientSideWebPart<IDropdownWithRemoteDataWithoutCustomControlsWebPartProps> {
  private lists: IDropdownOption[];
  private items: IDropdownOption[];

  //remember if a given list should be disabled or not
  private listsDropdownDisabled: boolean;
  private itemsDropdownDisabled: boolean;

  protected onInit(): Promise<void> {
    this.itemsDropdownDisabled = !this.properties.list;

    this.configureWebPart = this.configureWebPart.bind(this);

    return super.onInit();
  }

  protected onPropertyPaneConfigurationStart(): void {
    this.listsDropdownDisabled = !this.lists;

    if (this.lists) {
      return;
    }

    this.context.statusRenderer.displayLoadingIndicator(this.domElement, 'lists', undefined, this.clearDomNode);

    this.loadLists().then((listOptions: IDropdownOption[]) => {
      this.lists = listOptions;
      this.listsDropdownDisabled = false;

      //if the list was already selected, then get columns
      if (this.properties.list) {
        //go and load up dynamic column data
        this.loadItems().then((itemOptions: IDropdownOption[]): void => {
          this.items = itemOptions;
          this.context.propertyPane.refresh();
          this.context.statusRenderer.clearLoadingIndicator(this.domElement);
          this.render();
        });
      }
      else {
        //else no list pre selected, so we can continue
        this.context.propertyPane.refresh();
        this.context.statusRenderer.clearLoadingIndicator(this.domElement);
        this.render();
      }
    });
  }

  protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: any, newValue: any): void {
    if (propertyPath === 'list' && newValue) {
      // push new list value
      super.onPropertyPaneFieldChanged(propertyPath, oldValue, newValue);
      // get previously selected item
      const previousItem: string = this.properties.item;
      // reset selected item
      this.properties.item = undefined;
      // push new item value
      this.onPropertyPaneFieldChanged('itemName', previousItem, this.properties.item);
      // disable item selector until new items are loaded
      this.itemsDropdownDisabled = true;
      // refresh the item selector control by repainting the property pane
      this.context.propertyPane.refresh();
      // communicate loading items
      this.context.statusRenderer.displayLoadingIndicator(this.domElement, 'items', undefined, this.clearDomNode);

      this.loadItems()
        .then((itemOptions: IDropdownOption[]): void => {
          // store items
          this.items = itemOptions;
          // enable item selector
          this.itemsDropdownDisabled = false;
          setTimeout(() => {
            // clear status indicator
            this.context.statusRenderer.clearLoadingIndicator(this.domElement);
            // re-render the web part as clearing the loading indicator removes the web part body
            this.render();
            // refresh the item selector control by repainting the property pane
            this.context.propertyPane.refresh();
          }, 5000);
        });
    }
    else {
      super.onPropertyPaneFieldChanged(propertyPath, oldValue, newValue);
    }
  }

  public render(): void {
    const element: React.ReactElement<IDropdownWithRemoteDataWithoutCustomControlsProps> = React.createElement(DropdownWithRemoteDataWithoutCustomControls, {
      list: this.properties.list,
      item: this.properties.item,
      needsConfiguration: this.needsConfiguration(),
      displayMode: this.displayMode,
      configureWebPart: this.configureWebPart
    });

    ReactDom.render(element, this.domElement);
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
                PropertyPaneDropdown('list', {
                  label: strings.ListFieldLabel,
                  options: this.lists,
                  disabled: this.listsDropdownDisabled
                }),
                PropertyPaneDropdown('item', {
                  label: strings.ItemFieldLabel,
                  options: this.items,
                  disabled: this.itemsDropdownDisabled
                })
              ]
            }
          ]
        }
      ]
    };
  }

  private loadLists(): Promise<IDropdownOption[]> {
    const dataService = (Environment.type === EnvironmentType.Test || Environment.type === EnvironmentType.Local) ?
      new MockListService() :
      new ListService(this.context);

    return new Promise<IDropdownOption[]>(resolve => {
      dataService.getLists()
        .then((response: IList[]) => {
          var options: IDropdownOption[] = [];

          response.forEach((item: IList) => {
            options.push({ "key": item.Id, "text": item.Title });
          });

          resolve(options);
        });
    });
  }

  private loadItems(): Promise<IDropdownOption[] | void> {
    if (!this.properties.list) {
      // resolve to empty options since no list has been selected
      return Promise.resolve();
    }

    const dataService = (Environment.type === EnvironmentType.Test || Environment.type === EnvironmentType.Local) ?
      new MockListService() :
      new ListService(this.context);

    return new Promise<IDropdownOption[]>(resolve => {
      dataService.getList(this.properties.list)
        .then((response) => {
          var options: IDropdownOption[] = [];

          if (response && response.length) {
            response.forEach((item: IListItem) => {
              options.push({ "key": item.Id, "text": item.Title });
            });
          }

          resolve(options);
        });
    });
  }

  private needsConfiguration(): boolean {
    return this.properties.list === null ||
      this.properties.list === undefined ||
      this.properties.list.trim().length === 0 ||
      this.properties.item === null ||
      this.properties.item === undefined ||
      this.properties.item.toString().trim().length === 0;
  }

  private configureWebPart(): void {
    this.context.propertyPane.open();
  }

  private clearDomNode = (domNode: HTMLElement): void => {
    ReactDom.unmountComponentAtNode(domNode);
  }
}
