var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { PropertyPaneTextField, PropertyPaneToggle, } from "@microsoft/sp-property-pane";
import * as strings from "WorldClockWebPartWebPartStrings";
import WorldClockWebPart from "./components/WorldClockWebPart";
import { sp } from "@pnp/sp/presets/all";
import { PropertyFieldListPicker, PropertyFieldListPickerOrderBy, } from "@pnp/spfx-property-controls/lib/PropertyFieldListPicker";
var WorldClockWebPartWebPart = /** @class */ (function (_super) {
    __extends(WorldClockWebPartWebPart, _super);
    function WorldClockWebPartWebPart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WorldClockWebPartWebPart.prototype.render = function () {
        var _this = this;
        var element = React.createElement(WorldClockWebPart, {
            selectedList: this.properties.selectedList,
            description: this.properties.description,
            loadLocations: this._getLocations.bind(this),
            ShowTime: this.properties.ShowTime,
            showActiveOnly: this.properties.showActiveOnly,
            showTitle: this.properties.showTitle,
            updateProperty: function (value) {
                _this.properties.description = value;
            },
            displayMode: this.displayMode,
            onConfigure: function () {
                _this.context.propertyPane.open();
            },
        });
        ReactDom.render(element, this.domElement);
    };
    WorldClockWebPartWebPart.prototype.onInit = function () {
        var _this = this;
        return _super.prototype.onInit.call(this).then(function (_) {
            sp.setup({
                spfxContext: _this.context,
            });
        });
    };
    WorldClockWebPartWebPart.prototype.onDispose = function () {
        ReactDom.unmountComponentAtNode(this.domElement);
    };
    Object.defineProperty(WorldClockWebPartWebPart.prototype, "dataVersion", {
        //  protected get disableReactivePropertyChanges(): boolean {
        //    return true;
        //  }
        get: function () {
            return Version.parse("1.0");
        },
        enumerable: true,
        configurable: true
    });
    WorldClockWebPartWebPart.prototype.getPropertyPaneConfiguration = function () {
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
    };
    WorldClockWebPartWebPart.prototype._getLocations = function () {
        //console.log(this.properties);
        //"World Clocks"
        // debugger;
        //console.log('__');
        //console.log(this.context.pageContext.web.absoluteUrl);
        //console.log(this.properties);
        //let webLocation = new this.sp.web pnp.c(this.context.pageContext.web.absoluteUrl);
        var filter = "";
        console.log(this.properties.showActiveOnly);
        if (this.properties.showActiveOnly) {
            filter = "IsActive eq 1";
        }
        else {
            filter = "";
        }
        return sp.web.lists
            .getById(this.properties.selectedList)
            .items.filter(filter)
            .select("Title", "GMTValues")
            .orderBy("ListOrder")
            .get()
            .then(function (Locations) {
            return Locations;
        })
            .catch(function (error) {
            console.log("error loading all location....");
            console.log(error);
            return [];
        });
    };
    return WorldClockWebPartWebPart;
}(BaseClientSideWebPart));
export default WorldClockWebPartWebPart;
//# sourceMappingURL=WorldClockWebPartWebPart.js.map