"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var index_1 = require('../../components/index');
var Breadcrumb_Basic_Example_1 = require('./examples/Breadcrumb.Basic.Example');
var pageroute_1 = require('../../utilities/pageroute');
var AppState_1 = require('../../components/App/AppState');
var BreadcrumbBasicExampleCode = require('./examples/Breadcrumb.Basic.Example.tsx');
var BreadcrumbPage = (function (_super) {
    __extends(BreadcrumbPage, _super);
    function BreadcrumbPage() {
        _super.call(this);
        this._url = pageroute_1.getPageRouteFromState(AppState_1.AppState, 'Basic components', 'Breadcrumb');
    }
    BreadcrumbPage.prototype.render = function () {
        return (React.createElement(index_1.ComponentPage, {title: 'Breadcrumb', componentName: 'BreadcrumbExample', exampleCards: React.createElement(index_1.ExampleCard, {title: 'Simple breadcrumb', code: BreadcrumbBasicExampleCode}, 
            React.createElement(Breadcrumb_Basic_Example_1.BreadcrumbBasicExample, null)
        ), propertiesTables: React.createElement(index_1.PropertiesTableSet, {componentName: 'Breadcrumb'}), overview: React.createElement("div", null, 
            React.createElement("p", null, "Breadcrumbs should be used as a navigational aid in your app or site. They indicate the current page’s location within a hierarchy and help the user understand where they are in relation to the rest of that hierarchy. They also afford one-click access to higher levels of that hierarchy."), 
            React.createElement("p", null, "Breadcrumbs are typically placed, in horizontal form, under the masthead or navigation of an experience, above the primary content area.")), related: React.createElement("a", {href: 'https://github.com/OfficeDev/office-ui-fabric-js/blob/master/ghdocs/components/Breadcrumb.md'}, "Fabric JS"), bestPractices: React.createElement("div", null), dos: React.createElement("div", null, 
            React.createElement("ul", null, 
                React.createElement("li", null, "Place Breadcrumbs at the top of a page, above a list of items, or above the main content of a page.")
            )
        ), donts: React.createElement("div", null, 
            React.createElement("ul", null, 
                React.createElement("li", null, "Don't use Breadcrumbs as a primary way to navigate an app or site.")
            )
        ), route: this._url, isHeaderVisible: this.props.isHeaderVisible}));
    };
    return BreadcrumbPage;
}(React.Component));
exports.BreadcrumbPage = BreadcrumbPage;

//# sourceMappingURL=BreadcrumbPage.js.map
