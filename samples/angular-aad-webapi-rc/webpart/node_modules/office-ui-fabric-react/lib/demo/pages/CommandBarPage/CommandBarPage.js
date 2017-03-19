"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var React = require('react');
var index_1 = require('../../components/index');
var data_1 = require('./examples/data');
var CommandBar_Basic_Example_1 = require('./examples/CommandBar.Basic.Example');
var CommandBar_NonFocusable_Example_1 = require('./examples/CommandBar.NonFocusable.Example');
var pageroute_1 = require('../../utilities/pageroute');
var AppState_1 = require('../../components/App/AppState');
var CommandBarBasicExampleCode = require('./examples/CommandBar.Basic.Example.tsx');
var CommandBarNoFocusableItemsExampleCode = require('./examples/CommandBar.NonFocusable.Example.tsx');
var CommandBarPage = (function (_super) {
    __extends(CommandBarPage, _super);
    function CommandBarPage() {
        _super.call(this);
        this._url = pageroute_1.getPageRouteFromState(AppState_1.AppState, 'Basic components', 'CommandBar');
    }
    CommandBarPage.prototype.render = function () {
        var cmdBarParamsTextAndIcons = { items: data_1.items, farItems: data_1.farItems };
        return (React.createElement(index_1.ComponentPage, {title: 'CommandBar', componentName: 'CommandBarExample', exampleCards: React.createElement("div", null, 
            React.createElement(index_1.ExampleCard, {title: 'CommandBar with search box and overflowing menu items', code: CommandBarBasicExampleCode}, 
                React.createElement(CommandBar_Basic_Example_1.CommandBarBasicExample, __assign({}, cmdBarParamsTextAndIcons))
            ), 
            React.createElement(index_1.ExampleCard, {title: 'CommandBar with non-focusable items', code: CommandBarNoFocusableItemsExampleCode}, 
                React.createElement(CommandBar_NonFocusable_Example_1.CommandBarNonFocusableItemsExample, null)
            )), propertiesTables: React.createElement("div", null, 
            React.createElement(index_1.PropertiesTableSet, {componentName: 'CommandBar'}), 
            React.createElement(index_1.PropertiesTableSet, {componentName: 'ContextualMenu', renderOnly: ['IContextualMenuItem']})), overview: React.createElement("div", null, 
            React.createElement("p", null, "CommandBar is a surface that houses commands that operate on the content of the window, panel, or parent region it resides above. They are one of the most visible and recognizable ways to surface commands, and can be an intuitive method for interacting with content on the page. However, if overloaded or poorly organized, they can be difficult to use and hide valuable commands from your user. CommandBars can also display a search box for finding content; hold simple commands as well as menus; and display the status of ongoing actions."), 
            React.createElement("p", null, "Commands should be sorted in order of importance, from left to right or right to left depending on the culture. Secondarily, organize commands in logical groupings for easier recall. CommandBars work best when they display no more than 5-7 commands. This helps users quickly find your most valuable features. If you need to show more commands, consider using the overflow menu. If you need to render status, or viewing controls, these go on the right side of the CommandBar (or left side if in a left to right experience). Do not display more than 2-3 items on the right side as it will make the overall CommandBar difficult to parse."), 
            React.createElement("p", null, "All command items should have an icon and a label. Commands can render as labels only as well. In smaller widths, commands can just use icon only, but only for the most recognizable and frequently used commands. All other commands should go into an overflow where text labels can be shown.")), bestPractices: React.createElement("div", null), dos: React.createElement("div", null, 
            React.createElement("ul", null, 
                React.createElement("li", null, "Sort commands in order of importance from left to right or right to left depending on the culture."), 
                React.createElement("li", null, "Organize commands into logical groupings."), 
                React.createElement("li", null, "Display no more than 5-7 commands."), 
                React.createElement("li", null, "Use overflow to house less frequently-used commands."), 
                React.createElement("li", null, "In small breakpoints, only have the most recognizable commands render as icon only."))
        ), donts: React.createElement("div", null, 
            React.createElement("ul", null, 
                React.createElement("li", null, "Fill the command bar completely from left to right."), 
                React.createElement("li", null, "Use icons only for commands in larger widths."), 
                React.createElement("li", null, "Display more than 2-3 items on the right side of the bar (or left side in left to right experiences)."))
        ), related: React.createElement("a", {href: 'https://github.com/OfficeDev/office-ui-fabric-js/blob/master/ghdocs/components/CommandBar.md'}, "Fabric JS"), route: this._url, isHeaderVisible: this.props.isHeaderVisible}));
    };
    return CommandBarPage;
}(React.Component));
exports.CommandBarPage = CommandBarPage;

//# sourceMappingURL=CommandBarPage.js.map
