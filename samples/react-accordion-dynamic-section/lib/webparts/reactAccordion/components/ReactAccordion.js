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
import styles from "./ReactAccordion.module.scss";
import { sp } from "@pnp/sp/presets/all";
import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";
import "./reactAccordion.css";
import { Accordion, AccordionItem, AccordionItemHeading, AccordionItemButton, AccordionItemPanel, } from "react-accessible-accordion";
var ReactAccordion = /** @class */ (function (_super) {
    __extends(ReactAccordion, _super);
    function ReactAccordion(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            items: new Array(),
            choices: new Array(),
            allowMultipleExpanded: _this.props.allowMultipleExpanded,
            allowZeroExpanded: _this.props.allowZeroExpanded,
        };
        _this.getListItems();
        return _this;
    }
    ReactAccordion.prototype.getListItems = function () {
        var _this = this;
        if (typeof this.props.listId !== "undefined" &&
            this.props.listId.length > 0 &&
            typeof this.props.columnTitle !== "undefined" &&
            this.props.columnTitle.length > 0 &&
            typeof this.props.selectedChoice !== "undefined" &&
            this.props.selectedChoice.length > 0) {
            var query = "<View><Query><Where><Eq><FieldRef Name='" +
                this.props.columnTitle +
                "'/><Value Type='Text'>" +
                this.props.selectedChoice +
                "</Value></Eq></Where></Query></View>";
            var theAccordianList = sp.web.lists.getById(this.props.listId);
            theAccordianList
                .getItemsByCAMLQuery({
                ViewXml: query,
            }) //.select("Title", "Answer", "Category")
                .then(function (results) {
                _this.setState({
                    items: results,
                });
            })
                .catch(function (error) {
                console.log("Failed to get list items!");
                console.log(error);
            });
        }
    };
    ReactAccordion.prototype.componentDidUpdate = function (prevProps) {
        if (prevProps.listId !== this.props.listId) {
            this.getListItems();
        }
        if (prevProps.allowMultipleExpanded !== this.props.allowMultipleExpanded ||
            prevProps.allowZeroExpanded !== this.props.allowZeroExpanded) {
            this.setState({
                allowMultipleExpanded: this.props.allowMultipleExpanded,
                allowZeroExpanded: this.props.allowZeroExpanded,
            });
        }
    };
    ReactAccordion.prototype.render = function () {
        var _this = this;
        var listSelected = typeof this.props.listId !== "undefined" && this.props.listId.length > 0;
        var _a = this.state, allowMultipleExpanded = _a.allowMultipleExpanded, allowZeroExpanded = _a.allowZeroExpanded;
        return (React.createElement("div", { className: styles.reactAccordion },
            !listSelected && (React.createElement(Placeholder, { iconName: "MusicInCollectionFill", iconText: "Configure your web part", description: "Select a list with a Title field and Content field to have its items rendered in a collapsible accordion format", buttonLabel: "Choose a List", onConfigure: this.props.onConfigure })),
            listSelected && (React.createElement("div", null,
                React.createElement(WebPartTitle, { displayMode: this.props.displayMode, title: this.props.selectedChoice, updateProperty: this.props.updateProperty }),
                React.createElement(Accordion, { allowZeroExpanded: allowZeroExpanded, allowMultipleExpanded: allowMultipleExpanded }, this.state.items.map(function (item) {
                    return (React.createElement(AccordionItem, null,
                        React.createElement(AccordionItemHeading, null,
                            React.createElement(AccordionItemButton, { title: item[_this.props.accordianTitleColumn] }, item[_this.props.accordianTitleColumn])),
                        React.createElement(AccordionItemPanel, null,
                            React.createElement("p", { dangerouslySetInnerHTML: {
                                    __html: item[_this.props.accordianContentColumn],
                                } }))));
                }))))));
    };
    return ReactAccordion;
}(React.Component));
export default ReactAccordion;
//# sourceMappingURL=ReactAccordion.js.map