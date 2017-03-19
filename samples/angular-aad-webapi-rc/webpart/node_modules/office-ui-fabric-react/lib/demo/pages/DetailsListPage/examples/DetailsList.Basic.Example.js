"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/* tslint:disable:no-unused-variable */
var React = require('react');
/* tslint:enable:no-unused-variable */
var index_1 = require('../../../../index');
var data_1 = require('../../../utilities/data');
var _items;
var DetailsListBasicExample = (function (_super) {
    __extends(DetailsListBasicExample, _super);
    function DetailsListBasicExample() {
        var _this = this;
        _super.call(this);
        _items = _items || data_1.createListItems(500);
        this._onRenderItemColumn = this._onRenderItemColumn.bind(this);
        this._selection = new index_1.Selection({
            onSelectionChanged: function () { return _this.setState({ selectionDetails: _this._getSelectionDetails() }); }
        });
        this.state = {
            items: _items,
            selectionDetails: this._getSelectionDetails()
        };
    }
    DetailsListBasicExample.prototype.render = function () {
        var _this = this;
        var _a = this.state, items = _a.items, selectionDetails = _a.selectionDetails;
        return (React.createElement("div", null, 
            React.createElement("div", null, selectionDetails), 
            React.createElement(index_1.TextField, {label: 'Filter by name:', onChanged: function (text) { return _this.setState({ items: text ? _items.filter(function (i) { return i.name.toLowerCase().indexOf(text) > -1; }) : _items }); }}), 
            React.createElement(index_1.MarqueeSelection, {selection: this._selection}, 
                React.createElement(index_1.DetailsList, {items: items, setKey: 'set', selection: this._selection, onItemInvoked: function (item) { return alert("Item invoked: " + item.name); }, onRenderItemColumn: this._onRenderItemColumn})
            )));
    };
    DetailsListBasicExample.prototype._onRenderItemColumn = function (item, index, column) {
        if (column.key === 'name') {
            return React.createElement(index_1.Link, {"data-selection-invoke": true}, item[column.key]);
        }
        return item[column.key];
    };
    DetailsListBasicExample.prototype._getSelectionDetails = function () {
        var selectionCount = this._selection.getSelectedCount();
        switch (selectionCount) {
            case 0:
                return 'No items selected';
            case 1:
                return '1 item selected: ' + this._selection.getSelection()[0].name;
            default:
                return selectionCount + " items selected";
        }
    };
    return DetailsListBasicExample;
}(React.Component));
exports.DetailsListBasicExample = DetailsListBasicExample;

//# sourceMappingURL=DetailsList.Basic.Example.js.map
