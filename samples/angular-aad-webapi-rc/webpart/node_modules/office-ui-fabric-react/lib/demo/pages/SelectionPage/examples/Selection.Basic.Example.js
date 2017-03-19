"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var index_1 = require('../../../../index');
var Check_1 = require('../../../../components/Check/Check');
var index_2 = require('../../../../utilities/selection/index');
var data_1 = require('../../../utilities/data');
require('./Selection.Example.scss');
var ITEM_COUNT = 100;
/**
 * The SelectionBasicExample controls the selection state of all items
 */
var SelectionBasicExample = (function (_super) {
    __extends(SelectionBasicExample, _super);
    function SelectionBasicExample() {
        _super.call(this);
        this._hasMounted = false;
        this._onSelectionChanged = this._onSelectionChanged.bind(this);
        this._onSelectionModeChanged = this._onSelectionModeChanged.bind(this);
        this._onToggleSelectAll = this._onToggleSelectAll.bind(this);
        this._onCanSelectChanged = this._onCanSelectChanged.bind(this);
        this._canSelectItem = this._canSelectItem.bind(this);
        this.state = {
            items: data_1.createListItems(ITEM_COUNT),
            selection: new index_2.Selection({ onSelectionChanged: this._onSelectionChanged }),
            selectionMode: index_2.SelectionMode.multiple,
            canSelect: 'all'
        };
        this.state.selection.setItems(this.state.items, false);
    }
    SelectionBasicExample.prototype.componentDidMount = function () {
        this._hasMounted = true;
    };
    SelectionBasicExample.prototype.render = function () {
        var _a = this.state, items = _a.items, selection = _a.selection, selectionMode = _a.selectionMode;
        return (React.createElement("div", {className: 'ms-SelectionBasicExample'}, 
            React.createElement(index_1.CommandBar, {items: this._getCommandItems()}), 
            React.createElement(index_1.MarqueeSelection, {selection: selection, isEnabled: selectionMode === index_2.SelectionMode.multiple}, 
                React.createElement(index_2.SelectionZone, {selection: selection, selectionMode: selectionMode, onItemInvoked: function (item) { return alert('item invoked: ' + item.name); }}, items.map(function (item, index) { return (React.createElement(SelectionItemExample, {ref: 'detailsGroup_' + index, key: item.key, item: item, itemIndex: index, selectionMode: selectionMode, selection: selection})); }))
            )));
    };
    SelectionBasicExample.prototype._onSelectionChanged = function () {
        if (this._hasMounted) {
            this.forceUpdate();
        }
    };
    SelectionBasicExample.prototype._onToggleSelectAll = function () {
        var selection = this.state.selection;
        selection.toggleAllSelected();
    };
    SelectionBasicExample.prototype._onSelectionModeChanged = function (ev, menuItem) {
        this.setState({
            selectionMode: menuItem.data
        });
    };
    SelectionBasicExample.prototype._onCanSelectChanged = function (ev, menuItem) {
        var canSelectItem = (menuItem.data === 'vowels') ? this._canSelectItem : undefined;
        var newSelection = new index_2.Selection({ onSelectionChanged: this._onSelectionChanged, canSelectItem: canSelectItem });
        newSelection.setItems(this.state.items, false);
        this.setState({
            selection: newSelection,
            canSelect: (menuItem.data === 'vowels') ? 'vowels' : 'all'
        });
    };
    SelectionBasicExample.prototype._canSelectItem = function (item) {
        return item.name && (item.name.indexOf('a') === 0 || item.name.indexOf('e') === 0 || item.name.indexOf('i') === 0 || item.name.indexOf('o') === 0 || item.name.indexOf('u') === 0);
    };
    SelectionBasicExample.prototype._getCommandItems = function () {
        var _a = this.state, selectionMode = _a.selectionMode, canSelect = _a.canSelect;
        return [
            {
                key: 'selectionMode',
                name: 'Selection Mode',
                items: [
                    {
                        key: index_2.SelectionMode[index_2.SelectionMode.none],
                        name: 'None',
                        canCheck: true,
                        checked: selectionMode === index_2.SelectionMode.none,
                        onClick: this._onSelectionModeChanged,
                        data: index_2.SelectionMode.none
                    },
                    {
                        key: index_2.SelectionMode[index_2.SelectionMode.single],
                        name: 'Single select',
                        canCheck: true,
                        checked: selectionMode === index_2.SelectionMode.single,
                        onClick: this._onSelectionModeChanged,
                        data: index_2.SelectionMode.single
                    },
                    {
                        key: index_2.SelectionMode[index_2.SelectionMode.multiple],
                        name: 'Multi select',
                        canCheck: true,
                        checked: selectionMode === index_2.SelectionMode.multiple,
                        onClick: this._onSelectionModeChanged,
                        data: index_2.SelectionMode.multiple
                    },
                ]
            },
            {
                key: 'selectAll',
                name: 'Select All',
                icon: 'check',
                onClick: this._onToggleSelectAll
            },
            {
                key: 'allowCanSelect',
                name: 'Choose selectable items',
                items: [
                    {
                        key: 'all',
                        name: 'All items',
                        canCheck: true,
                        checked: canSelect === 'all',
                        onClick: this._onCanSelectChanged,
                        data: 'all'
                    },
                    {
                        key: 'a',
                        name: 'Names starting with vowels',
                        canCheck: true,
                        checked: canSelect === 'vowels',
                        onClick: this._onCanSelectChanged,
                        data: 'vowels'
                    }
                ]
            }
        ];
    };
    return SelectionBasicExample;
}(React.Component));
exports.SelectionBasicExample = SelectionBasicExample;
/**
 * The SelectionItemExample controls and displays the selection state of a single item
 */
var SelectionItemExample = (function (_super) {
    __extends(SelectionItemExample, _super);
    function SelectionItemExample() {
        _super.apply(this, arguments);
    }
    SelectionItemExample.prototype.render = function () {
        var _a = this.props, item = _a.item, itemIndex = _a.itemIndex, selection = _a.selection, selectionMode = _a.selectionMode;
        var isSelected = selection.isIndexSelected(itemIndex);
        return (React.createElement("div", {className: 'ms-SelectionItemExample', "data-selection-index": itemIndex}, 
            (selectionMode !== index_2.SelectionMode.none) && (React.createElement("div", {className: 'ms-SelectionItemExample-check', "data-selection-toggle": true}, 
                React.createElement(Check_1.Check, {checked: isSelected})
            )), 
            React.createElement("span", {className: 'ms-SelectionItemExample-name'}, item.name)));
    };
    return SelectionItemExample;
}(React.Component));
exports.SelectionItemExample = SelectionItemExample;

//# sourceMappingURL=Selection.Basic.Example.js.map
