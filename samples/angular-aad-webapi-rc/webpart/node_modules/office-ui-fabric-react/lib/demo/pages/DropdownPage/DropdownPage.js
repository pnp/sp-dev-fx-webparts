"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var index_1 = require('../../components/index');
var Dropdown_Basic_Example_1 = require('./examples/Dropdown.Basic.Example');
var pageroute_1 = require('../../utilities/pageroute');
var AppState_1 = require('../../components/App/AppState');
var DropdownBasicExampleCode = require('./examples/Dropdown.Basic.Example.tsx');
var DropdownPage = (function (_super) {
    __extends(DropdownPage, _super);
    function DropdownPage() {
        _super.call(this);
        this._url = pageroute_1.getPageRouteFromState(AppState_1.AppState, 'Basic components', 'Dropdown');
    }
    DropdownPage.prototype.render = function () {
        return (React.createElement(index_1.ComponentPage, {title: 'Dropdown', componentName: 'DropdownExample', exampleCards: React.createElement(index_1.ExampleCard, {title: 'Dropdown', code: DropdownBasicExampleCode}, 
            React.createElement(Dropdown_Basic_Example_1.DropdownBasicExample, null)
        ), propertiesTables: React.createElement(index_1.PropertiesTableSet, {componentName: 'Dropdown'}), overview: React.createElement("div", null, 
            React.createElement("p", null, "A Dropdown is a list in which the selected item is always visible, and the others are visible on demand by clicking a drop-down button. They are used to simplify the design and make a choice within the UI. When closed, only the selected item is visible. When users click the drop-down button, all the options become visible. To change the value, users open the list and click another value or use the arrow keys (up and down) to select a new value.")
        ), bestPractices: React.createElement("div", null), dos: React.createElement("div", null, 
            React.createElement("ul", null, 
                React.createElement("li", null, "Use a Dropdown when there are multiple choices that can be collapsed under one title. Or if the list of items is long or when space is constrained."), 
                React.createElement("li", null, "Dropdowns contain shortened statements or words."), 
                React.createElement("li", null, "Use a Dropdown when the selected option is more important than the alternatives (in contrast to radio buttons where all the choices are visible putting more emphasis on the other options)."))
        ), donts: React.createElement("div", null), related: React.createElement("a", {href: 'https://github.com/OfficeDev/office-ui-fabric-js/blob/master/ghdocs/components/Dropdown.md'}, "Fabric JS"), route: this._url, isHeaderVisible: this.props.isHeaderVisible}));
    };
    return DropdownPage;
}(React.Component));
exports.DropdownPage = DropdownPage;

//# sourceMappingURL=DropdownPage.js.map
