"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var index_1 = require('../../../index');
var index_2 = require('../../components/index');
var pageroute_1 = require('../../utilities/pageroute');
var AppState_1 = require('../../components/App/AppState');
var DetailsList_Basic_Example_1 = require('./examples/DetailsList.Basic.Example');
var DetailsListBasicExampleCode = require('./examples/DetailsList.Basic.Example.tsx');
var DetailsList_CustomColumns_Example_1 = require('./examples/DetailsList.CustomColumns.Example');
var DetailsListCustomColumnsExampleCode = require('./examples/DetailsList.CustomColumns.Example.tsx');
var DetailsList_CustomRows_Example_1 = require('./examples/DetailsList.CustomRows.Example');
var DetailsListCustomRowsExampleCode = require('./examples/DetailsList.CustomRows.Example.tsx');
var DetailsList_CustomGroupHeaders_Example_1 = require('./examples/DetailsList.CustomGroupHeaders.Example');
var DetailsListCustomGroupHeadersExampleCode = require('./examples/DetailsList.CustomGroupHeaders.Example.tsx');
var DetailsList_Advanced_Example_1 = require('./examples/DetailsList.Advanced.Example');
var DetailsListAdvancedExampleCode = require('./examples/DetailsList.Advanced.Example.tsx');
var DetailsListPage = (function (_super) {
    __extends(DetailsListPage, _super);
    function DetailsListPage() {
        _super.call(this);
        this._url = pageroute_1.getPageRouteFromState(AppState_1.AppState, 'Basic components', 'DetailsList');
    }
    DetailsListPage.prototype.render = function () {
        return (React.createElement(index_2.ComponentPage, {title: 'DetailsList', componentName: 'DetailsListExample', exampleCards: React.createElement("div", null, 
            React.createElement(index_2.ExampleCard, {title: 'Simple DetailsList with 500 items, filtering, marquee selection', isOptIn: true, code: DetailsListBasicExampleCode}, 
                React.createElement(DetailsList_Basic_Example_1.DetailsListBasicExample, null)
            ), 
            React.createElement(index_2.ExampleCard, {title: 'Rendering custom item columns with sorting', isOptIn: true, code: DetailsListCustomColumnsExampleCode}, 
                React.createElement(DetailsList_CustomColumns_Example_1.DetailsListCustomColumnsExample, null)
            ), 
            React.createElement(index_2.ExampleCard, {title: 'Rendering custom item rows', isOptIn: true, code: DetailsListCustomRowsExampleCode}, 
                React.createElement(DetailsList_CustomRows_Example_1.DetailsListCustomRowsExample, null)
            ), 
            ",", 
            React.createElement(index_2.ExampleCard, {title: 'Rendering custom group headers', isOptIn: true, code: DetailsListCustomGroupHeadersExampleCode}, 
                React.createElement(DetailsList_CustomGroupHeaders_Example_1.DetailsListCustomGroupHeadersExample, null)
            ), 
            React.createElement(index_2.ExampleCard, {title: 'Advanced DetailsList of 5000 items, variable row heights', isOptIn: true, code: DetailsListAdvancedExampleCode}, 
                React.createElement(DetailsList_Advanced_Example_1.DetailsListAdvancedExample, null)
            )), propertiesTables: React.createElement(index_2.PropertiesTableSet, {componentName: 'DetailsList'}), overview: React.createElement("div", null, 
            React.createElement("p", null, 
                "DetailsList is a derivative of the ", 
                React.createElement(index_1.Link, {href: '#/examples/list'}, "List"), 
                " component. It is a robust way to display an information rich collection of items. It can support powerful ways to aid a user in finding content with sorting, grouping and filtering. Lists are a great way to handle large amounts of content, but poorly designed Lists can be difficult to parse."), 
            React.createElement("p", null, "Use a DetailsList when density of information is critical. Lists can support single and multiple selection, as well as drag and drop and marquee selection. They are composed of a column header, which contains the metadata fields which are attached to the list items, and provide the ability to sort, filter and even group the list. List items are composed of selection, icon, and name columns at minimum. One can also include other columns such as Date Modified, or any other metadata field associated with the collection. Place the most important columns from left to right for ease of recall and comparison."), 
            React.createElement("p", null, "DetailsList is classically used to display files, but is also used to render custom lists that can be purely metadata. Avoid using file type icon overlays to denote status of a file as it can make the entire icon unclear. Be sure to leave ample width for each column’s data. If there are multiple lines of text in a column, consider the variable row height variant.")), bestPractices: React.createElement("div", null), dos: React.createElement("div", null, 
            React.createElement("ul", null, 
                React.createElement("li", null, "Use them to display content."), 
                React.createElement("li", null, "Provide useful columns of metadata."), 
                React.createElement("li", null, "Display columns in order of importance left to right or right to left depending on the standards of the culture."), 
                React.createElement("li", null, "Give columns ample default width to display information."))
        ), donts: React.createElement("div", null, 
            React.createElement("ul", null, 
                React.createElement("li", null, "Use them to display commands or settings."), 
                React.createElement("li", null, "Overload the view with too many columns that require excessive horizontal scrolling."), 
                React.createElement("li", null, "Make columns so narrow that it truncates the information in typical cases."))
        ), route: this._url, isHeaderVisible: this.props.isHeaderVisible}));
    };
    return DetailsListPage;
}(React.Component));
exports.DetailsListPage = DetailsListPage;

//# sourceMappingURL=DetailsListPage.js.map
