import * as React from "react";
import * as ReactDom from "react-dom";
import { Version, DisplayMode } from "@microsoft/sp-core-library";
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneDropdown,
  IPropertyPaneDropdownOption,
  IPropertyPaneField,
  IPropertyPaneGroup,
  PropertyPaneLabel,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart, IPropertyPaneAccessor, PropertyPaneToggle } from "@microsoft/sp-webpart-base";
import { IFieldInfo, FieldTypes } from "@pnp/sp/fields/types";
import * as strings from "RestaurantMenuWebPartStrings";
import { RestaurantMenu } from "./components/RestaurantMenu";
import { IRestaurantMenuProps } from "./components/IRestaurantMenuProps";
import {
  PropertyFieldListPicker,
  PropertyFieldListPickerOrderBy,
} from "@pnp/spfx-property-controls/lib/PropertyFieldListPicker";
import {
  PropertyFieldSitePicker,
  IPropertyFieldSite,
} from "@pnp/spfx-property-controls/lib/PropertyFieldSitePicker";
import { PropertyFieldMessage} from '@pnp/spfx-property-controls/lib/PropertyFieldMessage';
import { sp } from "@pnp/sp";
import {
  ThemeProvider,
  ThemeChangedEventArgs,
  IReadonlyTheme,
} from "@microsoft/sp-component-base";
import { loadTheme, IDropdownOption, MessageBarType } from "office-ui-fabric-react";
import { useGetListFields } from "../../hooks/useSPList";
import { filter, Dictionary } from "lodash";
const teamsDefaultTheme = require('../../Common/TeamsDefaultTheme.json');
const teamsDarkTheme = require('../../Common/TeamsDarkTheme.json');
const teamsContrastTheme = require('../../Common/TeamsContrastTheme.json');

export interface IRestaurantMenuWebPartProps {
  title: string;
  site: IPropertyFieldSite[];
  listId: string;
  dateFieldName: string;
  dietFieldName: string;
  soupFieldName: string;
  meatFieldName: string;
  fishFieldName: string;
  veganFieldName: string;
  dessertFieldName: string;
  displayMode: DisplayMode;
  updateProperty: (value: string) => void;
  propertyPanel: IPropertyPaneAccessor;
  showBox: boolean;
}

export default class RestaurantMenuWebPart extends BaseClientSideWebPart<
  IRestaurantMenuWebPartProps
> {
  private fieldDateOptions: IPropertyPaneDropdownOption[] = [];
  private fieldSoupOptions: IPropertyPaneDropdownOption[] = [];
  private fieldMeatOptions: IPropertyPaneDropdownOption[] = [];
  private fieldFishOptions: IPropertyPaneDropdownOption[] = [];
  private fieldDietOptions: IPropertyPaneDropdownOption[] = [];
  private fieldVeganOptions: IPropertyPaneDropdownOption[] = [];
  private fieldDessertOptions: IPropertyPaneDropdownOption[] = [];
  private _themeProvider: ThemeProvider;
  private _themeVariant: IReadonlyTheme | undefined;

  private _listProperty: IPropertyPaneField<any> = {} as IPropertyPaneField<
    any
  >;
  private listFieldProperties: IPropertyPaneField<any>[] = [];

  protected async onInit(): Promise<void> {
    sp.setup({
      spfxContext: this.context,
    });

    this._themeProvider = this.context.serviceScope.consume(
      ThemeProvider.serviceKey

    );
    // If it exists, get the theme variant
    this._themeVariant = this._themeProvider.tryGetTheme();
    // Register a handler to be notified if the theme variant changes
    this._themeProvider.themeChangedEvent.add(
      this,
      this._handleThemeChangedEvent
    );

    if (this.context.sdks.microsoftTeams) {
      // in teams ?
      const context = this.context.sdks.microsoftTeams!.context;

      console.log("theme", this._themeVariant);
      this._applyTheme(context.theme || "default");
      this.context.sdks.microsoftTeams.teamsJs.registerOnThemeChangeHandler(
        this._applyTheme
      );
    }

    return Promise.resolve();
  }

  /**
   * Update the current theme variant reference and re-render.
   *
   * @param args The new theme
   */
  private _handleThemeChangedEvent(args: ThemeChangedEventArgs): void {
    this._themeVariant = args.theme;
    console.log("theme", this._themeVariant);
    this.render();
  }

  // Apply btheme id in Teams
  private _applyTheme = (theme: string): void => {
    this.context.domElement.setAttribute("data-theme", theme);
    document.body.setAttribute("data-theme", theme);

    if (theme == "dark") {
      loadTheme({
        palette: teamsDarkTheme,
      });
    }

    if (theme == "default") {
      loadTheme({
        palette: teamsDefaultTheme,
      });
    }

    if (theme == "contrast") {
      loadTheme({
        palette: teamsContrastTheme,
      });
    }
  }

  protected get disableReactivePropertyChanges() {
    return true;
  }

  public render(): void {
    const element: React.ReactElement<IRestaurantMenuProps> = React.createElement(
      RestaurantMenu,
      {
        title: this.properties.title,
        site: this.properties.site,
        listId: this.properties.listId,
        propertyPanel: this.context.propertyPane,
        dateFieldName: this.properties.dateFieldName,
        dietFieldName: this.properties.dietFieldName,
        soupFieldName: this.properties.soupFieldName,
        meatFieldName: this.properties.meatFieldName,
        fishFieldName: this.properties.fishFieldName,
        veganFieldName: this.properties.veganFieldName,
        dessertFieldName: this.properties.dessertFieldName,
        showBox: this.properties.showBox,
        themeVariant: this._themeVariant,
        displayMode: this.displayMode,
        updateProperty: (value: string) => {
          this.properties.title = value;
      },
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

  protected async onPropertyPaneFieldChanged(
    propertyPath: string,
    oldValue: any,
    newValue: any
  ): Promise<void> {
    let _fieldsOptions: IPropertyPaneDropdownOption[] = [];
    if (propertyPath === "site" && newValue) {
      this.properties.listId = undefined;
      this.properties.fishFieldName= '';
      this.properties.dateFieldName= '';
      this.properties.dessertFieldName= '';
      this.properties.soupFieldName= '';
      this.properties.meatFieldName= '';
      this.properties.veganFieldName= '';

      this.context.propertyPane.refresh;
    }
    if (propertyPath === "listId" && newValue) {
      this.properties.listId = newValue;
      super.onPropertyPaneFieldChanged(propertyPath, oldValue, newValue);
      this.properties.fishFieldName= '';
      this.properties.dateFieldName= '';
      this.properties.dessertFieldName= '';
      this.properties.soupFieldName= '';
      this.properties.meatFieldName= '';

      this.properties.veganFieldName= '';

      this.fieldSoupOptions = [];
      this.fieldDessertOptions = [];
      this.fieldDietOptions = [];
      this.fieldFishOptions = [];
      this.fieldMeatOptions = [];
      this.fieldVeganOptions = [];
      this.fieldDateOptions = [];
      this.context.propertyPane.refresh();
      const fields: IFieldInfo[] = await useGetListFields(
        this.properties.site[0].url,
        newValue
      );
      for (const field of fields) {
        if (field.FieldTypeKind == FieldTypes.DateTime) {
          this.fieldDateOptions.push({
            key: field.InternalName,
            text: field.Title,
          });
        }
        if (
          field.FieldTypeKind == FieldTypes.Text ||
          field.FieldTypeKind == FieldTypes.Note
        ) {
          _fieldsOptions.push({ key: field.InternalName, text: field.Title });
        }
      }
      this.fieldDessertOptions = _fieldsOptions;
      this.fieldDietOptions = _fieldsOptions;
      this.fieldFishOptions = _fieldsOptions;
      this.fieldMeatOptions = _fieldsOptions;
      this.fieldSoupOptions = _fieldsOptions;
      this.fieldVeganOptions = _fieldsOptions;

      this.context.propertyPane.refresh();
    }


  }

  protected async onPropertyPaneConfigurationStart(): Promise<void> {
    if (this.properties.listId) {
      if (this.fieldDateOptions.length > 0) {
        return;
      }
      const fields: IFieldInfo[] = await useGetListFields(
        this.properties.site[0].url,
        this.properties.listId
      );
      const _fieldsOptions: IPropertyPaneDropdownOption[] = [];

      for (const field of fields) {
        if (field.FieldTypeKind == FieldTypes.DateTime) {
          this.fieldDateOptions.push({
            key: field.InternalName,
            text: field.Title,
          });
        }
        if (
          field.FieldTypeKind == FieldTypes.Text ||
          field.FieldTypeKind == FieldTypes.Note
        ) {
          _fieldsOptions.push({ key: field.InternalName, text: field.Title });
        }
      }
      this.fieldDessertOptions = _fieldsOptions;
      this.fieldDietOptions = _fieldsOptions;
      this.fieldFishOptions = _fieldsOptions;
      this.fieldMeatOptions = _fieldsOptions;
      this.fieldSoupOptions = _fieldsOptions;
      this.fieldVeganOptions = _fieldsOptions;
      this.context.propertyPane.refresh();
    }
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    if (this.properties.site.length > 0) {
      this._listProperty = PropertyFieldListPicker("listId", {
        context: this.context,
        label: "Select List",
        onPropertyChange: this.onPropertyPaneFieldChanged,
        properties: this.properties,
        baseTemplate: 100,
        deferredValidationTime: 300,
        key: "listfilter",
        selectedList: this.properties.listId,
        multiSelect: false,
        webAbsoluteUrl: this.properties.site[0].url,
        orderBy: PropertyFieldListPickerOrderBy.Title,
      });
    } else {
      this._listProperty = {} as IPropertyPaneField<any>;
    }

    // new List
    if (this.properties.listId) {
      this.listFieldProperties = [];
      this.listFieldProperties = [
        PropertyPaneLabel('',{
          text: ""
        }),
        PropertyPaneLabel('',{
          text: "Field Mapping"
        }),
        PropertyPaneLabel('',{
          text: ""
        }),
        PropertyPaneDropdown("dateFieldName", {
          options: [{ key: "N/A", text: "Not available" },...this.fieldDateOptions],
          label: strings.DateFieldPropertyLabel,
          selectedKey: this.properties.dateFieldName || "N/A",
        }),
        PropertyFieldMessage("", {
          key: "MessageKey",
          text:strings.DateInformationMessage,
          messageType:  MessageBarType.info,
          isVisible: this.properties.dateFieldName === "N/A" ,
      }),
        PropertyPaneDropdown("soupFieldName", {
          options: [{ key: "N/A", text: "Not available" }, ...this.fieldSoupOptions],
          label: strings.SoupFieldPropertyLabel,
          selectedKey: this.properties.soupFieldName || "N/A",
        }),
        PropertyPaneDropdown("meatFieldName", {
          options:[{ key: "N/A", text: "Not available" },...this.fieldMeatOptions],
          label: strings.MeatFieldPropertyLabel,
          selectedKey: this.properties.meatFieldName || "N/A",
        }),
        PropertyPaneDropdown("fishFieldName", {
          options: [ { key: "N/A", text: "Not available" }, ...this.fieldFishOptions] ,
          label: strings.FishFieldPropertyLabel,
          selectedKey: this.properties.fishFieldName || "N/A",
        }),
        PropertyPaneDropdown("dietFieldName", {
          options: [ { key: "N/A", text: "Not available" }, ...this.fieldDietOptions] ,
          label: strings.DietFieldPropertyLabel,
          selectedKey: this.properties.dietFieldName || "N/A",
        }),
        PropertyPaneDropdown("veganFieldName", {
          options: [
            { key: "N/A", text: "Not available" },
            ...this.fieldVeganOptions,
          ],
          label: strings.VeganFieldPropertyLabel,
          selectedKey: this.properties.veganFieldName || "N/A",
        }),
        PropertyPaneDropdown("dessertFieldName", {
          options: [{ key: "N/A", text: "Not available" },...this.fieldDessertOptions],
          label: strings.DessertFieldPropertyLabel,
          selectedKey: this.properties.dessertFieldName || "N/A",
        }),
      ];
    } else {
      this.listFieldProperties = [];
    }

    // configuration panel default options
    const configuration: IPropertyPaneConfiguration = {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription,
          },
          displayGroupsAsAccordion: true,
          groups: [
            {
              groupName: strings.BasicGroupName,
              isCollapsed: true,
              groupFields: [
                PropertyPaneTextField("title", {
                  label: strings.DescriptionFieldLabel,
                }),
                PropertyPaneToggle("showBox", {
                  label: "Show background box ?",
                  checked: this.properties.showBox
                }),
              ],
            },
          ],
        },
      ],
    };

    // get groups first page
    const { groups } = configuration.pages[0];
    // SourceDataGroup
    const sourceDataGroup: IPropertyPaneGroup = {
      groupName: "Source of data",
      isCollapsed: true,

      groupFields: [
        PropertyFieldSitePicker("site", {
          label: "Select site",
          initialSites: this.properties.site || [],
          context: this.context,
          deferredValidationTime: 500,
          multiSelect: false,

          onPropertyChange: this.onPropertyPaneFieldChanged,
          properties: this.properties,
          key: "sitesFieldId",
        }),

        this._listProperty,
        ...this.listFieldProperties,
      ],
    };
    // Add aditional groups
    groups.push(sourceDataGroup);

    // return configuration
    return configuration;
  }
}
