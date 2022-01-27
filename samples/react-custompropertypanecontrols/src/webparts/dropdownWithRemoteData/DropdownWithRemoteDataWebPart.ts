import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IPropertyPaneConfiguration } from "@microsoft/sp-property-pane";
import {
  Environment,
  EnvironmentType
} from '@microsoft/sp-core-library';

import { IDropdownOption } from 'office-ui-fabric-react';
import { update, get } from '@microsoft/sp-lodash-subset';

import * as strings from 'dropdownWithRemoteDataStrings';
import DropdownWithRemoteData from './components/DropdownWithRemoteData';
import { IDropdownWithRemoteDataProps } from './components/IDropdownWithRemoteDataProps';
import { IDropdownWithRemoteDataWebPartProps } from './IDropdownWithRemoteDataWebPartProps';

import { IList, IListItem, ListService, MockListService } from './services';

import { PropertyPaneAsyncDropdown } from '../../controls/PropertyPaneAsyncDropdown/PropertyPaneAsyncDropdown';

export default class DropdownWithRemoteDataWebPart extends BaseClientSideWebPart<IDropdownWithRemoteDataWebPartProps> {
  private itemsDropDown: PropertyPaneAsyncDropdown;

  protected onInit(): Promise<void> {
    this.configureWebPart = this.configureWebPart.bind(this);

    return super.onInit();
  }

  public render(): void {
    const element: React.ReactElement<IDropdownWithRemoteDataProps > = React.createElement(
      DropdownWithRemoteData,
      {
        list: this.properties.list,
        item: this.properties.item,
        needsConfiguration: this.needsConfiguration(),
        displayMode: this.displayMode,
        configureWebPart: this.configureWebPart
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    // reference to item dropdown needed later after selecting a list
    this.itemsDropDown = new PropertyPaneAsyncDropdown('item', {
      key: 'asyncUniqueKeyItem',
      label: strings.ItemFieldLabel,
      loadOptions: this.loadItems.bind(this),
      onPropertyChange: this.onListItemChange.bind(this),
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
                  key: 'asyncUniqueKeyList',
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
    const dataService = (Environment.type === EnvironmentType.Test || Environment.type === EnvironmentType.Local) ?
        new MockListService() :
        new ListService(this.context);

    return new Promise<IDropdownOption[]>(resolve => {
      dataService.getLists()
      .then((response: IList[]) => {
          var options : IDropdownOption[] = [];

          response.forEach((item: IList) => {
            options.push({"key": item.Id, "text": item.Title});
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
          var options : IDropdownOption[] = [];

          response.forEach((item: IListItem) => {
            options.push({"key": item.Id, "text": item.Title});
          });

          resolve(options);
      });
    });
  }

  private onListChange(propertyPath: string, oldValue: any, newValue: any): void {
    //update the property value
    update(this.properties, propertyPath, (): any => { return newValue; });

    // trigger that propertyPath was changed
    this.onPropertyPaneFieldChanged(propertyPath, oldValue, newValue);

    // reset selected item
    const oldItemValue : any = get(this.properties, 'item');
    this.properties.item = undefined;
    update(this.properties, 'item', (): any => { return this.properties.item; });

    // store selected item reset in web part properties
    this.onPropertyPaneFieldChanged('item', oldItemValue, this.properties.item);

    // reset selected values in item dropdown
    //this.itemsDropDown.properties.selectedKey = this.properties.item;
    this.itemsDropDown.properties.selectedKey = "";

    // allow to load items
    this.itemsDropDown.properties.disabled = false;

    // load items and re-render items dropdown
    this.itemsDropDown.render();
  }

  private onListItemChange(propertyPath: string, oldValue: any, newValue: any): void {
    //update the property value
    update(this.properties, propertyPath, (): any => { return newValue; });

    // store selected item reset in web part properties
    this.onPropertyPaneFieldChanged(propertyPath, oldValue, newValue);
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
}