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
var index_1 = require('../../../../index');
var data_1 = require('../../../utilities/data');
require('./DetailsListExample.scss');
var _items;
var DetailsListCustomRowsExample = (function (_super) {
    __extends(DetailsListCustomRowsExample, _super);
    function DetailsListCustomRowsExample() {
        _super.call(this);
        _items = _items || data_1.createListItems(500);
    }
    DetailsListCustomRowsExample.prototype.render = function () {
        return (React.createElement(index_1.DetailsList, {items: _items, setKey: 'set', onRenderRow: this._onRenderRow}));
    };
    DetailsListCustomRowsExample.prototype._onRenderRow = function (props) {
        return React.createElement(index_1.DetailsRow, __assign({}, props, {onRenderCheck: this._onRenderCheck}));
    };
    DetailsListCustomRowsExample.prototype._onRenderCheck = function (props) {
        return (React.createElement("div", {className: index_1.css('ms-DetailsRow-check DetailsListExample-customCheck', {
            'is-any-selected': props.anySelected
        }), role: 'button', "aria-pressed": props.isSelected, "data-selection-toggle": true, "aria-label": props.ariaLabel}, 
            React.createElement("input", {type: 'checkbox', checked: props.isSelected})
        ));
    };
    __decorate([
        index_1.autobind
    ], DetailsListCustomRowsExample.prototype, "_onRenderRow", null);
    __decorate([
        index_1.autobind
    ], DetailsListCustomRowsExample.prototype, "_onRenderCheck", null);
    return DetailsListCustomRowsExample;
}(React.Component));
exports.DetailsListCustomRowsExample = DetailsListCustomRowsExample;

//# sourceMappingURL=DetailsList.CustomRows.Example.js.map
