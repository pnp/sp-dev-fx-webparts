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
/* tslint:disable:no-unused-variable */
var React = require('react');
/* tslint:enable:no-unused-variable */
var BaseComponent_1 = require('../../common/BaseComponent');
var Tooltip_Props_1 = require('./Tooltip.Props');
var Callout_1 = require('../../Callout');
var css_1 = require('../../utilities/css');
var DirectionalHint_1 = require('../../common/DirectionalHint');
var properties_1 = require('../../utilities/properties');
require('./Tooltip.scss');
var Tooltip = (function (_super) {
    __extends(Tooltip, _super);
    function Tooltip() {
        _super.apply(this, arguments);
    }
    Tooltip.prototype.render = function () {
        var _a = this.props, targetElement = _a.targetElement, content = _a.content, calloutProps = _a.calloutProps, directionalHint = _a.directionalHint, delay = _a.delay;
        return (React.createElement(Callout_1.Callout, __assign({className: css_1.css('ms-Tooltip', "has-" + Tooltip_Props_1.TooltipDelay[delay] + "Delay"), targetElement: targetElement, directionalHint: directionalHint}, calloutProps, properties_1.getNativeProps(this.props, properties_1.divProperties)), 
            React.createElement("div", {className: 'ms-Tooltip-content'}, 
                React.createElement("p", {className: 'ms-Tooltip-subText'}, content)
            )
        ));
    };
    // Specify default props values
    Tooltip.defaultProps = {
        directionalHint: DirectionalHint_1.DirectionalHint.topCenter,
        delay: Tooltip_Props_1.TooltipDelay.medium,
        calloutProps: {
            isBeakVisible: true,
            beakWidth: 16,
            gapSpace: 8,
            setInitialFocus: true,
            doNotLayer: false
        }
    };
    return Tooltip;
}(BaseComponent_1.BaseComponent));
exports.Tooltip = Tooltip;

//# sourceMappingURL=Tooltip.js.map
