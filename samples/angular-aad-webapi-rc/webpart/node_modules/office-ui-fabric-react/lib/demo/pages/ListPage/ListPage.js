"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var index_1 = require('../../components/index');
var List_Basic_Example_1 = require('./examples/List.Basic.Example');
var List_Mail_Example_1 = require('./examples/List.Mail.Example');
var List_Grid_Example_1 = require('./examples/List.Grid.Example');
var data_1 = require('../../utilities/data');
var ListBasicExampleCode = require('./examples/List.Basic.Example.tsx');
var ListMailExampleCode = require('./examples/List.Mail.Example.tsx');
var ListGridExampleCode = require('./examples/List.Grid.Example.tsx');
var pageroute_1 = require('../../utilities/pageroute');
var AppState_1 = require('../../components/App/AppState');
var _cachedItems;
var ListPage = (function (_super) {
    __extends(ListPage, _super);
    function ListPage() {
        _super.call(this);
        this._url = pageroute_1.getPageRouteFromState(AppState_1.AppState, 'Basic components', 'List');
        if (!_cachedItems) {
            _cachedItems = data_1.createListItems(5000);
        }
    }
    ListPage.prototype.render = function () {
        return (React.createElement(index_1.ComponentPage, {title: 'List', componentName: 'ListExample', exampleCards: React.createElement("div", null, 
            React.createElement(index_1.ExampleCard, {title: 'List of 5000 grid items', isOptIn: true, code: ListGridExampleCode}, 
                React.createElement(List_Grid_Example_1.ListGridExample, {items: _cachedItems})
            ), 
            React.createElement(index_1.ExampleCard, {title: 'List of 5000 variable height items', isOptIn: true, code: ListBasicExampleCode}, 
                React.createElement(List_Basic_Example_1.ListBasicExample, {items: _cachedItems})
            ), 
            React.createElement(index_1.ExampleCard, {title: 'Fixed list of 5000 email tiles', isOptIn: true, code: ListMailExampleCode}, 
                React.createElement(List_Mail_Example_1.ListMailExample, {items: _cachedItems})
            )), propertiesTables: React.createElement(index_1.PropertiesTableSet, {componentName: 'List'}), overview: React.createElement("div", null, 
            React.createElement("p", null, 
                React.createElement("span", null, "List provides a base component for rendering large sets of items. It is agnostic of layout, the tile component used, and selection management. These concerns can be layered separately.")
            ), 
            React.createElement("p", null, 
                React.createElement("b", null, "Performance is important, and DOM content is expensive. Therefore limit what you render."), 
                " Unlike a simple for loop that renders all items in a set, a List uses ui virtualization. It only renders a subset of items, and as you scroll around, the subset of rendered content is shifted to what you're looking at. This gives a much better experience for large sets, especially when the per-item components are complex/render intensive/network intensive."), 
            React.createElement("p", null, "Lists break down the set of items passed in into pages. Only pages within a \"materialized window\" are actually rendered. As that window changes due to scroll events, pages that fall outside that window are removed, and their layout space is remembered and pushed into spacer elements. This gives the user the experience of browsing massive amounts of content but only using a small number of actual elements. This gives the browser much less layout to resolve, and gives React DOM diffing much less content to worry about.")), route: this._url, isHeaderVisible: this.props.isHeaderVisible}));
    };
    return ListPage;
}(React.Component));
exports.ListPage = ListPage;

//# sourceMappingURL=ListPage.js.map
