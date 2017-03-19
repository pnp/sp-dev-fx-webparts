"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var index_1 = require('../../../index');
var index_2 = require('../../components/index');
var Tooltip_Bottom_Example_1 = require('./examples/Tooltip.Bottom.Example');
var Tooltip_Basic_Example_1 = require('./examples/Tooltip.Basic.Example');
var pageroute_1 = require('../../utilities/pageroute');
var AppState_1 = require('../../components/App/AppState');
require('./TooltipPage.scss');
var TooltipBasicExampleCode = require('./examples/Tooltip.Basic.Example.tsx');
var TooltipBottomExampleCode = require('./examples/Tooltip.Bottom.Example.tsx');
var TooltipPage = (function (_super) {
    __extends(TooltipPage, _super);
    function TooltipPage() {
        _super.call(this);
        this._url = pageroute_1.getPageRouteFromState(AppState_1.AppState, 'Basic components', 'Tooltip');
    }
    TooltipPage.prototype.render = function () {
        return (React.createElement(index_2.ComponentPage, {title: 'Tooltip', componentName: 'TooltipExample', exampleCards: React.createElement(index_1.LayerHost, null, 
            React.createElement(index_2.ExampleCard, {title: 'Tooltip', code: TooltipBasicExampleCode}, 
                React.createElement(Tooltip_Basic_Example_1.TooltipBasicExample, null)
            ), 
            React.createElement(index_2.ExampleCard, {title: 'Tooltip Bottom Direction. No delay', code: TooltipBottomExampleCode}, 
                React.createElement(Tooltip_Bottom_Example_1.TooltipBottomExample, null)
            )), propertiesTables: React.createElement(index_2.PropertiesTableSet, {componentName: 'Tooltip'}), overview: React.createElement("div", null, 
            React.createElement(index_1.Link, {target: '_blank', href: 'http://dev.office.com/fabric/components/Tooltip'}, "Tooltips"), 
            React.createElement("span", null, " supplement content associated with a specific UI component.")), route: this._url}));
    };
    return TooltipPage;
}(React.Component));
exports.TooltipPage = TooltipPage;

//# sourceMappingURL=TooltipPage.js.map
