"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var index_1 = require('../../components/index');
var AppState_1 = require('../../components/App/AppState');
var pageroute_1 = require('../../utilities/pageroute');
var Overlay_Dark_Example_1 = require('./examples/Overlay.Dark.Example');
var Overlay_Light_Example_1 = require('./examples/Overlay.Light.Example');
var OverlayLightExampleCode = require('./examples/Overlay.Light.Example.tsx');
var OverlayDarkExampleCode = require('./examples/Overlay.Dark.Example.tsx');
var OverlayPage = (function (_super) {
    __extends(OverlayPage, _super);
    function OverlayPage() {
        _super.call(this);
        this._url = pageroute_1.getPageRouteFromState(AppState_1.AppState, 'Basic components', 'Overlay');
    }
    OverlayPage.prototype.render = function () {
        return (React.createElement(index_1.ComponentPage, {title: 'Overlay', componentName: 'OverlayExample', exampleCards: React.createElement("div", null, 
            React.createElement(index_1.ExampleCard, {title: 'Light', code: OverlayLightExampleCode}, 
                React.createElement(Overlay_Light_Example_1.OverlayLightExample, null)
            ), 
            React.createElement(index_1.ExampleCard, {title: 'Dark', code: OverlayDarkExampleCode}, 
                React.createElement(Overlay_Dark_Example_1.OverlayDarkExample, null)
            )), propertiesTables: React.createElement(index_1.PropertiesTableSet, {componentName: 'Overlay'}), overview: React.createElement("div", null, 
            React.createElement("p", null, "Overlays are used to render a semi-transparent layer on top of existing UI. Overlays help focus the user on the content that sits above the added layer and are often used to help designate a modal or blocking experience. Overlays can be seen used in conjunction with Panels and Dialogs.")
        ), bestPractices: React.createElement("div", null), dos: React.createElement("div", null, 
            React.createElement("ul", null, 
                React.createElement("li", null, "Use a dark Overlay with a first-run experience."), 
                React.createElement("li", null, "Use a white Overlay for dialogs and panels."))
        ), donts: React.createElement("div", null, 
            React.createElement("ul", null, 
                React.createElement("li", null, "Use an Overlay when you want the user to interact with the UI that is being covered.")
            )
        ), related: React.createElement("a", {href: 'https://github.com/OfficeDev/office-ui-fabric-js/blob/master/ghdocs/components/Overlay.md'}, "Fabric JS"), route: this._url, isHeaderVisible: this.props.isHeaderVisible}));
    };
    return OverlayPage;
}(React.Component));
exports.OverlayPage = OverlayPage;

//# sourceMappingURL=OverlayPage.js.map
