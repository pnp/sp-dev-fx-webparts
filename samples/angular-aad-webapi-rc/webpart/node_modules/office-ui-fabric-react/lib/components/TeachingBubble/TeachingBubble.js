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
var TeachingBubbleContent_1 = require('./TeachingBubbleContent');
var Callout_1 = require('../../Callout');
var DirectionalHint_1 = require('../../common/DirectionalHint');
require('./TeachingBubble.scss');
var TeachingBubble = (function (_super) {
    __extends(TeachingBubble, _super);
    // Constructor
    function TeachingBubble(props) {
        _super.call(this, props);
        this.state = {};
    }
    TeachingBubble.prototype.render = function () {
        var _a = this.props, calloutProps = _a.calloutProps, targetElement = _a.targetElement;
        return (React.createElement(Callout_1.Callout, __assign({className: 'ms-TeachingBubble', ref: this._resolveRef('_callout'), targetElement: targetElement}, calloutProps), 
            React.createElement(TeachingBubbleContent_1.TeachingBubbleContent, __assign({}, this.props))
        ));
    };
    // Specify default props values
    TeachingBubble.defaultProps = {
        calloutProps: {
            beakWidth: 16,
            gapSpace: 0,
            setInitialFocus: true,
            doNotLayer: false,
            directionalHint: DirectionalHint_1.DirectionalHint.rightCenter
        }
    };
    return TeachingBubble;
}(BaseComponent_1.BaseComponent));
exports.TeachingBubble = TeachingBubble;

//# sourceMappingURL=TeachingBubble.js.map
