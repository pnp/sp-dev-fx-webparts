"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var index_1 = require('../../components/index');
var GroupedList_Basic_Example_1 = require('./examples/GroupedList.Basic.Example');
var GroupedList_Custom_Example_1 = require('./examples/GroupedList.Custom.Example');
var pageroute_1 = require('../../utilities/pageroute');
var AppState_1 = require('../../components/App/AppState');
var GroupedListBasicExampleCode = require('./examples/GroupedList.Basic.Example.tsx');
var GroupedListCustomExampleCode = require('./examples/GroupedList.Custom.Example.tsx');
var GroupedListPage = (function (_super) {
    __extends(GroupedListPage, _super);
    function GroupedListPage() {
        _super.call(this);
        this._url = pageroute_1.getPageRouteFromState(AppState_1.AppState, 'Basic components', 'GroupedList');
    }
    GroupedListPage.prototype.render = function () {
        return (React.createElement(index_1.ComponentPage, {title: 'GroupedList', componentName: 'GroupedListExample', exampleCards: React.createElement("div", null, 
            React.createElement(index_1.ExampleCard, {title: 'GroupedList basic example', isOptIn: true, code: GroupedListBasicExampleCode}, 
                React.createElement(GroupedList_Basic_Example_1.GroupedListBasicExample, null)
            ), 
            React.createElement(index_1.ExampleCard, {title: 'GroupedList example with custom header and footer', isOptIn: true, code: GroupedListCustomExampleCode}, 
                React.createElement(GroupedList_Custom_Example_1.GroupedListCustomExample, null)
            )), propertiesTables: React.createElement(index_1.PropertiesTableSet, {componentName: 'GroupedList'}), overview: React.createElement("p", null, "Allows you to render a set of items as multiple lists with various grouping properties."), route: this._url, isHeaderVisible: this.props.isHeaderVisible}));
    };
    return GroupedListPage;
}(React.Component));
exports.GroupedListPage = GroupedListPage;

//# sourceMappingURL=GroupedListPage.js.map
