
import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  IPropertyPaneDropdownOption,
  IPropertyPaneField,
  IPropertyPaneGroup,
  IPropertyPanePage,
  PropertyPaneDropdown,
  PropertyPaneSlider,
  PropertyPaneTextField,
} from "@microsoft/sp-webpart-base";

import * as strings from "BannerWebPartStrings";
import { Banner } from "../../components/Banner";
import { IBannerProps } from "../../components/Banner/IBannerProps";

import { useList } from "../../hooks/useList";
import {
  PropertyFieldSitePicker,
  IPropertyFieldSite,
} from "@pnp/spfx-property-controls";
import { ISPList } from "../../entities/ISPList";
import { sp } from "@pnp/sp";
import { ISPColumn } from "../../entities";
export interface IBannerWebPartProps {
  title: string;
  listId: string;
  titleFieldName: string;
  dateFieldName: string;
  descriptionFieldName: string;
  imageUrlFieldName: string;
  listBasetemplate: number;
  numberItems: number;
  sites: IPropertyFieldSite[];
  titleLink: string;
}

// eslint-disable-next-line react-hooks/rules-of-hooks
const { getListColumns, getLists } = useList();

export default class BannerWebPart extends BaseClientSideWebPart<
  IBannerWebPartProps
> {
  private textColumns: IPropertyPaneDropdownOption[] = [];
  private dateColumns: IPropertyPaneDropdownOption[] = [];
  private URLColumns: IPropertyPaneDropdownOption[] = [];
  private columns: IPropertyPaneDropdownOption[] = [];
  private lists: IPropertyPaneDropdownOption[] = [];

  private listColumns: ISPColumn[] = [];

  private _messageError: string = undefined;

  protected async onInit(): Promise<void> {
    sp.setup({
      spfxContext: this.context,
    });

    return Promise.resolve();
  }
  public render(): void {
    const element: React.ReactElement<IBannerProps> = React.createElement(
      Banner,
      {
        selectedProperties: {
          title: this.properties.titleFieldName,
          listId: this.properties.listId,
          titleFieldName: this.properties.titleFieldName,
          dateFieldName: this.properties.dateFieldName,
          descriptionFieldName: this.properties.descriptionFieldName,
          imageUrlFieldName: this.properties.imageUrlFieldName,
          listBasetemplate: this.properties.listBasetemplate,
          numberItems: this.properties.numberItems,
          sites: this.properties.sites,
          titleLink: this.properties.titleLink,
        },
        webpartContext: this.context,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

    protected get disableReactivePropertyChanges():boolean {
    return true;
  }

  private addLists = async (webUrl: string): Promise<void> => {
    try {
      this.lists = [];
      const lists: ISPList[] = await getLists(webUrl, 0);
      for (const list of lists) {
        this.lists.push({
          key: list.Id,
          text: list.Title,
        });
      }
    } catch (error) {
      console.log(error);
      this._messageError = error.message;
    }
  };

  protected async onPropertyPaneConfigurationStart():Promise<void> {
    if (
      this.properties.titleFieldName ||
      this.properties.descriptionFieldName ||
      this.properties.dateFieldName ||
      this.properties.imageUrlFieldName ||
      this.properties.listId ||
      (this.properties.sites && this.properties.sites.length)
    ) {
      if (!this.lists.length) {
        await this.addLists(this.properties.sites[0].url);
        this.context.propertyPane.refresh();
      }
      if (!this.listColumns.length && this.properties.listId) {
        await this.addListColumns(this.properties.listId);
        this.context.propertyPane.refresh();
      }
    }
  }

  protected async onPropertyPaneFieldChanged(
    propertyPath: string,
    oldValue: unknown,
    newValue: unknown
  ):Promise<void> {
    if (propertyPath === "listId") {
      this.listColumns = [];
      console.log("listd", this.properties.listId);
      if (newValue  as string === "") {
        this.properties.titleFieldName = "";
        this.properties.descriptionFieldName = "";
        this.properties.dateFieldName = "";
        this.properties.imageUrlFieldName = "";
        this.properties.titleLink = "";
        this.properties.numberItems = 6;
        this.context.propertyPane.refresh();
        return;
      } else {
        this.context.propertyPane.refresh();
        await this.addListColumns(newValue as string);
        this.context.propertyPane.refresh();
      }
    }
    if (propertyPath === "sites") {

       const value:IPropertyFieldSite[] = newValue as IPropertyFieldSite[];
       if (value  && !value.length) {
        this.properties.titleFieldName = "";
        this.properties.descriptionFieldName = "";
        this.properties.dateFieldName = "";
        this.properties.imageUrlFieldName = "";
        this.properties.listId = "";
        this.properties.titleLink = "";
        this.properties.numberItems = 6;
        this.context.propertyPane.refresh();
        return;
      } else {
        this.context.propertyPane.refresh();
        await this.addLists(value[0].url);
        this.context.propertyPane.refresh();
      }
    }
  }

  private async addListColumns(newValue: string) {
    try {
      this.listColumns = [];

      this.listColumns = await getListColumns(
        this.properties.sites[0].url,
        newValue
      );

      for (const _column of this.listColumns) {
        if (
          (_column.TypeAsString === "Text" ||
            _column.TypeAsString === "Note") &&
          (_column.RichText === false || _column.RichText === undefined)
        ) {
          this.textColumns.push({
            key: _column.InternalName,
            text: _column.Title,
          });
        }
        if (_column.TypeAsString === "DateTime") {
          this.dateColumns.push({
            key: _column.InternalName,
            text: _column.Title,
          });
        }
        if (_column.TypeAsString === "URL") {
          this.URLColumns.push({
            key: _column.InternalName,
            text: _column.Title,
          });
        }
      }
    } catch (error) {
      console.log(error);
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const groupFields: IPropertyPaneField<any>[] = groups.groupFields;

    groupFields.push(
      PropertyFieldSitePicker("sites", {
        label: "Select site",
        initialSites: this.properties.sites,
        context: this.context,
        deferredValidationTime: 500,
        multiSelect: false,
        onPropertyChange: this.onPropertyPaneFieldChanged,
        properties: this.properties,
        key: "sitesFieldId",
      })
    );
    if (this.properties.sites && this.properties.sites.length) {
      groupFields.push(
        PropertyPaneDropdown("listId", {
          label: strings.ListIdLabel,
          options: this.lists,
          selectedKey: this.properties.listId,
        })
      );
      // Show Columns
      if (this.listColumns.length) {
        groupFields.push(
          PropertyPaneDropdown("titleFieldName", {
            label: strings.TitleFieldLabel,
            options: this.textColumns,

            selectedKey: this.properties.titleFieldName,
          })
        );
        groupFields.push(
          PropertyPaneDropdown("dateFieldName", {
            label: "Select field with published date",
            options: this.dateColumns,
            selectedKey: this.properties.dateFieldName,
          })
        );
        groupFields.push(
          PropertyPaneDropdown("descriptionFieldName", {
            label: "Select field with description",
            options: this.textColumns,
            selectedKey: this.properties.descriptionFieldName,
          })
        );
        groupFields.push(
          PropertyPaneDropdown("imageUrlFieldName", {
            label: "Select field width image url",
            options: this.URLColumns,
            selectedKey: this.properties.imageUrlFieldName,
          })
        );
        groupFields.push(
          PropertyPaneDropdown("titleLink", {
            label: "Select field for title link",
            options: this.URLColumns,
            selectedKey: this.properties.titleLink,
          })
        );
        groupFields.push(
          PropertyPaneSlider("numberItems", {
            label: "Number Items to Show",
            min: 3,
            max: 20,
            value: this.properties.numberItems
              ? this.properties.numberItems
              : 3,
          })
        );
      }
    }

    const _panelConfiguration: IPropertyPaneConfiguration = { pages: _pages };
    return _panelConfiguration;
  }
}
