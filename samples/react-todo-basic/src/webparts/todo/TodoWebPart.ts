import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  BaseClientSideWebPart,
  IPropertyPaneSettings,
  IWebPartContext,
  PropertyPaneTextField,
  PropertyPaneDropdown,
  IPropertyPaneField,
  PropertyPaneLabel,
  IPropertyPaneDropdownOption,
  IHtmlProperties
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

    return this._getTaskLists()
      .then(() => {
        if (this.properties.spListIndex) {
          this._setSelectedList(this.properties.spListIndex.toString());
          this.context.statusRenderer.clearLoadingIndicator(this.domElement);
        }
      });
  }

  public render(): void {
    const element: React.ReactElement<ITodoContainerProps> = React.createElement(
      TodoContainer,
      {
        description: this.properties.description,
        dataProvider: this._dataProvider,
        webPartContext: this.context,
        webPartDisplayMode: this.displayMode,
        configureStartCallback: this._openPropertyPane
      }
    );

    this._todoContainerComponent = <TodoContainer>ReactDom.render(element, this.domElement);
  }

  protected onBeforeSerialize(): IHtmlProperties {
    if (this._todoContainerComponent) {
      //this.properties.description = this._todoContainerComponent.props.description;
    }

    return super.onBeforeSerialize();
  }

  protected onPropertyChange(propertyPath: string, newValue: any): void {
    if (propertyPath === 'spListIndex') {
      this._setSelectedList(newValue);
      this.render();
    }

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
              groupFields: this._getGroupFields()
            }
          ]
        }
      ]
    };
  }

  private _getTaskLists(): Promise<void> {
    return this._dataProvider.getTaskLists()
      .then((taskLists: ITodoTaskList[]) => {
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

    fields.push(PropertyPaneTextField('description', {
      label: strings.DescriptionFieldLabel
    }));

    fields.push(PropertyPaneDropdown('spListIndex', {
      label: "Select a list",
      isDisabled: this._disableDropdown,
      options: this._dropdownOptions
    }));

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
