"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var css_1 = require('../../utilities/css');
require('./Check.scss');
var Check = (function (_super) {
    __extends(Check, _super);
    function Check() {
        _super.apply(this, arguments);
    }
    Check.prototype.shouldComponentUpdate = function (newProps) {
        return this.props.isChecked !== newProps.isChecked || this.props.checked !== newProps.checked;
    };
    Check.prototype.render = function () {
        var _a = this.props, isChecked = _a.isChecked, checked = _a.checked;
        return (React.createElement("div", {className: css_1.css('ms-Check', {
            'is-checked': isChecked || checked
        })}, 
            React.createElement("div", {className: 'ms-Icon ms-Check-background'}), 
            React.createElement("i", {className: 'ms-Check-check ms-Icon ms-Icon--CheckMark'})));
    };
    Check.defaultProps = {
        isChecked: false
    };
    return Check;
}(React.Component));
exports.Check = Check;

//# sourceMappingURL=Check.js.map
