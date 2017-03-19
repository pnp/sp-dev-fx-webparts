"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
require('es6-promise');
var React = require('react');
var index_1 = require('../../../../index');
var NumberTextField_1 = require('./NumberTextField');
var TextFieldErrorMessageExample = (function (_super) {
    __extends(TextFieldErrorMessageExample, _super);
    function TextFieldErrorMessageExample(props) {
        _super.call(this, props);
        this._getErrorMessage = this._getErrorMessage.bind(this);
        this._getErrorMessagePromise = this._getErrorMessagePromise.bind(this);
    }
    TextFieldErrorMessageExample.prototype.render = function () {
        return (React.createElement("div", null, 
            React.createElement(index_1.TextField, {label: 'TextField with a string-based validator. Hint: the length of the input string must be less than 3.', onGetErrorMessage: this._getErrorMessage}), 
            React.createElement(index_1.TextField, {label: 'TextField with a Promise-based validator. Hint: the length of the input string must be less than 3.', onGetErrorMessage: this._getErrorMessagePromise}), 
            React.createElement(index_1.TextField, {label: 'TextField with a string-based validator. Hint: the length of the input string must be less than 3.', value: 'It should show an error message under this error message on render.', onGetErrorMessage: this._getErrorMessage}), 
            React.createElement(index_1.TextField, {label: 'TextField with a Promise-based validator. Hint: the length of the input string must be less than 3.', value: 'It should show an error message under this error message 5 seconds after render.', onGetErrorMessage: this._getErrorMessagePromise}), 
            React.createElement(index_1.TextField, {label: 'TextField has both description and error message.', value: 'It should show description and error message on render at the same time.', description: 'This field has description and error message both under the input box.', onGetErrorMessage: this._getErrorMessage}), 
            React.createElement(index_1.TextField, {label: 'TextField with a string-based validator. Hint: the length of the input string must be less than 3.', placeholder: 'Validation will start after users stop typing for 2 seconds.', onGetErrorMessage: this._getErrorMessage, deferredValidationTime: 2000}), 
            React.createElement(NumberTextField_1.NumberTextField, {label: 'Number TextField with valid initial value', initialValue: '100'}), 
            React.createElement(NumberTextField_1.NumberTextField, {label: 'Number TextField with invalid initial value', initialValue: 'Not a number'})));
    };
    TextFieldErrorMessageExample.prototype._getErrorMessage = function (value) {
        return value.length < 3
            ? ''
            : "The length of the input value should less than 3, actual is " + value.length + ".";
    };
    TextFieldErrorMessageExample.prototype._getErrorMessagePromise = function (value) {
        var _this = this;
        return new Promise(function (resolve) {
            // resolve the promise after 3 second.
            setTimeout(function () { return resolve(_this._getErrorMessage(value)); }, 5000);
        });
    };
    return TextFieldErrorMessageExample;
}(React.Component));
exports.TextFieldErrorMessageExample = TextFieldErrorMessageExample;

//# sourceMappingURL=TextField.ErrorMessage.Example.js.map
