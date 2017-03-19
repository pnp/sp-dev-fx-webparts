"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var index_1 = require('../../components/index');
var Toggle_Basic_Example_1 = require('./examples/Toggle.Basic.Example');
var pageroute_1 = require('../../utilities/pageroute');
var AppState_1 = require('../../components/App/AppState');
var ToggleBasicExampleCode = require('./examples/Toggle.Basic.Example.tsx');
var TogglePage = (function (_super) {
    __extends(TogglePage, _super);
    function TogglePage() {
        _super.call(this);
        this._url = pageroute_1.getPageRouteFromState(AppState_1.AppState, 'Basic components', 'Toggle');
    }
    TogglePage.prototype.render = function () {
        return (React.createElement(index_1.ComponentPage, {title: 'Toggle', componentName: 'ToggleExample', exampleCards: React.createElement(index_1.ExampleCard, {title: 'Toggle', code: ToggleBasicExampleCode}, 
            React.createElement(Toggle_Basic_Example_1.ToggleBasicExample, null)
        ), propertiesTables: React.createElement(index_1.PropertiesTableSet, {componentName: 'Toggle'}), overview: React.createElement("div", null, 
            React.createElement("p", null, "Toggles represent a physical switch that allows users to turn things on or off. Use Toggles to present users with two mutually exclusive options (like on/off), where choosing an option results in an immediate action. Use a Toggle for binary operations that take effect right after the user flips the Toggle. For example, use a Toggle to turn services or hardware components on or off. In other words, if a physical switch would work for the action, a Toggle is probably the best control to use."), 
            React.createElement("h2", {className: 'ms-font-xl'}, "Choosing between Toggle and Checkbox"), 
            React.createElement("p", null, "For some actions, either a Toggle or a Checkbox might work. To decide which control would work better, follow these tips:"), 
            React.createElement("ul", null, 
                React.createElement("li", null, "Use a Toggle for binary settings when changes become effective immediately after the user changes them."), 
                React.createElement("li", null, "In the above example, it's clear with the Toggle that the wireless is set to \"On.\" But with the Checkbox, the user needs to think about whether the wireless is on now or whether they need to check the box to turn wireless on."), 
                React.createElement("li", null, "Use a Checkbox when the user has to perform extra steps for changes to be effective. For example, if the user must click a \"Submit\", \"Next\", \"Ok\" button to apply changes, use a Checkbox."))), bestPractices: React.createElement("div", null), dos: React.createElement("div", null, 
            React.createElement("ul", null, 
                React.createElement("li", null, "Only replace the On and Off labels if there are more specific labels for the setting. If there are short (3-4 characters) labels that represent binary opposites that are more appropriate for a particular setting, use them. For example, you might use \"Show/Hide\" if the setting is \"Show images.\"")
            )
        ), donts: React.createElement("div", null, 
            React.createElement("ul", null, "Don’t use a Toggle if the user will have to do something else or go somewhere else in order to experience its effect. If any extra step is required for changes to be effective, you should use a checkbox and corresponding \"Apply\" button instead of a Toggle.")
        ), related: React.createElement("a", {href: 'https://github.com/OfficeDev/office-ui-fabric-js/blob/master/ghdocs/components/Toggle.md'}, "Fabric JS"), route: this._url, isHeaderVisible: this.props.isHeaderVisible}));
    };
    return TogglePage;
}(React.Component));
exports.TogglePage = TogglePage;

//# sourceMappingURL=TogglePage.js.map
