"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var index_1 = require('../../../index');
var index_2 = require('../../components/index');
var PeoplePicker_Types_Example_1 = require('./examples/PeoplePicker.Types.Example');
var pageroute_1 = require('../../utilities/pageroute');
var AppState_1 = require('../../components/App/AppState');
var PeoplePickerTypesExampleCode = require('./examples/PeoplePicker.Types.Example.tsx');
var PeoplePickerPage = (function (_super) {
    __extends(PeoplePickerPage, _super);
    function PeoplePickerPage() {
        _super.call(this);
        this._url = pageroute_1.getPageRouteFromState(AppState_1.AppState, 'Basic components', 'PeoplePicker');
    }
    PeoplePickerPage.prototype.render = function () {
        return (React.createElement(index_2.ComponentPage, {title: 'PeoplePicker', componentName: 'PeoplePickerExample', exampleCards: React.createElement("div", null, 
            React.createElement(index_2.ExampleCard, {title: 'People Pickers', code: PeoplePickerTypesExampleCode}, 
                React.createElement(PeoplePicker_Types_Example_1.PeoplePickerTypesExample, null)
            )
        ), propertiesTables: React.createElement(index_2.PropertiesTableSet, {componentName: 'BasePicker', componentPath: 'components/pickers/'}), overview: React.createElement("div", null, 
            React.createElement(index_1.Link, {target: '_blank', href: 'http://dev.office.com/fabric/components/PeoplePicker'}, " PeoplePicker "), 
            React.createElement("span", null, " are used to pick recipients.")), route: this._url, isHeaderVisible: this.props.isHeaderVisible, bestPractices: React.createElement("div", null, "The PeoplePicker is used to select one or more entities, such as people or groups. Entry points for PeoplePickers are typically specialized TextField-like input fields known as a \"well\", which are used to search for recipients from a list. When a recipient is selected from the list, it is added to the well as a specialized Persona that can be interacted with or removed. Clicking on a Persona from the well should invoke a PersonaCard or open a profile pane for that recipient."), dos: React.createElement("div", null, 
            React.createElement("ul", null, 
                React.createElement("li", null, "Use the PeoplePicker to quickly search for a few people"), 
                React.createElement("li", null, "Use the PeoplePicker to manage a group of people"), 
                React.createElement("li", null, "Use the MemberList PeoplePicker to display selections below the input box"), 
                React.createElement("li", null, "Use defaultSelectedItems when some people have already been selected"))
        ), donts: React.createElement("div", null, 
            React.createElement("ul", null, 
                React.createElement("li", null, "Use the PeoplePicker to select something other than people"), 
                React.createElement("li", null, "Use the PeoplePicker to only display people"), 
                React.createElement("li", null, "Use the PeoplePicker without sufficient space"))
        )}));
    };
    return PeoplePickerPage;
}(React.Component));
exports.PeoplePickerPage = PeoplePickerPage;

//# sourceMappingURL=PeoplePickerPage.js.map
