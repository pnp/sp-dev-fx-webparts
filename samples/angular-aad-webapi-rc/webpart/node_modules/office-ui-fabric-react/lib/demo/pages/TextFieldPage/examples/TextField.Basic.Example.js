"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var React = require('react');
var index_1 = require('../../../../index');
var TextFieldBasicExample = (function (_super) {
    __extends(TextFieldBasicExample, _super);
    function TextFieldBasicExample() {
        _super.apply(this, arguments);
    }
    TextFieldBasicExample.prototype.render = function () {
        return (React.createElement("div", null, 
            React.createElement(index_1.TextField, {label: 'Default TextField', onChanged: this._onChanged}), 
            React.createElement(index_1.TextField, {label: 'Disabled TextField', disabled: true}), 
            React.createElement(index_1.TextField, {label: 'Required TextField', required: true}), 
            React.createElement(index_1.TextField, {label: 'TextField with a placeholder', placeholder: 'Now I am a Placeholder', ariaLabel: 'Please enter text here'}), 
            React.createElement(index_1.TextField, {label: 'Multiline TextField', multiline: true}), 
            React.createElement(index_1.TextField, {label: 'Multiline TextField Unresizable', multiline: true, resizable: false}), 
            React.createElement(index_1.TextField, {label: 'Underlined TextField', underlined: true})));
    };
    TextFieldBasicExample.prototype._onChanged = function (text) {
        console.log(text);
    };
    __decorate([
        index_1.autobind
    ], TextFieldBasicExample.prototype, "_onChanged", null);
    return TextFieldBasicExample;
}(React.Component));
exports.TextFieldBasicExample = TextFieldBasicExample;

//# sourceMappingURL=TextField.Basic.Example.js.map
