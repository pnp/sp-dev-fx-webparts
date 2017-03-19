"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var Spinner_Props_1 = require('./Spinner.Props');
var css_1 = require('../../utilities/css');
require('./Spinner.scss');
var Spinner = (function (_super) {
    __extends(Spinner, _super);
    function Spinner() {
        _super.apply(this, arguments);
    }
    Spinner.prototype.render = function () {
        var _a = this.props, type = _a.type, label = _a.label, className = _a.className;
        return (React.createElement("div", {className: css_1.css('ms-Spinner', className)}, 
            React.createElement("div", {className: css_1.css('ms-Spinner-circle', { 'ms-Spinner--normal': type === Spinner_Props_1.SpinnerType.normal }, { 'ms-Spinner--large': type === Spinner_Props_1.SpinnerType.large })}), 
            label && (React.createElement("div", {className: 'ms-Spinner-label'}, label))));
    };
    Spinner.defaultProps = {
        type: Spinner_Props_1.SpinnerType.normal
    };
    return Spinner;
}(React.Component));
exports.Spinner = Spinner;

//# sourceMappingURL=Spinner.js.map
