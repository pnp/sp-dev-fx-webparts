"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var index_1 = require('../../../../components/GroupedList/index');
var DetailsRow_1 = require('../../../../components/DetailsList/DetailsRow');
var FocusZone_1 = require('../../../../FocusZone');
var index_2 = require('../../../../utilities/selection/index');
var data_1 = require('../../../utilities/data');
var groupCount = 15;
var groupDepth = 3;
var items = data_1.createListItems(Math.pow(groupCount, groupDepth + 1));
var GroupedListBasicExample = (function (_super) {
    __extends(GroupedListBasicExample, _super);
    function GroupedListBasicExample() {
        _super.call(this);
        this._onRenderCell = this._onRenderCell.bind(this);
        this._selection = new index_2.Selection;
        this._selection.setItems(items);
        this._groups = data_1.createGroups(groupCount, groupDepth, 0, groupCount);
    }
    GroupedListBasicExample.prototype.render = function () {
        return (React.createElement(FocusZone_1.FocusZone, null, 
            React.createElement(index_2.SelectionZone, {selection: this._selection, selectionMode: index_2.SelectionMode.multiple}, 
                React.createElement(index_1.GroupedList, {items: items, onRenderCell: this._onRenderCell, selection: this._selection, selectionMode: index_2.SelectionMode.multiple, groups: this._groups})
            )
        ));
    };
    GroupedListBasicExample.prototype._onRenderCell = function (nestingDepth, item, itemIndex) {
        var selection = this._selection;
        return (React.createElement(DetailsRow_1.DetailsRow, {columns: Object.keys(item).slice(0, 3).map(function (value) {
            return {
                key: value,
                name: value,
                fieldName: value,
                minWidth: 300
            };
        }), groupNestingDepth: nestingDepth, item: item, itemIndex: itemIndex, selection: selection, selectionMode: index_2.SelectionMode.multiple}));
    };
    return GroupedListBasicExample;
}(React.Component));
exports.GroupedListBasicExample = GroupedListBasicExample;

//# sourceMappingURL=GroupedList.Basic.Example.js.map
