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
import { PropertyPaneToggle, PropertyPaneDropdown, } from "@microsoft/sp-property-pane";
import { sp } from "@pnp/sp/presets/all";
import "core-js/es6/array";
import "es6-map/implement";
import "core-js/modules/es6.array.find";
import { PropertyFieldListPicker, PropertyFieldListPickerOrderBy, } from "@pnp/spfx-property-controls/lib/PropertyFieldListPicker";
import * as strings from "ReactAccordionWebPartStrings";
import ReactAccordion from "./components/ReactAccordion";
var ReactAccordionWebPart = /** @class */ (function (_super) {
    __extends(ReactAccordionWebPart, _super);
    function ReactAccordionWebPart() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.columnsDropdownDisabled = true;
        _this.choicesDropdownDisabled = true;
        return _this;
    }
    ReactAccordionWebPart.prototype.onInit = function () {
        var _this = this;
        return _super.prototype.onInit.call(this).then(function (_) {
            sp.setup({
                spfxContext: _this.context,
            });
        });
    };
    ReactAccordionWebPart.prototype.render = function () {
        var _this = this;
        var element = React.createElement(ReactAccordion, {
            listId: this.properties.listId,
            columnTitle: this.properties.columnTitle,
            selectedChoice: this.properties.selectedChoice,
            accordionTitle: this.properties.accordionTitle,
            accordianTitleColumn: this.properties.accordianTitleColumn,
            accordianContentColumn: this.properties.accordianContentColumn,
            allowZeroExpanded: this.properties.allowZeroExpanded,
            allowMultipleExpanded: this.properties.allowMultipleExpanded,
            displayMode: this.displayMode,
            updateProperty: function (value) {
                _this.properties.accordionTitle = value;
            },
            onConfigure: function () {
                _this.context.propertyPane.open();
            },
        });
        ReactDom.render(element, this.domElement);
    };
    ReactAccordionWebPart.prototype.onDispose = function () {
        ReactDom.unmountComponentAtNode(this.domElement);
    };
    Object.defineProperty(ReactAccordionWebPart.prototype, "disableReactivePropertyChanges", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ReactAccordionWebPart.prototype, "dataVersion", {
        get: function () {
            return Version.parse("1.0");
        },
        enumerable: true,
        configurable: true
    });
    ReactAccordionWebPart.prototype.loadColumns = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!_this.properties.listId) {
                console.log("No List Selected");
                return null;
            }
            var spListColumns = sp.web.lists
                .getById(_this.properties.listId)
                .fields.filter("ReadOnlyField eq false and Hidden eq false and TypeAsString eq 'Choice'")
                .get();
            spListColumns.then(function (columnResult) {
                var listColumns = [];
                columnResult.forEach(function (column) {
                    listColumns.push({
                        key: column.Title,
                        text: column.Title,
                    });
                });
                resolve(listColumns);
            });
        });
    };
    ReactAccordionWebPart.prototype.loadAllColumns = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!_this.properties.listId) {
                console.log("No List Selected");
                return null;
            }
            var spListColumns = sp.web.lists
                .getById(_this.properties.listId)
                .fields.filter("ReadOnlyField eq false and Hidden eq false")
                .get();
            spListColumns.then(function (columnResult) {
                var listColumns = [];
                columnResult.forEach(function (column) {
                    listColumns.push({
                        key: column.InternalName,
                        text: column.Title + " - [" + column.InternalName + "]",
                    });
                });
                resolve(listColumns);
            });
        });
    };
    ReactAccordionWebPart.prototype.loadCateogryChoices = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!_this.properties.columnTitle) {
                console.log("No Columns Selected");
                return null;
            }
            var categoryField = sp.web.lists
                .getById(_this.properties.listId)
                .fields.getByInternalNameOrTitle(_this.properties.columnTitle);
            var choices = categoryField.select("Choices")();
            choices.then(function (result) {
                //console.clear();
                //console.log(result.Choices);
                var columnChoices = [];
                result.Choices.forEach(function (choice) {
                    columnChoices.push({
                        key: choice,
                        text: choice,
                    });
                });
                resolve(columnChoices);
            });
        });
    };
    ReactAccordionWebPart.prototype.onPropertyPaneConfigurationStart = function () {
        var _this = this;
        this.columnsDropdownDisabled = !this.properties.listId;
        this.choicesDropdownDisabled = !this.properties.columnTitle;
        //if (this.lists) {
        //  return;
        //}
        this.context.statusRenderer.displayLoadingIndicator(this.domElement, "lists, column and choices");
        if (this.properties.listId) {
            this.loadColumns().then(function (columnOptions) {
                _this.listColumns = columnOptions;
                _this.columnsDropdownDisabled = !_this.properties.listId;
                _this.context.propertyPane.refresh();
                _this.context.statusRenderer.clearLoadingIndicator(_this.domElement);
                _this.render();
            });
            this.loadAllColumns().then(function (allcolumnOptions) {
                _this.allListColumns = allcolumnOptions;
                _this.columnsDropdownDisabled = !_this.properties.listId;
                _this.context.propertyPane.refresh();
                _this.context.statusRenderer.clearLoadingIndicator(_this.domElement);
                _this.render();
            });
        }
        if (this.properties.columnTitle) {
            this.loadCateogryChoices().then(function (choiceOptions) {
                _this.columnChoices = choiceOptions;
                _this.choicesDropdownDisabled = !_this.properties.columnTitle;
                _this.context.propertyPane.refresh();
                _this.context.statusRenderer.clearLoadingIndicator(_this.domElement);
                _this.render();
            });
        }
    };
    ReactAccordionWebPart.prototype.onPropertyPaneFieldChanged = function (propertyPath, oldValue, newValue) {
        // push new list value
        var _this = this;
        // communicate loading items
        if (this.properties.listId) {
            this.context.statusRenderer.displayLoadingIndicator(this.domElement, "Columns");
            this.loadColumns().then(function (columnOptions) {
                // store items
                _this.listColumns = columnOptions;
                // enable item selector
                _this.columnsDropdownDisabled = false;
                // clear status indicator
                _this.context.statusRenderer.clearLoadingIndicator(_this.domElement);
                // re-render the web part as clearing the loading indicator removes the web part body
                _this.render();
                // refresh the item selector control by repainting the property pane
                _this.context.propertyPane.refresh();
            });
            this.loadAllColumns().then(function (allcolumnOptions) {
                _this.allListColumns = allcolumnOptions;
                _this.columnsDropdownDisabled = !_this.properties.listId;
                _this.context.propertyPane.refresh();
                _this.context.statusRenderer.clearLoadingIndicator(_this.domElement);
                _this.render();
            });
        }
        if (this.properties.columnTitle) {
            this.context.statusRenderer.displayLoadingIndicator(this.domElement, "Choices");
            this.loadCateogryChoices().then(function (choiceOption) {
                // store items
                _this.columnChoices = choiceOption;
                // enable item selector
                _this.choicesDropdownDisabled = false;
                // clear status indicator
                _this.context.statusRenderer.clearLoadingIndicator(_this.domElement);
                // re-render the web part as clearing the loading indicator removes the web part body
                _this.render();
                // refresh the item selector control by repainting the property pane
                _this.context.propertyPane.refresh();
            });
        }
        if (this.properties.selectedChoice) {
            this.context.statusRenderer.displayLoadingIndicator(this.domElement, "Data");
            this.context.statusRenderer.clearLoadingIndicator(this.domElement);
            this.render();
            this.context.propertyPane.refresh();
        }
    };
    ReactAccordionWebPart.prototype.getPropertyPaneConfiguration = function () {
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
                                PropertyFieldListPicker("listId", {
                                    label: "Select a list",
                                    selectedList: this.properties.listId,
                                    includeHidden: false,
                                    orderBy: PropertyFieldListPickerOrderBy.Title,
                                    disabled: false,
                                    onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                                    properties: this.properties,
                                    context: this.context,
                                    onGetErrorMessage: null,
                                    deferredValidationTime: 0,
                                    key: "listPickerFieldId",
                                }),
                                PropertyPaneDropdown("columnTitle", {
                                    label: "Select the (Choice) Column for Categories.",
                                    options: this.listColumns,
                                    disabled: this.columnsDropdownDisabled,
                                }),
                                PropertyPaneDropdown("selectedChoice", {
                                    label: "Select the Choice value for filter.",
                                    options: this.columnChoices,
                                    disabled: this.choicesDropdownDisabled,
                                }),
                                PropertyPaneDropdown("accordianTitleColumn", {
                                    label: "Select the Column for Accordion Title Rows.",
                                    options: this.allListColumns,
                                    disabled: this.choicesDropdownDisabled,
                                }),
                                PropertyPaneDropdown("accordianContentColumn", {
                                    label: "Select the Column for Accordion Content.",
                                    options: this.allListColumns,
                                    disabled: this.choicesDropdownDisabled,
                                }),
                                PropertyPaneToggle("allowZeroExpanded", {
                                    label: "Allow zero expanded",
                                    checked: this.properties.allowZeroExpanded,
                                    key: "allowZeroExpanded",
                                }),
                                PropertyPaneToggle("allowMultipleExpanded", {
                                    label: "Allow multi expand",
                                    checked: this.properties.allowMultipleExpanded,
                                    key: "allowMultipleExpanded",
                                }),
                            ],
                        },
                    ],
                },
            ],
        };
    };
    return ReactAccordionWebPart;
}(BaseClientSideWebPart));
export default ReactAccordionWebPart;
//# sourceMappingURL=ReactAccordionWebPart.js.map