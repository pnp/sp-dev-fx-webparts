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
var FocusTrapZone_Box_Example_1 = require('./examples/FocusTrapZone.Box.Example');
var FocusTrapZoneBoxExampleCode = require('./examples/FocusTrapZone.Box.Example.tsx');
var FocusTrapZone_Box_FocusOnCustomElement_Example_1 = require('./examples/FocusTrapZone.Box.FocusOnCustomElement.Example');
var FocusTrapZoneBoxExampleWithFocusableItemCode = require('./examples/FocusTrapZone.Box.FocusOnCustomElement.Example.tsx');
var FocusTrapZone_Box_Click_Example_1 = require('./examples/FocusTrapZone.Box.Click.Example');
var FocusTrapZoneBoxClickExampleCode = require('./examples/FocusTrapZone.Box.Click.Example.tsx');
var FocusTrapZonePage = (function (_super) {
    __extends(FocusTrapZonePage, _super);
    function FocusTrapZonePage() {
        _super.call(this);
        this._url = pageroute_1.getPageRouteFromState(AppState_1.AppState, 'Basic components', 'FocusTrapZone');
    }
    FocusTrapZonePage.prototype.render = function () {
        return (React.createElement(index_2.ComponentPage, {title: 'FocusTrapZone', componentName: 'FocusTrapZoneExample', exampleCards: React.createElement("div", null, 
            React.createElement(index_2.ExampleCard, {title: 'Simple Box', code: FocusTrapZoneBoxExampleCode}, 
                React.createElement(FocusTrapZone_Box_Example_1.default, null)
            ), 
            React.createElement(index_2.ExampleCard, {title: 'Simple Box with focus on custom focusable element', code: FocusTrapZoneBoxExampleWithFocusableItemCode}, 
                React.createElement(FocusTrapZone_Box_FocusOnCustomElement_Example_1.default, null)
            ), 
            React.createElement(index_2.ExampleCard, {title: 'Simple Box with Clicking outside Trap Zone enabled', code: FocusTrapZoneBoxClickExampleCode}, 
                React.createElement(FocusTrapZone_Box_Click_Example_1.default, null)
            )), propertiesTables: React.createElement("div", null, 
            React.createElement(index_2.PropertiesTableSet, {componentName: 'FocusTrapZone'})
        ), overview: React.createElement("div", null, 
            React.createElement(index_1.Link, {target: '_blank', href: 'http://dev.office.com/fabric/utilities/FocusTrapZone'}, "FocusTrapZone"), 
            React.createElement("span", null, " is used to trap the focus in any html element. Pressing tab will circle focus within the inner focusable elements of the FocusTrapZone.")), route: this._url, isHeaderVisible: this.props.isHeaderVisible}));
    };
    return FocusTrapZonePage;
}(React.Component));
exports.FocusTrapZonePage = FocusTrapZonePage;

//# sourceMappingURL=FocusTrapZonePage.js.map
