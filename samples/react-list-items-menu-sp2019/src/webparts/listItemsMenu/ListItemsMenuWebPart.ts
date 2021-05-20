/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import * as ReactDom from "react-dom";
import { Theme } from "spfx-uifabric-themes"
import * as strings from "ListItemsMenuWebPartStrings";
import {
  MessageBarType,
  SpinnerSize
} from "office-ui-fabric-react";


import {
  IPropertyPaneConfiguration,
  IPropertyPaneDropdownOption,
  IPropertyPaneField,
  IPropertyPaneGroup,
  IPropertyPanePage,
  PropertyPaneDropdown,
  PropertyPaneTextField
} from "@microsoft/sp-webpart-base";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { sp } from "@pnp/sp";
import {
  PropertyFieldListPicker,
  PropertyFieldListPickerOrderBy
} from "@pnp/spfx-property-controls/lib/PropertyFieldListPicker";
import {
  PropertyFieldMessage
} from "@pnp/spfx-property-controls/lib/PropertyFieldMessage";
import {
  PropertyFieldSpinner
} from "@pnp/spfx-property-controls/lib/PropertyFieldSpinner";

import { IListItemsMenuProps } from "../../components/IListItemsMenuProps";
import { ListItemsMenu } from "../../components/ListItemsMenu";
import { useList } from "../../hooks/useList";

export interface IListItemsMenuWebPartProps {
  title: string;
  listId: string;
  fieldName: string;
  listBasetemplate: number;
}

const theme = window.__themeState__.theme;

// eslint-disable-next-line react-hooks/rules-of-hooks
const { getListColumns,  getLists } = useList() ;

export default class ListItemsMenuWebPart extends BaseClientSideWebPart<
  IListItemsMenuWebPartProps
> {
  private columns: IPropertyPaneDropdownOption[] = [];
  private lists: IPropertyPaneDropdownOption[] = [];



  private _messageError: string = undefined;
  private _hasError: any;


  protected async onInit(): Promise<void> {

    sp.setup({
      spfxContext: this.context,
    });
    return Promise.resolve();
  }


  public render(): void {

      const element: React.ReactElement<IListItemsMenuProps> = React.createElement(
      ListItemsMenu,
      {
        title: this.properties.title,
        listId: this.properties.listId,
        fieldName: this.properties.fieldName,
        themeVariant: theme,
        locale: this.context.pageContext.cultureInfo.currentUICultureName,
        listBaseTemplate: this.properties.listBasetemplate,
        onConfigure: () =>{ this.context.propertyPane.open(); },
        displayMode: this.displayMode,
        updateProperty: (value: string) => {
          this.properties.title = value;
        }
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get disableReactivePropertyChanges():boolean {
    return true;
   }

  protected async onPropertyPaneConfigurationStart() {
    if (
      this.properties.fieldName &&
      this.properties.listId &&
      this.columns.length === 0
    ) {
      await this.addListColumns(this.properties.listId);
      this.context.propertyPane.refresh();
    }

    if ( this.properties.listId && this.lists.length === 0){
      await this.addLists('1');
      this.context.propertyPane.refresh();
    }
  }

  protected async onPropertyPaneFieldChanged(
    propertyPath: string,
    oldValue: any,

    newValue: any
  ) {

    if (propertyPath === "listId" && newValue != oldValue) {
      this.columns = [];

      this.context.propertyPane.refresh();
      await this.addListColumns(newValue);
      this.context.propertyPane.refresh();
    }
  }

  private async addLists(newValue: any) {
    try {
      this.lists = [];
      const _lists = await getLists(newValue);
      console.log(_lists);
      for (const _list of _lists) {
        this.lists.push({ key: _list.Id, text: _list.Title });
      }
    } catch (error) {
      this._hasError = true;
      this._messageError =error.message;
    }
  }


  private async addListColumns(newValue: any) {
    try {
      this.columns = [];
      const _listColumns = await getListColumns(newValue);
      console.log(_listColumns);
      for (const _column of _listColumns) {
        this.columns.push({ key: _column.InternalName, text: _column.Title });
      }
    } catch (error) {
      this._hasError = true;
      this._messageError = error.message;
    }
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    const _pages: IPropertyPanePage[] = [
      {
        header: {
          description: strings.PropertyPaneDescription,
        },
        groups: [
          {
            groupName: strings.BasicGroupName,
            groupFields: [
              PropertyPaneTextField("title", {
                label: strings.DescriptionFieldLabel,
              }),
            ],
          },
        ],
      },
    ];
   const groups: IPropertyPaneGroup = _pages[0].groups[0] as IPropertyPaneGroup;
    const groupFields: IPropertyPaneField<any>[] = groups.groupFields;
      groupFields.push(
       PropertyFieldListPicker("listId", {
        label: "Select Document Library",
        selectedList: this.properties.listId  ,
        includeHidden: false,
        baseTemplate: 101,
        orderBy: PropertyFieldListPickerOrderBy.Title,
        disabled: false,
        onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
        properties: this.properties,
        context: this.context,
        onGetErrorMessage: null,
        deferredValidationTime: 0,
        key: "listPickerFieldId",
      })
      );



    if (this.properties.listId) {
      groupFields.push(
        PropertyFieldSpinner("", {
          key: "sp1",
          size: SpinnerSize.medium,
          isVisible: (this.columns.length || this._hasError) ? false : true,
          label: "Loading ...",
        })
      );
    }

    // Show Columns
    if (this.columns.length > 0) {
      groupFields.push(
        PropertyPaneDropdown("fieldName", {
          label: "Select field to group by documents",
          options: this.columns,
          selectedKey: this.properties.fieldName,
        })
      );
    }

    // Show Error
    if (this._hasError) {
      groupFields.push(
        PropertyFieldMessage("", {
          key: "msgError",
          messageType: MessageBarType.error,
          multiline: true,
          text: this._messageError,
          isVisible: this._hasError,
        })
      );
    }

    const _panelConfiguration: IPropertyPaneConfiguration = { pages: _pages };
    return _panelConfiguration;
  }
}
