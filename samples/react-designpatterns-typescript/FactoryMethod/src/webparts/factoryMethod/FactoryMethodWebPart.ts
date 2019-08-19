import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneDropdown,
  IPropertyPaneDropdownOption,
  IPropertyPaneField,
  PropertyPaneLabel
} from "@microsoft/sp-webpart-base";

import * as strings from "FactoryMethodWebPartStrings";
import FactoryMethod from "./components/FactoryMethod";
import { IFactoryMethodProps } from "./components/IFactoryMethodProps";
import { IFactoryMethodWebPartProps } from "./IFactoryMethodWebPartProps";
import * as lodash from "@microsoft/sp-lodash-subset";
import List from "./components/models/List";
import { Environment, EnvironmentType } from "@microsoft/sp-core-library";
import IDataProvider from "./components/dataproviders/IDataProvider";
import MockDataProvider from "./test/MockDataProvider";
import SharePointDataProvider from "./components/dataproviders/SharepointDataProvider";

export default class FactoryMethodWebPart extends BaseClientSideWebPart<IFactoryMethodWebPartProps> {
  private _dropdownOptions: IPropertyPaneDropdownOption[];
  private _selectedList: List;
  private _disableDropdown: boolean;
  private _dataProvider: IDataProvider;
  private _factorymethodContainerComponent: FactoryMethod;

  protected onInit(): Promise<void> {
    this.context.statusRenderer.displayLoadingIndicator(this.domElement, "Todo");

    /*
    Create the appropriate data provider depending on where the web part is running.
    The DEBUG flag will ensure the mock data provider is not bundled with the web part when you package the
     solution for distribution, that is, using the --ship flag with the package-solution gulp command.
    */
    if (DEBUG && Environment.type === EnvironmentType.Local) {
      this._dataProvider = new MockDataProvider();
    } else {
      this._dataProvider = new SharePointDataProvider();
      this._dataProvider.webPartContext = this.context;
    }

    this.openPropertyPane = this.openPropertyPane.bind(this);

    /*
    Get the list of tasks lists from the current site and populate the property pane dropdown field with the values.
    */
    this.loadLists()
      .then(() => {
        /*
         If a list is already selected, then we would have stored the list Id in the associated web part property.
         So, check to see if we do have a selected list for the web part. If we do, then we set that as the selected list
         in the property pane dropdown field.
        */
        if (this.properties.spListIndex) {
          this.setSelectedList(this.properties.spListIndex.toString());
          this.context.statusRenderer.clearLoadingIndicator(this.domElement);
        }
      });

    return super.onInit();
  }

  // render method of the webpart, actually calls Component
  public render(): void {
    const element: React.ReactElement<IFactoryMethodProps > = React.createElement(
      FactoryMethod,
      {
        spHttpClient: this.context.spHttpClient,
        siteUrl: this.context.pageContext.web.absoluteUrl,
        listName: this._dataProvider.selectedList === undefined ? "GenericList" : this._dataProvider.selectedList.Title,
        dataProvider: this._dataProvider,
        configureStartCallback: this.openPropertyPane
      }
    );

    //console.log(this._dataProvider.selectedList.Title);
    // reactDom.render(element, this.domElement);
    this._factorymethodContainerComponent = <FactoryMethod>ReactDom.render(element, this.domElement);

  }

  // loads lists from the site and fill the dropdown.
  private loadLists(): Promise<any> {
    return this._dataProvider.getLists()
      .then((lists: List[]) => {
        // disable dropdown field if there are no results from the server.
        this._disableDropdown = lists.length === 0;
        if (lists.length !== 0) {
          this._dropdownOptions = lists.map((list: List) => {
            return {
              key: list.Id,
              text: list.Title
            };
          });
        }
      });
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: any, newValue: any): void {
    /*
    Check the property path to see which property pane feld changed. If the property path matches the dropdown, then we set that list
    as the selected list for the web part.
    */
    if (propertyPath === "spListIndex") {
      this.setSelectedList(newValue);
    }

    /*
    Finally, tell property pane to re-render the web part.
    This is valid for reactive property pane.
    */
    super.onPropertyPaneFieldChanged(propertyPath, oldValue, newValue);
  }

  // sets the selected list based on the selection from the dropdownlist
  private setSelectedList(value: string): void {
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


  // we add fields dynamically to the property pane, in this case its only the list field which we will render
  private getGroupFields(): IPropertyPaneField<any>[] {
    const fields: IPropertyPaneField<any>[] = [];

    // we add the options from the dropdownoptions variable that was populated during init to the dropdown here.
    fields.push(PropertyPaneDropdown("spListIndex", {
      label: "Select a list",
      disabled: this._disableDropdown,
      options: this._dropdownOptions
    }));

    /*
    When we do not have any lists returned from the server, we disable the dropdown. If that is the case,
    we also add a label field displaying the appropriate message.
    */
    if (this._disableDropdown) {
      fields.push(PropertyPaneLabel(null, {
        text: "Could not find tasks lists in your site. Create one or more tasks list and then try using the web part."
      }));
    }

    return fields;
  }

  private openPropertyPane(): void {
    this.context.propertyPane.open();
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
              /*
              Instead of creating the fields here, we call a method that will return the set of property fields to render.
              */
              groupFields: this.getGroupFields()
            }
          ]
        }
      ]
    };
  }
}