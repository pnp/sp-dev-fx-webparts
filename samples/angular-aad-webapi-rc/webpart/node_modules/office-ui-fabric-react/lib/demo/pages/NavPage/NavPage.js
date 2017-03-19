"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var index_1 = require('../../components/index');
var Nav_Basic_Example_1 = require('./examples/Nav.Basic.Example');
var Nav_FabricDemoApp_Example_1 = require('./examples/Nav.FabricDemoApp.Example');
var Nav_Nested_Example_1 = require('./examples/Nav.Nested.Example');
var Nav_ByKeys_Example_1 = require('./examples/Nav.ByKeys.Example');
var pageroute_1 = require('../../utilities/pageroute');
var AppState_1 = require('../../components/App/AppState');
var NavBasicExampleCode = require('./examples/Nav.Basic.Example.tsx');
var NavFabricDemoAppExampleCode = require('./examples/Nav.FabricDemoApp.Example.tsx');
var NavNestedExampleCode = require('./examples/Nav.Nested.Example.tsx');
var NavByKeysExampleCode = require('./examples/Nav.ByKeys.Example.tsx');
var NavPage = (function (_super) {
    __extends(NavPage, _super);
    function NavPage() {
        _super.call(this);
        this._url = pageroute_1.getPageRouteFromState(AppState_1.AppState, 'Basic components', 'Checkbox');
    }
    NavPage.prototype.render = function () {
        return (React.createElement(index_1.ComponentPage, {title: 'Nav', componentName: 'NavExample', exampleCards: React.createElement("div", null, 
            React.createElement(index_1.ExampleCard, {title: 'Basic Nav bar with sample links', code: NavBasicExampleCode}, 
                React.createElement(Nav_Basic_Example_1.NavBasicExample, null)
            ), 
            React.createElement(index_1.ExampleCard, {title: 'Navigation menu used in this Fabric React demo app', code: NavFabricDemoAppExampleCode}, 
                React.createElement(Nav_FabricDemoApp_Example_1.NavFabricDemoAppExample, null)
            ), 
            React.createElement(index_1.ExampleCard, {title: 'Nested navigation menu (without group header)', code: NavNestedExampleCode}, 
                React.createElement(Nav_Nested_Example_1.NavNestedExample, null)
            ), 
            React.createElement(index_1.ExampleCard, {title: 'Nav bar of links each with unique keys and empty urls', code: NavByKeysExampleCode}, 
                React.createElement(Nav_ByKeys_Example_1.NavByKeysExample, null)
            )), propertiesTables: React.createElement(index_1.PropertiesTableSet, {componentName: 'Nav'}), overview: React.createElement("div", null, 
            React.createElement("p", null, "Navs (also called \"left nav\" or \"navigation pane\") provide links to the main areas of an app or a site. In larger configurations, the Nav is always on-screen, usually on the left of the view. In smaller configurations, the Nav may collapse into a skinnier version or be completely hidden until the user taps an icon.")
        ), bestPractices: React.createElement("div", null), dos: React.createElement("div", null, 
            React.createElement("ul", null, 
                React.createElement("li", null, "Use Nav for apps with many top-level navigation items that are of similar type. For example, a sports app with categories like Football, Baseball, Basketball, Soccer, and so on."), 
                React.createElement("li", null, "Keep the names of the navigation items brief and clear, rather than trying to be overly specific."), 
                React.createElement("li", null, "Use the word that feels right for the navigation. For example, some items may make better sense as nouns (e.g. “Files”), others as adjectives (“Shared”). Use what makes sense for users, and keep it short! "), 
                React.createElement("li", null, "Try to keep your app’s nav in a consistent order across platforms. This sort of consistency increases predictability which drives user confidence, thus retaining and engaging them."), 
                React.createElement("li", null, "UseNav for an app with a medium to high number of top-level views or categories. If your app is very simple, you may prefer a simpler hub-and-spoke layout."))
        ), donts: React.createElement("div", null, 
            React.createElement("ul", null, 
                React.createElement("li", null, "Overload your Nav. Too many items in the Nav is indicative of an app that is poorly organized or trying to do too much."), 
                React.createElement("li", null, "Include actions. You may reserve a space for actions, if you keep them well separated from the main Nav and their appearance makes it obvious that tapping them will execute a command instead of navigating."))
        ), route: this._url, isHeaderVisible: this.props.isHeaderVisible}));
    };
    return NavPage;
}(React.Component));
exports.NavPage = NavPage;

//# sourceMappingURL=NavPage.js.map
