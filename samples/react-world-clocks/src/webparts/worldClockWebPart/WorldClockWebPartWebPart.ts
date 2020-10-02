import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";

import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneToggle,
  PropertyPaneDropdown,
  IPropertyPaneDropdownOption,
} from "@microsoft/sp-property-pane";

import * as strings from "WorldClockWebPartWebPartStrings";
import WorldClockWebPart from "./components/WorldClockWebPart";
import {
  IWorldClockWebPartProps,
  ILocation,
} from "./components/IWorldClockWebPartProps";

export interface IWorldClockWebPartWebPartProps {
  selectedList: string;
  description: string;
  ShowTime: boolean;
  showActiveOnly: boolean;
  showTitle: boolean;
}
import { sp } from "@pnp/sp/presets/all";

import {
  PropertyFieldListPicker,
  PropertyFieldListPickerOrderBy,
} from "@pnp/spfx-property-controls/lib/PropertyFieldListPicker";
import { groupOne } from "office-ui-fabric-react";

export default class WorldClockWebPartWebPart extends BaseClientSideWebPart<
  IWorldClockWebPartWebPartProps
> {
  public render(): void {
    const element: React.ReactElement<IWorldClockWebPartProps> = React.createElement(
      WorldClockWebPart,
      {
        selectedList: this.properties.selectedList,
        description: this.properties.description,
        loadLocations: this._getLocations.bind(this),
        ShowTime: this.properties.ShowTime,
        showActiveOnly: this.properties.showActiveOnly,
        showTitle: this.properties.showTitle,
        updateProperty: (value: string) => {
          this.properties.description = value;
        },
        displayMode: this.displayMode,
        onConfigure: () => {
          this.context.propertyPane.open();
        },
      }
    );

    ReactDom.render(element, this.domElement);
  }

  public onInit(): Promise<void> {
    return super.onInit().then((_) => {
      sp.setup({
        spfxContext: this.context,
      });
    });
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  //  protected get disableReactivePropertyChanges(): boolean {
  //    return true;
  //  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription,
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField("description", {
                  label: strings.DescriptionFieldLabel,
                }),
                PropertyFieldListPicker("selectedList", {
                  label: "Select a list",
                  selectedList: this.properties.selectedList,
                  includeHidden: false,
                  orderBy: PropertyFieldListPickerOrderBy.Title,
                  disabled: false,
                  webAbsoluteUrl: this.context.pageContext.web.absoluteUrl,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                  context: this.context,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: "listPickerFieldId",
                }),
              ],
            },
            {
              groupName: strings.BasicViewGroupName,
              groupFields: [
                PropertyPaneToggle("ShowTime", {
                  label: strings.IsShowTimeFieldLabel,
                  checked: this.properties.ShowTime,
                  key: "ShowTime",
                }),
                PropertyPaneToggle("showActiveOnly", {
                  label: strings.ShowActiveOnlyFieldLabel,
                  checked: this.properties.showActiveOnly,
                  key: "togshowActiveOnly",
                }),
                ,
                PropertyPaneToggle("showTitle", {
                  label: strings.showTitleFieldLabel,
                  checked: this.properties.showTitle,
                  key: "togshowTitle",
                }),
              ],
            },
          ],
        },
      ],
    };
  }
  private _getLocations(): Promise<ILocation[]> {
    //console.log(this.properties);
    //"World Clocks"
    // debugger;
    //console.log('__');
    //console.log(this.context.pageContext.web.absoluteUrl);
    //console.log(this.properties);

    //let webLocation = new this.sp.web pnp.c(this.context.pageContext.web.absoluteUrl);
    let filter: string = "";
    console.log(this.properties.showActiveOnly);
    if (this.properties.showActiveOnly) {
      filter = "IsActive eq 1";
    } else {
      filter = "";
    }

    return sp.web.lists
      .getById(this.properties.selectedList)
      .items.filter(filter)
      .select("Title", "GMTValues")
      .orderBy("ListOrder")
      .get()
      .then((Locations) => {
        return Locations;
      })
      .catch((error) => {
        console.log("error loading all location....");
        console.log(error);
        return [];
      });
  }
}
