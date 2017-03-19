"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var index_1 = require('../../../../index');
require('./Spinner.Basic.Example.scss');
var SpinnerBasicExample = (function (_super) {
    __extends(SpinnerBasicExample, _super);
    function SpinnerBasicExample() {
        _super.apply(this, arguments);
    }
    SpinnerBasicExample.prototype.render = function () {
        return (React.createElement("div", {className: 'ms-BasicSpinnersExample'}, 
            React.createElement(index_1.Label, null, "Normal Spinner"), 
            React.createElement(index_1.Spinner, null), 
            React.createElement(index_1.Label, null, "Large Spinner"), 
            React.createElement(index_1.Spinner, {type: index_1.SpinnerType.large}), 
            React.createElement(index_1.Label, null, "Spinner With Label"), 
            React.createElement(index_1.Spinner, {label: 'I am definitely loading...'}), 
            React.createElement(index_1.Label, null, "Large Spinner With Label"), 
            React.createElement(index_1.Spinner, {type: index_1.SpinnerType.large, label: 'Seriously, still loading...'})));
    };
    return SpinnerBasicExample;
}(React.Component));
exports.SpinnerBasicExample = SpinnerBasicExample;

//# sourceMappingURL=Spinner.Basic.Example.js.map
