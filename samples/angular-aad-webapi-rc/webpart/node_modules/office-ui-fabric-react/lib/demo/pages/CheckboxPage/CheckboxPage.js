"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var index_1 = require('../../components/index');
var Checkbox_Basic_Example_1 = require('./examples/Checkbox.Basic.Example');
var pageroute_1 = require('../../utilities/pageroute');
var AppState_1 = require('../../components/App/AppState');
var CheckboxBasicExampleCode = require('./examples/Checkbox.Basic.Example.tsx');
var CheckboxPage = (function (_super) {
    __extends(CheckboxPage, _super);
    function CheckboxPage() {
        _super.call(this);
        this._url = pageroute_1.getPageRouteFromState(AppState_1.AppState, 'Basic components', 'Checkbox');
    }
    CheckboxPage.prototype.render = function () {
        return (React.createElement(index_1.ComponentPage, {title: 'Checkbox', componentName: 'CheckboxExample', exampleCards: React.createElement(index_1.ExampleCard, {title: 'Checkboxes', code: CheckboxBasicExampleCode}, 
            React.createElement(Checkbox_Basic_Example_1.CheckboxBasicExample, null)
        ), propertiesTables: React.createElement(index_1.PropertiesTableSet, {componentName: 'Checkbox'}), overview: React.createElement("div", null, 
            React.createElement("p", null, "A Checkbox is a UI element that allows users to switch between two mutually exclusive options (checked or unchecked, on or off) through a single click or tap. It can also be used to indicate a subordinate setting or preference when paired with another control."), 
            React.createElement("p", null, "A Checkbox is used to select or deselect action items. It can be used for a single item or for a list of multiple items that a user can choose from. The control has two selection states: unselected and selected."), 
            React.createElement("p", null, "Use a single Checkbox for a subordinate setting, such as with a \"Remember me?\" login scenario or with a terms of service agreement."), 
            React.createElement("p", null, "For a binary choice, the main difference between a Checkbox and a toggle switch is that the Checkbox is for status and the toggle switch is for action. You can delay committing a Checkbox interaction (as part of a form submit, for example), while you should immediately commit a toggle switch interaction. Also, only Checkboxes allow for multi-selection."), 
            React.createElement("p", null, "Use multiple Checkboxes for multi-select scenarios in which a user chooses one or more items from a group of choices that are not mutually exclusive.")), bestPractices: React.createElement("div", null), dos: React.createElement("div", null, 
            React.createElement("ul", null, 
                React.createElement("li", null, "Allow users to choose any combination of options when several Checkboxes are grouped together.")
            )
        ), donts: React.createElement("div", null, 
            React.createElement("ul", null, 
                React.createElement("li", null, "Don't use a Checkbox as an on/off control. Instead use a toggle switch."), 
                React.createElement("li", null, "Don’t use a Checkbox when the user can choose only one option from the group, use radio buttons instead."), 
                React.createElement("li", null, "Don't put two groups of Checkboxes next to each other. Separate the two groups with labels."))
        ), related: React.createElement("a", {href: 'https://github.com/OfficeDev/office-ui-fabric-js/blob/master/ghdocs/components/Checkbox.md'}, "Fabric JS"), route: this._url, isHeaderVisible: this.props.isHeaderVisible}));
    };
    return CheckboxPage;
}(React.Component));
exports.CheckboxPage = CheckboxPage;

//# sourceMappingURL=CheckboxPage.js.map
