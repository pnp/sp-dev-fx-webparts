"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var array_1 = require('../../../../utilities/array');
var index_1 = require('../../../../index');
var DetailsRow_1 = require('../../../../components/DetailsList/DetailsRow');
var KeyCodes_1 = require('../../../../utilities/KeyCodes');
var rtl_1 = require('../../../../utilities/rtl');
var index_2 = require('../../../../utilities/selection/index');
require('./FocusZone.List.Example.scss');
var ITEMS = array_1.createArray(10, function (index) { return ({
    key: index,
    name: 'Item-' + index,
    url: 'http://placehold.it/100x' + (200 + index)
}); });
var COLUMNS = [
    {
        key: 'name',
        name: 'Name',
        fieldName: 'name',
        minWidth: 100
    },
    {
        key: 'link',
        name: 'Link',
        fieldName: 'url',
        minWidth: 100,
        onRender: function (item) { return React.createElement(index_1.Link, {href: item.url}, item.url); }
    },
    {
        key: 'link',
        name: 'Link',
        fieldName: 'url',
        minWidth: 100,
        onRender: function (item) { return React.createElement(index_1.Button, null, item.url); }
    }
];
var FocusZoneListExample = (function (_super) {
    __extends(FocusZoneListExample, _super);
    function FocusZoneListExample() {
        _super.call(this);
        this._selection = new index_2.Selection();
        this._selection.setItems(ITEMS);
    }
    FocusZoneListExample.prototype.render = function () {
        var _this = this;
        return (React.createElement(index_1.FocusZone, {className: 'ms-FocusZoneListExample', direction: index_1.FocusZoneDirection.vertical, isCircularNavigation: true, isInnerZoneKeystroke: function (ev) { return (ev.which === rtl_1.getRTLSafeKeyCode(KeyCodes_1.KeyCodes.right)); }}, ITEMS.map(function (item, index) { return (React.createElement(DetailsRow_1.DetailsRow, {key: index, item: item, itemIndex: index, columns: COLUMNS, selectionMode: index_2.SelectionMode.single, selection: _this._selection})); })));
    };
    return FocusZoneListExample;
}(React.Component));
exports.FocusZoneListExample = FocusZoneListExample;

//# sourceMappingURL=FocusZone.List.Example.js.map
