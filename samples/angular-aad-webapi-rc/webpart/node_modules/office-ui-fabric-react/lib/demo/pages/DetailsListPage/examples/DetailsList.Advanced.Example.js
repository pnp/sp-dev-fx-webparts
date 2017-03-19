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
var React = require('react');
var index_1 = require('../../../../index');
var interfaces_1 = require('../../../../utilities/selection/interfaces');
var data_1 = require('../../../utilities/data');
require('./DetailsList.Advanced.Example.scss');
var DEFAULT_ITEM_LIMIT = 5;
var PAGING_SIZE = 10;
var PAGING_DELAY = 5000;
var ITEMS_COUNT = 5000;
var _items;
var DetailsListAdvancedExample = (function (_super) {
    __extends(DetailsListAdvancedExample, _super);
    function DetailsListAdvancedExample() {
        _super.call(this);
        if (!_items) {
            _items = data_1.createListItems(ITEMS_COUNT);
        }
        this._selection = new index_1.Selection();
        this._selection.setItems(_items, false);
        this.state = {
            items: _items,
            groups: null,
            groupItemLimit: DEFAULT_ITEM_LIMIT,
            layoutMode: index_1.DetailsListLayoutMode.justified,
            constrainMode: index_1.ConstrainMode.horizontalConstrained,
            selectionMode: interfaces_1.SelectionMode.multiple,
            canResizeColumns: true,
            checkboxVisibility: index_1.CheckboxVisibility.onHover,
            columns: this._buildColumns(_items, true, this._onColumnClick, ''),
            contextualMenuProps: null,
            sortedColumnKey: 'name',
            isSortedDescending: false,
            isLazyLoaded: false,
            isHeaderVisible: true
        };
    }
    DetailsListAdvancedExample.prototype.render = function () {
        var _this = this;
        var _a = this.state, checkboxVisibility = _a.checkboxVisibility, columns = _a.columns, constrainMode = _a.constrainMode, contextualMenuProps = _a.contextualMenuProps, groupItemLimit = _a.groupItemLimit, groups = _a.groups, isHeaderVisible = _a.isHeaderVisible, items = _a.items, layoutMode = _a.layoutMode, selectionMode = _a.selectionMode;
        var isGrouped = groups && groups.length > 0;
        var groupProps = {
            getGroupItemLimit: function (group) {
                if (group) {
                    return group.isShowingAll ? group.count : Math.min(group.count, groupItemLimit);
                }
                else {
                    return items.length;
                }
            },
            footerProps: {
                showAllLinkText: 'Show all'
            }
        };
        return (React.createElement("div", {className: 'ms-DetailsListAdvancedExample'}, 
            React.createElement(index_1.CommandBar, {items: this._getCommandItems()}), 
            (isGrouped) ?
                React.createElement(index_1.TextField, {label: 'Group Item Limit', onChanged: this._onItemLimitChanged}) :
                (null), 
            React.createElement(index_1.DetailsList, {ref: 'list', setKey: 'items', items: items, groups: groups, columns: columns, checkboxVisibility: checkboxVisibility, layoutMode: layoutMode, isHeaderVisible: isHeaderVisible, selectionMode: selectionMode, constrainMode: constrainMode, groupProps: groupProps, onItemInvoked: this._onItemInvoked, ariaLabelForListHeader: 'Column headers. Use menus to perform column operations like sort and filter', ariaLabelForSelectAllCheckbox: 'Toggle selection for all items', onRenderMissingItem: function (index) {
                _this._onDataMiss(index);
                return null;
            }}), 
            contextualMenuProps && (React.createElement(index_1.ContextualMenu, __assign({}, contextualMenuProps)))));
    };
    DetailsListAdvancedExample.prototype._onDataMiss = function (index) {
        var _this = this;
        index = Math.floor(index / PAGING_SIZE) * PAGING_SIZE;
        if (!this._isFetchingItems) {
            this._isFetchingItems = true;
            setTimeout(function () {
                _this._isFetchingItems = false;
                var itemsCopy = [].concat(_this.state.items);
                itemsCopy.splice.apply(itemsCopy, [index, PAGING_SIZE].concat(_items.slice(index, index + PAGING_SIZE)));
                _this.setState({
                    items: itemsCopy
                });
            }, PAGING_DELAY);
        }
    };
    DetailsListAdvancedExample.prototype._onToggleLazyLoad = function () {
        var isLazyLoaded = this.state.isLazyLoaded;
        isLazyLoaded = !isLazyLoaded;
        this.setState({
            isLazyLoaded: isLazyLoaded,
            items: isLazyLoaded ? _items.slice(0, PAGING_SIZE).concat(new Array(ITEMS_COUNT - PAGING_SIZE)) : _items
        });
    };
    DetailsListAdvancedExample.prototype._onToggleResizing = function () {
        var _a = this.state, items = _a.items, canResizeColumns = _a.canResizeColumns, sortedColumnKey = _a.sortedColumnKey, isSortedDescending = _a.isSortedDescending;
        canResizeColumns = !canResizeColumns;
        this.setState({
            canResizeColumns: canResizeColumns,
            columns: this._buildColumns(items, canResizeColumns, this._onColumnClick, sortedColumnKey, isSortedDescending)
        });
    };
    DetailsListAdvancedExample.prototype._onLayoutChanged = function (ev, menuItem) {
        this.setState({
            layoutMode: menuItem.data
        });
    };
    DetailsListAdvancedExample.prototype._onConstrainModeChanged = function (ev, menuItem) {
        this.setState({
            constrainMode: menuItem.data
        });
    };
    DetailsListAdvancedExample.prototype._onSelectionChanged = function (ev, menuItem) {
        this.setState({
            selectionMode: menuItem.data
        });
    };
    DetailsListAdvancedExample.prototype._onItemLimitChanged = function (value) {
        var newValue = parseInt(value, 10);
        if (isNaN(newValue)) {
            newValue = DEFAULT_ITEM_LIMIT;
        }
        this.setState({
            groupItemLimit: newValue
        });
    };
    DetailsListAdvancedExample.prototype._getCommandItems = function () {
        var _this = this;
        var _a = this.state, canResizeColumns = _a.canResizeColumns, checkboxVisibility = _a.checkboxVisibility, constrainMode = _a.constrainMode, isHeaderVisible = _a.isHeaderVisible, isLazyLoaded = _a.isLazyLoaded, layoutMode = _a.layoutMode, selectionMode = _a.selectionMode;
        return [
            {
                key: 'addRow',
                name: 'Insert row',
                icon: 'Add',
                onClick: this._onAddRow
            },
            {
                key: 'deleteRow',
                name: 'Delete row',
                icon: 'Delete',
                onClick: this._onDeleteRow
            },
            {
                key: 'configure',
                name: 'Configure',
                icon: 'Settings',
                items: [
                    {
                        key: 'resizing',
                        name: 'Allow column resizing',
                        canCheck: true,
                        checked: canResizeColumns,
                        onClick: this._onToggleResizing
                    },
                    {
                        key: 'headerVisible',
                        name: 'Is header visible',
                        canCheck: true,
                        checked: isHeaderVisible,
                        onClick: function () { return _this.setState({ isHeaderVisible: !isHeaderVisible }); }
                    },
                    {
                        key: 'lazyload',
                        name: 'Simulate async loading',
                        canCheck: true,
                        checked: isLazyLoaded,
                        onClick: this._onToggleLazyLoad
                    },
                    {
                        key: 'dash',
                        name: '-'
                    },
                    {
                        key: 'checkboxVisibility',
                        name: 'Checkbox visibility',
                        items: [
                            {
                                key: 'checkboxVisibility.always',
                                name: 'Always',
                                canCheck: true,
                                isChecked: checkboxVisibility === index_1.CheckboxVisibility.always,
                                onClick: function () { return _this.setState({ checkboxVisibility: index_1.CheckboxVisibility.always }); }
                            },
                            {
                                key: 'checkboxVisibility.onHover',
                                name: 'On hover',
                                canCheck: true,
                                isChecked: checkboxVisibility === index_1.CheckboxVisibility.onHover,
                                onClick: function () { return _this.setState({ checkboxVisibility: index_1.CheckboxVisibility.onHover }); }
                            },
                            {
                                key: 'checkboxVisibility.hidden',
                                name: 'Hidden',
                                canCheck: true,
                                isChecked: checkboxVisibility === index_1.CheckboxVisibility.hidden,
                                onClick: function () { return _this.setState({ checkboxVisibility: index_1.CheckboxVisibility.hidden }); }
                            },
                        ]
                    },
                    {
                        key: 'layoutMode',
                        name: 'Layout mode',
                        items: [
                            {
                                key: index_1.DetailsListLayoutMode[index_1.DetailsListLayoutMode.fixedColumns],
                                name: 'Fixed columns',
                                canCheck: true,
                                checked: layoutMode === index_1.DetailsListLayoutMode.fixedColumns,
                                onClick: this._onLayoutChanged,
                                data: index_1.DetailsListLayoutMode.fixedColumns
                            },
                            {
                                key: index_1.DetailsListLayoutMode[index_1.DetailsListLayoutMode.justified],
                                name: 'Justified columns',
                                canCheck: true,
                                checked: layoutMode === index_1.DetailsListLayoutMode.justified,
                                onClick: this._onLayoutChanged,
                                data: index_1.DetailsListLayoutMode.justified
                            }
                        ]
                    },
                    {
                        key: 'selectionMode',
                        name: 'Selection mode',
                        items: [
                            {
                                key: interfaces_1.SelectionMode[interfaces_1.SelectionMode.none],
                                name: 'None',
                                canCheck: true,
                                checked: selectionMode === interfaces_1.SelectionMode.none,
                                onClick: this._onSelectionChanged,
                                data: interfaces_1.SelectionMode.none
                            },
                            {
                                key: interfaces_1.SelectionMode[interfaces_1.SelectionMode.single],
                                name: 'Single select',
                                canCheck: true,
                                checked: selectionMode === interfaces_1.SelectionMode.single,
                                onClick: this._onSelectionChanged,
                                data: interfaces_1.SelectionMode.single
                            },
                            {
                                key: interfaces_1.SelectionMode[interfaces_1.SelectionMode.multiple],
                                name: 'Multi select',
                                canCheck: true,
                                checked: selectionMode === interfaces_1.SelectionMode.multiple,
                                onClick: this._onSelectionChanged,
                                data: interfaces_1.SelectionMode.multiple
                            },
                        ]
                    },
                    {
                        key: 'constrainMode',
                        name: 'Constrain mode',
                        items: [
                            {
                                key: index_1.ConstrainMode[index_1.ConstrainMode.unconstrained],
                                name: 'Unconstrained',
                                canCheck: true,
                                checked: constrainMode === index_1.ConstrainMode.unconstrained,
                                onClick: this._onConstrainModeChanged,
                                data: index_1.ConstrainMode.unconstrained
                            },
                            {
                                key: index_1.ConstrainMode[index_1.ConstrainMode.horizontalConstrained],
                                name: 'Horizontal constrained',
                                canCheck: true,
                                checked: constrainMode === index_1.ConstrainMode.horizontalConstrained,
                                onClick: this._onConstrainModeChanged,
                                data: index_1.ConstrainMode.horizontalConstrained
                            }
                        ]
                    }
                ]
            }
        ];
    };
    DetailsListAdvancedExample.prototype._getContextualMenuProps = function (ev, column) {
        var _this = this;
        var items = [
            {
                key: 'aToZ',
                name: 'A to Z',
                icon: 'SortUp',
                canCheck: true,
                checked: column.isSorted && !column.isSortedDescending,
                onClick: function () { return _this._onSortColumn(column.key, false); }
            },
            {
                key: 'zToA',
                name: 'Z to A',
                icon: 'SortDown',
                canCheck: true,
                checked: column.isSorted && column.isSortedDescending,
                onClick: function () { return _this._onSortColumn(column.key, true); }
            }
        ];
        if (data_1.isGroupable(column.key)) {
            items.push({
                key: 'groupBy',
                name: 'Group By ' + column.name,
                icon: 'GroupedDescending',
                canCheck: true,
                checked: column.isGrouped,
                onClick: function () { return _this._onGroupByColumn(column); }
            });
        }
        return {
            items: items,
            targetElement: ev.currentTarget,
            directionalHint: index_1.DirectionalHint.bottomLeftEdge,
            gapSpace: 10,
            isBeakVisible: true,
            onDismiss: this._onContextualMenuDismissed
        };
    };
    DetailsListAdvancedExample.prototype._onItemInvoked = function (item, index) {
        console.log('Item invoked', item, index);
    };
    DetailsListAdvancedExample.prototype._onColumnClick = function (ev, column) {
        this.setState({
            contextualMenuProps: this._getContextualMenuProps(ev, column)
        });
    };
    DetailsListAdvancedExample.prototype._onContextualMenuDismissed = function () {
        this.setState({
            contextualMenuProps: null
        });
    };
    DetailsListAdvancedExample.prototype._onSortColumn = function (key, isSortedDescending) {
        var sortedItems = _items.slice(0).sort(function (a, b) { return (isSortedDescending ? a[key] < b[key] : a[key] > b[key]) ? 1 : -1; });
        this.setState({
            items: sortedItems,
            groups: null,
            columns: this._buildColumns(sortedItems, true, this._onColumnClick, key, isSortedDescending),
            isSortedDescending: isSortedDescending,
            sortedColumnKey: key
        });
    };
    DetailsListAdvancedExample.prototype._onGroupByColumn = function (column) {
        var key = column.key, isGrouped = column.isGrouped;
        var _a = this.state, sortedColumnKey = _a.sortedColumnKey, isSortedDescending = _a.isSortedDescending, groups = _a.groups, items = _a.items, columns = _a.columns;
        if (isGrouped) {
            this._onSortColumn(sortedColumnKey, isSortedDescending);
        }
        else {
            var groupedItems = [];
            var newGroups = null;
            if (groups) {
                newGroups = groups.concat([]);
                groupedItems = this._groupByKey(newGroups, items, key);
            }
            else {
                groupedItems = this._groupItems(items, key);
                newGroups = this._getGroups(groupedItems, key);
            }
            var newColumns = columns;
            newColumns.filter(function (matchColumn) { return matchColumn.key === key; }).forEach(function (groupedColumn) {
                groupedColumn.isGrouped = true;
            });
            this.setState({
                items: groupedItems,
                columns: newColumns,
                groups: newGroups
            });
        }
    };
    DetailsListAdvancedExample.prototype._groupByKey = function (groups, items, key) {
        var _this = this;
        var groupedItems = [];
        if (groups) {
            groups.forEach(function (group) {
                if (group.children && group.children.length > 0) {
                    var childGroupedItems = _this._groupByKey(group.children, items, key);
                    groupedItems = groupedItems.concat(childGroupedItems);
                }
                else {
                    var itemsInGroup = items.slice(group.startIndex, group.startIndex + group.count);
                    var nextLevelGroupedItems = _this._groupItems(itemsInGroup, key);
                    groupedItems = groupedItems.concat(nextLevelGroupedItems);
                    group.children = _this._getGroups(nextLevelGroupedItems, key, group);
                }
            });
        }
        return groupedItems;
    };
    DetailsListAdvancedExample.prototype._groupItems = function (items, columnKey) {
        return items.slice(0).sort(function (a, b) { return ((a[columnKey] < b[columnKey]) ? -1 : 1); });
    };
    DetailsListAdvancedExample.prototype._getGroups = function (groupedItems, key, parentGroup) {
        var _this = this;
        var separator = '-';
        var groups = groupedItems.reduce(function (current, item, index) {
            var currentGroup = current[current.length - 1];
            if (!currentGroup || (_this._getLeafGroupKey(currentGroup.key, separator) !== item[key])) {
                current.push({
                    key: (parentGroup ? parentGroup.key + separator : '') + item[key],
                    name: key + ': ' + item[key],
                    startIndex: parentGroup ? parentGroup.startIndex + index : index,
                    count: 1,
                    level: parentGroup ? parentGroup.level + 1 : 0
                });
            }
            else {
                currentGroup.count++;
            }
            return current;
        }, []);
        return groups;
    };
    DetailsListAdvancedExample.prototype._getLeafGroupKey = function (key, separator) {
        var leafKey = key;
        if (key.indexOf(separator) !== -1) {
            var arrKeys = key.split(separator);
            leafKey = arrKeys[arrKeys.length - 1];
        }
        return leafKey;
    };
    DetailsListAdvancedExample.prototype._onAddRow = function () {
        this.setState({
            items: data_1.createListItems(1).concat(this.state.items)
        });
    };
    DetailsListAdvancedExample.prototype._onDeleteRow = function () {
        this.setState({
            items: this.state.items.slice(1)
        });
    };
    DetailsListAdvancedExample.prototype._buildColumns = function (items, canResizeColumns, onColumnClick, sortedColumnKey, isSortedDescending, groupedColumnKey) {
        var columns = index_1.buildColumns(items, canResizeColumns, onColumnClick, sortedColumnKey, isSortedDescending, groupedColumnKey);
        columns.forEach(function (column) {
            if (column.key === 'description') {
                column.isMultiline = true;
                column.minWidth = 200;
            }
            else if (column.key === 'name') {
                column.onRender = function (item) { return (React.createElement(index_1.Link, null, item.name)); };
            }
            else if (column.key === 'key') {
                column.columnActionsMode = index_1.ColumnActionsMode.disabled;
                column.onRender = function (item) { return (React.createElement(index_1.Link, {href: '#'}, item.key)); };
                column.minWidth = 90;
                column.maxWidth = 90;
            }
        });
        return columns;
    };
    __decorate([
        index_1.autobind
    ], DetailsListAdvancedExample.prototype, "_onToggleLazyLoad", null);
    __decorate([
        index_1.autobind
    ], DetailsListAdvancedExample.prototype, "_onToggleResizing", null);
    __decorate([
        index_1.autobind
    ], DetailsListAdvancedExample.prototype, "_onLayoutChanged", null);
    __decorate([
        index_1.autobind
    ], DetailsListAdvancedExample.prototype, "_onConstrainModeChanged", null);
    __decorate([
        index_1.autobind
    ], DetailsListAdvancedExample.prototype, "_onSelectionChanged", null);
    __decorate([
        index_1.autobind
    ], DetailsListAdvancedExample.prototype, "_onItemLimitChanged", null);
    __decorate([
        index_1.autobind
    ], DetailsListAdvancedExample.prototype, "_onItemInvoked", null);
    __decorate([
        index_1.autobind
    ], DetailsListAdvancedExample.prototype, "_onColumnClick", null);
    __decorate([
        index_1.autobind
    ], DetailsListAdvancedExample.prototype, "_onContextualMenuDismissed", null);
    __decorate([
        index_1.autobind
    ], DetailsListAdvancedExample.prototype, "_onSortColumn", null);
    __decorate([
        index_1.autobind
    ], DetailsListAdvancedExample.prototype, "_onGroupByColumn", null);
    __decorate([
        index_1.autobind
    ], DetailsListAdvancedExample.prototype, "_onAddRow", null);
    __decorate([
        index_1.autobind
    ], DetailsListAdvancedExample.prototype, "_onDeleteRow", null);
    return DetailsListAdvancedExample;
}(React.Component));
exports.DetailsListAdvancedExample = DetailsListAdvancedExample;

//# sourceMappingURL=DetailsList.Advanced.Example.js.map
