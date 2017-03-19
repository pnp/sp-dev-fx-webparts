"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var index_1 = require('../../components/index');
var ChoiceGroup_Basic_Example_1 = require('./examples/ChoiceGroup.Basic.Example');
var pageroute_1 = require('../../utilities/pageroute');
var AppState_1 = require('../../components/App/AppState');
var ChoiceGroupBasicExampleCode = require('./examples/ChoiceGroup.Basic.Example.tsx');
var ChoiceGroupPage = (function (_super) {
    __extends(ChoiceGroupPage, _super);
    function ChoiceGroupPage() {
        _super.call(this);
        this._url = pageroute_1.getPageRouteFromState(AppState_1.AppState, 'Basic components', 'ChoiceGroup');
    }
    ChoiceGroupPage.prototype.render = function () {
        return (React.createElement(index_1.ComponentPage, {title: 'ChoiceGroup', componentName: 'ChoiceGroupExample', exampleCards: React.createElement(index_1.ExampleCard, {title: 'ChoiceGroups', code: ChoiceGroupBasicExampleCode}, 
            React.createElement(ChoiceGroup_Basic_Example_1.ChoiceGroupBasicExample, null)
        ), propertiesTables: React.createElement(index_1.PropertiesTableSet, {componentName: 'ChoiceGroup'}), overview: React.createElement("div", null, 
            React.createElement("p", null, "The ChoiceGroup component, also known as radio buttons, let users select one option from two or more choices. Each option is represented by one ChoiceGroup button; a user can select only one ChoiceGroup in a button group."), 
            React.createElement("p", null, "ChoiceGroup emphasize all options equally, and that may draw more attention to the options than necessary. Consider using other controls, unless the options deserve extra attention from the user. For example, if the default option is recommended for most users in most situations, use a Dropdown component instead."), 
            React.createElement("p", null, "If there are only two mutually exclusive options, combine them into a single Checkbox or Toggle switch. For example, use a Checkbox for \"I agree\" instead of ChoiceGroup buttons for \"I agree\" and \"I don't agree.\"")), bestPractices: React.createElement("div", null), dos: React.createElement("div", null, 
            React.createElement("ul", null, 
                React.createElement("li", null, "Use when there are 2-7 options, if you have enough screen space and the options are important enough to be a good use of that screen space. Otherwise, use a Checkbox or Dropdown list. "), 
                React.createElement("li", null, "Use on wizard pages to make the alternatives clear, even if a Checkbox is otherwise acceptable."), 
                React.createElement("li", null, "List the options in a logical order, such as most likely to be selected to least, simplest operation to most complex, or least risk to most. Alphabetical ordering is not recommended because it is language dependent and therefore not localizable."), 
                React.createElement("li", null, "If none of the options is a valid choice, add another option to reflect this choice, such as \"None\" or \"Does not apply\"."), 
                React.createElement("li", null, "Select the safest (to prevent loss of data or system access) and most secure and private option as the default. If safety and security aren't factors, select the most likely or convenient option."), 
                React.createElement("li", null, "Align radio buttons vertically instead of horizontally, if possible. Horizontal alignment is harder to read and localize."))
        ), donts: React.createElement("div", null, 
            React.createElement("ul", null, 
                React.createElement("li", null, "Use when the options are numbers that have fixed steps, like 10, 20, 30. Use a Slider component instead."), 
                React.createElement("li", null, "Use if there are more than 7 options, use a Dropdown instead."), 
                React.createElement("li", null, "Nest with other ChoiceGroup or CheckBoxes. If possible, keep all the options at the same level."))
        ), related: React.createElement("a", {href: 'https://github.com/OfficeDev/office-ui-fabric-js/blob/master/ghdocs/components/ChoiceFieldGroup.md'}, "Fabric JS"), route: this._url, isHeaderVisible: this.props.isHeaderVisible}));
    };
    return ChoiceGroupPage;
}(React.Component));
exports.ChoiceGroupPage = ChoiceGroupPage;

//# sourceMappingURL=ChoiceGroupPage.js.map
