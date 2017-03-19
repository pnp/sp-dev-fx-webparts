"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var index_1 = require('../../components/index');
var Link_Basic_Example_1 = require('./examples/Link.Basic.Example');
var pageroute_1 = require('../../utilities/pageroute');
var AppState_1 = require('../../components/App/AppState');
var LinkBasicExampleCode = require('./examples/Link.Basic.Example.tsx');
var LinkPage = (function (_super) {
    __extends(LinkPage, _super);
    function LinkPage() {
        _super.call(this);
        this._url = pageroute_1.getPageRouteFromState(AppState_1.AppState, 'Basic components', 'Link');
    }
    LinkPage.prototype.render = function () {
        return (React.createElement(index_1.ComponentPage, {title: 'Link', componentName: 'LinkExample', exampleCards: React.createElement(index_1.ExampleCard, {title: 'Link', code: LinkBasicExampleCode}, 
            React.createElement(Link_Basic_Example_1.LinkBasicExample, null)
        ), propertiesTables: React.createElement(index_1.PropertiesTableSet, {componentName: 'Link'}), overview: React.createElement("div", null, 
            React.createElement("p", null, "With a Link, users can navigate to another page, window, or Help topic; display a definition; initiate a command; or choose an option. A Link indicates that it can be clicked, typically by being displayed using the visited or unvisited link system colors. Traditionally, Links are underlined as well, but that approach is often unnecessary and falling out of favor to reduce visual clutter."), 
            React.createElement("p", null, "A Link is the lightest weight clickable control, and is often used to reduce the visual complexity of a design.")), bestPractices: React.createElement("div", null), dos: React.createElement("div", null, 
            React.createElement("ul", null, 
                React.createElement("li", null, "Use to navigate to another page, window, or help topic; display a definition; initiate a command; or choose an option."), 
                React.createElement("li", null, "Make Links discoverable by visual inspection alone. Users shouldn't have to interact with your program to find links."), 
                React.createElement("li", null, "Use Links that give specific descriptive information about the result of clicking on the link, using as much text as necessary. Users should be able to accurately predict the result of a link from its link text and optional Tooltip."), 
                React.createElement("li", null, "Use text that suggests clicking, such as a command starting with an imperative verb like \"Show\", \"Print\", \"Copy\", or \"Delete\"."))
        ), donts: React.createElement("div", null, 
            React.createElement("ul", null, 
                React.createElement("li", null, "Use if the action is destructive or irreversible. Because users associate links with navigation (and the ability to back out), Links aren't appropriate for commands with significant consequences.")
            )
        ), related: React.createElement("a", {href: 'https://github.com/OfficeDev/office-ui-fabric-js/blob/master/ghdocs/components/Link.md'}, "Fabric JS"), route: this._url, isHeaderVisible: this.props.isHeaderVisible}));
    };
    return LinkPage;
}(React.Component));
exports.LinkPage = LinkPage;

//# sourceMappingURL=LinkPage.js.map
