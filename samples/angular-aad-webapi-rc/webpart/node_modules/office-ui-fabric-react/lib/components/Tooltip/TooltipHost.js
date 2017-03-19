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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/* tslint:disable:no-unused-variable */
var React = require('react');
/* tslint:enable:no-unused-variable */
var BaseComponent_1 = require('../../common/BaseComponent');
var properties_1 = require('../../utilities/properties');
var autobind_1 = require('../../utilities/autobind');
var Tooltip_1 = require('./Tooltip');
var Tooltip_Props_1 = require('./Tooltip.Props');
var TooltipHost = (function (_super) {
    __extends(TooltipHost, _super);
    // Constructor
    function TooltipHost(props) {
        _super.call(this, props);
        this.state = {
            isTooltipVisible: false,
        };
    }
    // Render
    TooltipHost.prototype.render = function () {
        var _a = this.props, content = _a.content, children = _a.children, directionalHint = _a.directionalHint, delay = _a.delay;
        var isTooltipVisible = this.state.isTooltipVisible;
        return (React.createElement("div", __assign({className: 'ms-TooltipHost', ref: this._resolveRef('_tooltipHost')}, { onFocusCapture: this._onTooltipMouseEnter }, { onBlurCapture: this._onTooltipMouseLeave }, {onMouseEnter: this._onTooltipMouseEnter, onMouseLeave: this._onTooltipMouseLeave}), 
            children, 
            isTooltipVisible ? (React.createElement(Tooltip_1.Tooltip, __assign({delay: delay, content: content, targetElement: this._tooltipHost, directionalHint: directionalHint}, properties_1.getNativeProps(this.props, properties_1.divProperties)))) : (null)));
    };
    // Show Tooltip
    TooltipHost.prototype._onTooltipMouseEnter = function (ev) {
        this.setState({
            isTooltipVisible: true
        });
    };
    // Hide Tooltip
    TooltipHost.prototype._onTooltipMouseLeave = function (ev) {
        this.setState({
            isTooltipVisible: false
        });
    };
    TooltipHost.defaultProps = {
        delay: Tooltip_Props_1.TooltipDelay.medium
    };
    __decorate([
        autobind_1.autobind
    ], TooltipHost.prototype, "_onTooltipMouseEnter", null);
    __decorate([
        autobind_1.autobind
    ], TooltipHost.prototype, "_onTooltipMouseLeave", null);
    return TooltipHost;
}(BaseComponent_1.BaseComponent));
exports.TooltipHost = TooltipHost;

//# sourceMappingURL=TooltipHost.js.map
