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
var DetailsListCustomColumnsExample = (function (_super) {
    __extends(DetailsListCustomColumnsExample, _super);
    function DetailsListCustomColumnsExample(props) {
        _super.call(this, props);
        _items = _items || data_1.createListItems(500);
        this.state = {
            sortedItems: _items,
            columns: _buildColumns()
        };
    }
    DetailsListCustomColumnsExample.prototype.render = function () {
        var _a = this.state, sortedItems = _a.sortedItems, columns = _a.columns;
        return (React.createElement(index_1.DetailsList, {items: sortedItems, setKey: 'set', columns: columns, onRenderItemColumn: _renderItemColumn, onColumnHeaderClick: this._onColumnClick.bind(this), onItemInvoked: function (item, index) { return alert("Item " + item.name + " at index " + index + " has been invoked."); }, onColumnHeaderContextMenu: function (column, ev) { return console.log("column " + column.key + " contextmenu opened."); }}));
    };
    DetailsListCustomColumnsExample.prototype._onColumnClick = function (column) {
        var _a = this.state, sortedItems = _a.sortedItems, columns = _a.columns;
        var isSortedDescending = column.isSortedDescending;
        // If we've sorted this column, flip it.
        if (column.isSorted) {
            isSortedDescending = !isSortedDescending;
        }
        // Sort the items.
        sortedItems = sortedItems.concat([]).sort(function (a, b) {
            var firstValue = a[column.fieldName];
            var secondValue = b[column.fieldName];
            if (isSortedDescending) {
                return firstValue > secondValue ? -1 : 1;
            }
            else {
                return firstValue > secondValue ? 1 : -1;
            }
        });
        // Reset the items and columns to match the state.
        this.setState({
            sortedItems: sortedItems,
            columns: columns.map(function (col) {
                col.isSorted = (col.key === column.key);
                if (col.isSorted) {
                    col.isSortedDescending = isSortedDescending;
                }
                return col;
            })
        });
    };
    return DetailsListCustomColumnsExample;
}(React.Component));
exports.DetailsListCustomColumnsExample = DetailsListCustomColumnsExample;
function _buildColumns() {
    var columns = index_1.buildColumns(_items);
    var thumbnailColumn = columns.filter(function (column) { return column.name === 'thumbnail'; })[0];
    // Special case one column's definition.
    thumbnailColumn.name = '';
    thumbnailColumn.maxWidth = 50;
    return columns;
}
function _renderItemColumn(item, index, column) {
    var fieldContent = item[column.fieldName];
    switch (column.key) {
        case 'thumbnail':
            return React.createElement(index_1.Image, {src: fieldContent, width: 50, height: 50, imageFit: index_1.ImageFit.cover});
        case 'name':
            return React.createElement(index_1.Link, {href: '#'}, fieldContent);
        case 'color':
            return React.createElement("span", {style: { color: fieldContent }}, fieldContent);
        default:
            return React.createElement("span", null, fieldContent);
    }
}

//# sourceMappingURL=DetailsList.CustomColumns.Example.js.map
