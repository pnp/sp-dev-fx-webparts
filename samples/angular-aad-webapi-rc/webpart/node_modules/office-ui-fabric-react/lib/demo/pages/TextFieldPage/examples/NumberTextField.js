"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var index_1 = require('../../../../index');
require('./NumberTextField.scss');
var NumberTextField = (function (_super) {
    __extends(NumberTextField, _super);
    function NumberTextField(props) {
        _super.call(this, props);
        this._restore = this._restore.bind(this);
        this._onChanged = this._onChanged.bind(this);
        this._validateNumber = this._validateNumber.bind(this);
        this.state = {
            value: props.initialValue
        };
    }
    NumberTextField.prototype.render = function () {
        return (React.createElement("div", {className: 'NumberTextField'}, 
            React.createElement(index_1.TextField, {className: 'NumberTextField-textField', label: this.props.label, value: this.state.value, onChanged: this._onChanged, onGetErrorMessage: this._validateNumber}), 
            React.createElement("div", {className: 'NumberTextField-restoreButton'}, 
                React.createElement(index_1.Button, {onClick: this._restore}, "Restore")
            )));
    };
    NumberTextField.prototype._validateNumber = function (value) {
        return isNaN(Number(value))
            ? "The value should be a number, actual is " + value + "."
            : '';
    };
    NumberTextField.prototype._onChanged = function (value) {
        return this.setState({
            value: value
        });
    };
    NumberTextField.prototype._restore = function () {
        this.setState({
            value: this.props.initialValue
        });
    };
    return NumberTextField;
}(React.Component));
exports.NumberTextField = NumberTextField;

//# sourceMappingURL=NumberTextField.js.map
