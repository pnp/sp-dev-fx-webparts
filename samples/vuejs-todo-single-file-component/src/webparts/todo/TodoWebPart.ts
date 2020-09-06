import { Version, Environment, EnvironmentType } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart
} from '@microsoft/sp-webpart-base';
import { findIndex } from '@microsoft/sp-lodash-subset';

import {
  IPropertyPaneConfiguration,
  IPropertyPaneDropdownOption,
  PropertyPaneDropdown
} from "@microsoft/sp-property-pane";

import Vue from 'vue';
import TodoComponent from './components/todo/Todo.vue';
import { ITodoProps } from './components/todo/ITodoProps';

import * as strings from 'toDoStrings';
import { ITodoWebPartProps } from './ITodoWebPartProps';

import ITodoDataProvider from '../../dataProviders/ITodoDataProvider';
import MockDataProvider from '../../dataProviders//MockDataProvider';
import SharePointDataProvider from '../../dataProviders/SharePointDataProvider';
import { ITaskList } from '../../models/ICommonObjects';
import { Utils } from '../../common/Utils';
export default class TodoWebPart extends BaseClientSideWebPart<ITodoWebPartProps> {

  private _data: ITodoProps;
  private _dropdownOptions: IPropertyPaneDropdownOption[];
  private _dataProvider: ITodoDataProvider;
  private _selectedList: ITaskList;

  private _disableDropdown: boolean;


  protected onInit(): Promise<void> {

    this.context.statusRenderer.displayLoadingIndicator(this.domElement, "Todo");

    /*
    Create the appropriate data provider depending on where the web part is running.
    The DEBUG flag will ensure the mock data provider is not bundled with the web part when you package the solution for distribution, that is, using the --ship flag with the package-solution gulp command.
    */
    if (DEBUG && Environment.type === EnvironmentType.Local) {
      this._dataProvider = new MockDataProvider();
    } else {
      this._dataProvider = new SharePointDataProvider();
      this._dataProvider.webPartContext = this.context;
    }

    /*
      If we have serialized list in the webpart properties, use it
    */
    if (this.properties.SelectedList) {
      this._dataProvider.selectedList = this.properties.SelectedList;
    }

    /*
      Approach 1:
       Get the list of tasks lists from the current site and store them in the variable _dropdownOptions
       _dropdownOptions will be used to populate the property pane dropdown field when pane opens.

       Approach 2:
      Get the list of tasks lists from the current site and load them in the property pane only when the property pane is open.
      For this approach please review the sample: react-custompropertypanecontrols

    */
    this._loadTaskLists()
      .then(() => {
        /*
         If a list is already selected, then we would have stored the list Id in the associated web part property.
         So, check to see if we do have a selected list for the web part. If we do, then we set that as the selected list
         in the property pane dropdown field.
        */
        if (this.properties.SelectedList) {
          this._setSelectedList(this.properties.SelectedList.Id);
          this.context.statusRenderer.clearLoadingIndicator(this.domElement);
        }
      });

    return super.onInit();
  }

  public render(): void {

    this.domElement.innerHTML = `
      <div id="app-${this.context.instanceId}">
      </div>`;

    this._data = {
      dataProvider: this._dataProvider,
      webPartDisplayMode: this.displayMode
    };

    // tslint:disable-next-line:no-unused-expression
    new Vue({
      el: `#app-${this.context.instanceId}`,
      render: h => h(TodoComponent, {
        props: this._data
      })
    });

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
                PropertyPaneDropdown('selectedList', {
                  label: "Select a list",
                  disabled: this._disableDropdown,
                  options: this._dropdownOptions
                })
              ]
            }
          ]
        }
      ]
    };
  }

  protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: any, newValue: any): void {
    /*
    Check the property path to see which property pane feld changed.
    If the property path matches the dropdown, then we set that list as the selected list for the web part.
    */
    if (propertyPath === 'selectedList') {
      this._setSelectedList(newValue);
    }

    /*
    Tell property pane to re-render the web part.
    This is valid for reactive property pane.
    */
    super.onPropertyPaneFieldChanged(propertyPath, oldValue, newValue);
  }

  private _loadTaskLists(): Promise<any> {
    return this._dataProvider.getTaskLists()
      .then((taskLists: ITaskList[]) => {
        // Disable dropdown field if there are no results from the server.
        this._disableDropdown = taskLists.length === 0;
        let utiility: Utils = new Utils();
        if (taskLists.length !== 0) {
          this._dropdownOptions = taskLists.map((list: ITaskList) => {
            return {
              key: utiility.GetKeyFroDropdown(list),
              text: list.Title
            };
          });
        }
      });
  }

  private _setSelectedList(value: string) {

    const selectedIndex: number = findIndex(this._dropdownOptions,
      (item: IPropertyPaneDropdownOption) => item.key === value
    );

    const selectedDropDownOption: IPropertyPaneDropdownOption = this._dropdownOptions[selectedIndex];
    let utiility: Utils = new Utils();

    if (selectedDropDownOption) {
      this._selectedList = {
        Title: selectedDropDownOption.text,
        Id: utiility.GetListId(selectedDropDownOption),
        ListItemEntityTypeFullName: utiility.GetListItemEntityType(selectedDropDownOption)
      };

      this._dataProvider.selectedList = this._selectedList;

      this.properties.SelectedList = this._selectedList;
    }
  }

}
