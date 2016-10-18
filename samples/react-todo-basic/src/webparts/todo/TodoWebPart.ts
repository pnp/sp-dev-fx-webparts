import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  BaseClientSideWebPart,
  IPropertyPaneSettings,
  IWebPartContext,
  PropertyPaneDropdown,
  IPropertyPaneField,
  PropertyPaneLabel,
  IPropertyPaneDropdownOption
} from '@microsoft/sp-client-preview';
import { EnvironmentType } from '@microsoft/sp-client-base';
import * as lodash from '@microsoft/sp-lodash-subset';
import * as strings from 'todoStrings';
import TodoContainer from './components/TodoContainer/TodoContainer';
import ITodoContainerProps from './components/TodoContainer/ITodoContainerProps';
import ITodoWebPartProps from './ITodoWebPartProps';
import ITodoDataProvider from './dataProviders/ITodoDataProvider';
import MockDataProvider from './tests/MockDataProvider';
import SharePointDataProvider from './dataProviders/SharePointDataProvider';
import ITodoTaskList from './models/ITodoTaskList';

export default class TodoWebPart extends BaseClientSideWebPart<ITodoWebPartProps> {

  private _dropdownOptions: IPropertyPaneDropdownOption[];
  private _dataProvider: ITodoDataProvider;
  private _selectedList: ITodoTaskList;
  private _todoContainerComponent: TodoContainer;
  private _disableDropdown: boolean;

  public constructor(context: IWebPartContext) {
    super(context);

    /*
    Create the appropriate data provider dependeing on where the web part is running
    */
    if (context.environment.type === EnvironmentType.Local) {
      this._dataProvider = new MockDataProvider();
    } else {
      this._dataProvider = new SharePointDataProvider();
      this._dataProvider.webPartContext = this.context;
    }

    this._openPropertyPane = this._openPropertyPane.bind(this);
  }

  protected onInit(): Promise<void> {
    this.context.statusRenderer.displayLoadingIndicator(this.domElement, "Todo");

    /*
    Get the list of tasks lists from the current site and populate the property pane dropdown field with the values.
    */
    return this._loadTaskLists()
      .then(() => {
        /*
         If a list is already selected, then we would have stored the list Id in the associated web part property.
         So, check to see if we do have a selected list for the web part. If we do, then we set that as the selected list
         in the property pane dropdown field.
        */
        if (this.properties.spListIndex) {
          this._setSelectedList(this.properties.spListIndex.toString());
          this.context.statusRenderer.clearLoadingIndicator(this.domElement);
        }
      });
  }

  public render(): void {
    /*
    Create the react element we want to render in the web part DOM. Pass the required props to the react component. 
    */
    const element: React.ReactElement<ITodoContainerProps> = React.createElement(
      TodoContainer,
      {
        dataProvider: this._dataProvider,
        webPartDisplayMode: this.displayMode,
        configureStartCallback: this._openPropertyPane
      }
    );

    this._todoContainerComponent = <TodoContainer>ReactDom.render(element, this.domElement);
  }

  protected onPropertyChange(propertyPath: string, newValue: any): void {
    /*
    Check the property path to see which property pane feld changed. If the property path matches the dropdown, then we set that list
    as the selected list for the web part. 
    */
    if (propertyPath === 'spListIndex') {
      this._setSelectedList(newValue);
    }

    /*
    Finally, tell property pane to re-render the web part. 
    This is valid for reactive property pane. 
    */
    super.onPropertyChange(propertyPath, newValue);
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
              /*
              Instead of creating the fields here, we call a method that will return the set of property fields to render.
              */
              groupFields: this._getGroupFields()
            }
          ]
        }
      ]
    };
  }

  private _loadTaskLists(): Promise<void> {
    return this._dataProvider.getTaskLists()
      .then((taskLists: ITodoTaskList[]) => {
        // Disable dropdown field if there are no results from the server.
        this._disableDropdown = taskLists.length === 0;
        if (taskLists.length !== 0) {
          this._dropdownOptions = taskLists.map((list: ITodoTaskList) => {
            return {
              key: list.Id,
              text: list.Title
            };
          });
        }
      });
  }

  private _getGroupFields(): IPropertyPaneField<any>[] {
    const fields: IPropertyPaneField<any>[] = [];

    fields.push(PropertyPaneDropdown('spListIndex', {
      label: "Select a list",
      isDisabled: this._disableDropdown,
      options: this._dropdownOptions
    }));

    /*
    When we do not have any lists returned from the server, we disable the dropdown. If that is the case,
    we also add a label field displaying the appropriate message. 
    */
    if (this._disableDropdown) {
      fields.push(PropertyPaneLabel(null, {
        text: 'Could not find tasks lists in your site. Create one or more tasks list and then try using the web part.'
      }));
    }

    return fields;
  }

  private _setSelectedList(value: string) {
    const selectedIndex: number = lodash.findIndex(this._dropdownOptions,
      (item: IPropertyPaneDropdownOption) => item.key === value
    );

    const selectedDropDownOption: IPropertyPaneDropdownOption = this._dropdownOptions[selectedIndex];

    if (selectedDropDownOption) {
      this._selectedList = {
        Title: selectedDropDownOption.text,
        Id: selectedDropDownOption.key.toString()
      };

      this._dataProvider.selectedList = this._selectedList;
    }
  }

  private _openPropertyPane(): void {
    this.configureStart();
  }
}
