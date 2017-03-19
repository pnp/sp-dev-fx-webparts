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
var DetailsList_Props_1 = require('../DetailsList/DetailsList.Props');
var DetailsHeader_1 = require('../DetailsList/DetailsHeader');
var DetailsRow_1 = require('../DetailsList/DetailsRow');
var FocusZone_1 = require('../../FocusZone');
var GroupedList_1 = require('../../GroupedList');
var List_1 = require('../../List');
var withViewport_1 = require('../../utilities/decorators/withViewport');
var object_1 = require('../../utilities/object');
var css_1 = require('../../utilities/css');
var autobind_1 = require('../../utilities/autobind');
var index_1 = require('../../utilities/selection/index');
var EventGroup_1 = require('../../utilities/eventGroup/EventGroup');
var rtl_1 = require('../../utilities/rtl');
var KeyCodes_1 = require('../../utilities/KeyCodes');
var DragDropHelper_1 = require('../../utilities/dragdrop/DragDropHelper');
require('./DetailsList.scss');
var MIN_COLUMN_WIDTH = 100; // this is the global min width
var CHECKBOX_WIDTH = 36;
var GROUP_EXPAND_WIDTH = 36;
var DEFAULT_INNER_PADDING = 16;
var DEFAULT_RENDERED_WINDOWS_AHEAD = 2;
var DEFAULT_RENDERED_WINDOWS_BEHIND = 2;
var DetailsList = (function (_super) {
    __extends(DetailsList, _super);
    function DetailsList(props) {
        _super.call(this, props);
        this._activeRows = {};
        this._columnOverrides = {};
        this._onColumnIsSizingChanged = this._onColumnIsSizingChanged.bind(this);
        this._onColumnResized = this._onColumnResized.bind(this);
        this._onColumnAutoResized = this._onColumnAutoResized.bind(this);
        this._onRowDidMount = this._onRowDidMount.bind(this);
        this._onRowWillUnmount = this._onRowWillUnmount.bind(this);
        this._onToggleCollapse = this._onToggleCollapse.bind(this);
        this._onActiveRowChanged = this._onActiveRowChanged.bind(this);
        this._onHeaderKeyDown = this._onHeaderKeyDown.bind(this);
        this._onContentKeyDown = this._onContentKeyDown.bind(this);
        this._onRenderCell = this._onRenderCell.bind(this);
        this._onGroupExpandStateChanged = this._onGroupExpandStateChanged.bind(this);
        this.state = {
            lastWidth: 0,
            adjustedColumns: this._getAdjustedColumns(props),
            layoutMode: props.layoutMode,
            isSizing: false,
            isDropping: false,
            isCollapsed: props.groupProps && props.groupProps.isAllGroupsCollapsed,
            isSomeGroupExpanded: props.groupProps && !props.groupProps.isAllGroupsCollapsed
        };
        this._events = new EventGroup_1.EventGroup(this);
        this._selection = props.selection || new index_1.Selection({ onSelectionChanged: null, getKey: props.getKey });
        this._selection.setItems(props.items, false);
        this._dragDropHelper = props.dragDropEvents ? new DragDropHelper_1.DragDropHelper({ selection: this._selection }) : null;
        this._initialFocusedIndex = props.initialFocusedIndex;
    }
    DetailsList.prototype.componentWillUnmount = function () {
        this._events.dispose();
        if (this._dragDropHelper) {
            this._dragDropHelper.dispose();
        }
    };
    DetailsList.prototype.componentDidUpdate = function (prevProps, prevState) {
        if (this.props.onDidUpdate) {
            this.props.onDidUpdate(this);
        }
    };
    DetailsList.prototype.componentWillReceiveProps = function (newProps) {
        var _a = this.props, checkboxVisibility = _a.checkboxVisibility, items = _a.items, setKey = _a.setKey, selectionMode = _a.selectionMode, columns = _a.columns, viewport = _a.viewport;
        var layoutMode = this.state.layoutMode;
        var shouldResetSelection = (newProps.setKey !== setKey) || newProps.setKey === undefined;
        var shouldForceUpdates = false;
        if (newProps.layoutMode !== this.props.layoutMode) {
            layoutMode = newProps.layoutMode;
            this.setState({ layoutMode: layoutMode });
            shouldForceUpdates = true;
        }
        if (shouldResetSelection) {
            this._initialFocusedIndex = newProps.initialFocusedIndex;
        }
        if (newProps.items !== items) {
            this._selection.setItems(newProps.items, shouldResetSelection);
        }
        if (newProps.checkboxVisibility !== checkboxVisibility ||
            newProps.columns !== columns ||
            newProps.viewport.width !== viewport.width) {
            shouldForceUpdates = true;
        }
        this._adjustColumns(newProps, true, layoutMode);
        if (newProps.selectionMode !== selectionMode) {
            shouldForceUpdates = true;
        }
        if (shouldForceUpdates) {
            this._forceListUpdates();
        }
    };
    DetailsList.prototype.render = function () {
        var _this = this;
        var _a = this.props, ariaLabelForListHeader = _a.ariaLabelForListHeader, ariaLabelForSelectAllCheckbox = _a.ariaLabelForSelectAllCheckbox, className = _a.className, checkboxVisibility = _a.checkboxVisibility, constrainMode = _a.constrainMode, dragDropEvents = _a.dragDropEvents, groups = _a.groups, groupProps = _a.groupProps, items = _a.items, isHeaderVisible = _a.isHeaderVisible, onItemInvoked = _a.onItemInvoked, onColumnHeaderClick = _a.onColumnHeaderClick, onColumnHeaderContextMenu = _a.onColumnHeaderContextMenu, selectionMode = _a.selectionMode, ariaLabel = _a.ariaLabel, ariaLabelForGrid = _a.ariaLabelForGrid, rowElementEventMap = _a.rowElementEventMap, _b = _a.shouldApplyApplicationRole, shouldApplyApplicationRole = _b === void 0 ? false : _b;
        var _c = this.state, adjustedColumns = _c.adjustedColumns, isCollapsed = _c.isCollapsed, layoutMode = _c.layoutMode, isSizing = _c.isSizing, isSomeGroupExpanded = _c.isSomeGroupExpanded;
        var _d = this, selection = _d._selection, dragDropHelper = _d._dragDropHelper;
        var groupNestingDepth = this._getGroupNestingDepth();
        var additionalListProps = {
            renderedWindowsAhead: isSizing ? 0 : DEFAULT_RENDERED_WINDOWS_AHEAD,
            renderedWindowsBehind: isSizing ? 0 : DEFAULT_RENDERED_WINDOWS_BEHIND
        };
        var selectAllVisibility = DetailsHeader_1.SelectAllVisibility.none; // for SelectionMode.none
        if (selectionMode === index_1.SelectionMode.single) {
            selectAllVisibility = DetailsHeader_1.SelectAllVisibility.hidden;
        }
        if (selectionMode === index_1.SelectionMode.multiple) {
            // if isCollapsedGroupSelectVisible is false, disable select all when the list has all collapsed groups
            var isCollapsedGroupSelectVisible = groupProps && groupProps.headerProps && groupProps.headerProps.isCollapsedGroupSelectVisible;
            if (isCollapsedGroupSelectVisible === undefined) {
                isCollapsedGroupSelectVisible = true;
            }
            var isSelectAllVisible = isCollapsedGroupSelectVisible || !groups || isSomeGroupExpanded;
            selectAllVisibility = isSelectAllVisible ? DetailsHeader_1.SelectAllVisibility.visible : DetailsHeader_1.SelectAllVisibility.hidden;
        }
        if (checkboxVisibility === DetailsList_Props_1.CheckboxVisibility.hidden) {
            selectAllVisibility = DetailsHeader_1.SelectAllVisibility.none;
        }
        return (
        // If shouldApplyApplicationRole is true, role application will be applied to make arrow keys work
        // with JAWS.
        React.createElement("div", {ref: 'root', className: css_1.css('ms-DetailsList', className, {
            'is-fixed': layoutMode === DetailsList_Props_1.DetailsListLayoutMode.fixedColumns,
            'is-horizontalConstrained': constrainMode === DetailsList_Props_1.ConstrainMode.horizontalConstrained
        }), "data-automationid": 'DetailsList', "data-is-scrollable": 'false', "aria-label": ariaLabel, role: shouldApplyApplicationRole ? 'application' : ''}, 
            React.createElement("div", {role: 'grid', "aria-label": ariaLabelForGrid}, 
                React.createElement("div", {onKeyDown: this._onHeaderKeyDown, role: 'presentation'}, isHeaderVisible && (React.createElement(DetailsHeader_1.DetailsHeader, {ref: 'header', selectionMode: selectionMode, layoutMode: layoutMode, selection: selection, columns: adjustedColumns, onColumnClick: onColumnHeaderClick, onColumnContextMenu: onColumnHeaderContextMenu, onColumnResized: this._onColumnResized, onColumnIsSizingChanged: this._onColumnIsSizingChanged, onColumnAutoResized: this._onColumnAutoResized, groupNestingDepth: groupNestingDepth, isAllCollapsed: isCollapsed, onToggleCollapseAll: this._onToggleCollapse, ariaLabel: ariaLabelForListHeader, ariaLabelForSelectAllCheckbox: ariaLabelForSelectAllCheckbox, selectAllVisibility: selectAllVisibility}))), 
                React.createElement("div", {ref: 'contentContainer', onKeyDown: this._onContentKeyDown, role: 'presentation'}, 
                    React.createElement(FocusZone_1.FocusZone, {ref: 'focusZone', direction: FocusZone_1.FocusZoneDirection.vertical, isInnerZoneKeystroke: function (ev) { return (ev.which === rtl_1.getRTLSafeKeyCode(KeyCodes_1.KeyCodes.right)); }, onActiveElementChanged: this._onActiveRowChanged}, 
                        React.createElement(index_1.SelectionZone, {ref: 'selectionZone', selection: selection, selectionMode: selectionMode, onItemInvoked: onItemInvoked}, groups ? (React.createElement(GroupedList_1.GroupedList, {groups: groups, groupProps: groupProps, items: items, onRenderCell: this._onRenderCell, selection: selection, selectionMode: selectionMode, dragDropEvents: dragDropEvents, dragDropHelper: dragDropHelper, eventsToRegister: rowElementEventMap, listProps: additionalListProps, onGroupExpandStateChanged: this._onGroupExpandStateChanged, ref: 'groupedList'})) : (React.createElement(List_1.List, __assign({items: items, onRenderCell: function (item, itemIndex) { return _this._onRenderCell(0, item, itemIndex); }}, additionalListProps, {ref: 'list'}))))
                    )
                ))
        ));
    };
    DetailsList.prototype.forceUpdate = function () {
        _super.prototype.forceUpdate.call(this);
        this._forceListUpdates();
    };
    DetailsList.prototype._onRenderRow = function (props) {
        return React.createElement(DetailsRow_1.DetailsRow, __assign({}, props));
    };
    DetailsList.prototype._onRenderCell = function (nestingDepth, item, index) {
        var _a = this.props, dragDropEvents = _a.dragDropEvents, eventsToRegister = _a.rowElementEventMap, onRenderMissingItem = _a.onRenderMissingItem, onRenderItemColumn = _a.onRenderItemColumn, _b = _a.onRenderRow, onRenderRow = _b === void 0 ? this._onRenderRow : _b, selectionMode = _a.selectionMode, viewport = _a.viewport, checkboxVisibility = _a.checkboxVisibility, getRowAriaLabel = _a.getRowAriaLabel, checkButtonAriaLabel = _a.checkButtonAriaLabel;
        var selection = this._selection;
        var dragDropHelper = this._dragDropHelper;
        var columns = this.state.adjustedColumns;
        if (!item) {
            if (onRenderMissingItem) {
                onRenderMissingItem(index);
            }
            return null;
        }
        return onRenderRow({
            item: item,
            itemIndex: index,
            columns: columns,
            groupNestingDepth: nestingDepth,
            selectionMode: selectionMode,
            selection: selection,
            onDidMount: this._onRowDidMount,
            onWillUnmount: this._onRowWillUnmount,
            onRenderItemColumn: onRenderItemColumn,
            eventsToRegister: eventsToRegister,
            dragDropEvents: dragDropEvents,
            dragDropHelper: dragDropHelper,
            viewport: viewport,
            checkboxVisibility: checkboxVisibility,
            getRowAriaLabel: getRowAriaLabel,
            checkButtonAriaLabel: checkButtonAriaLabel
        });
    };
    DetailsList.prototype._onGroupExpandStateChanged = function (isSomeGroupExpanded) {
        this.setState({ isSomeGroupExpanded: isSomeGroupExpanded });
    };
    DetailsList.prototype._onColumnIsSizingChanged = function (column, isSizing) {
        this.setState({ isSizing: isSizing });
    };
    DetailsList.prototype._onHeaderKeyDown = function (ev) {
        if (ev.which === KeyCodes_1.KeyCodes.down) {
            if (this.refs.focusZone && this.refs.focusZone.focus()) {
                ev.preventDefault();
                ev.stopPropagation();
            }
        }
    };
    DetailsList.prototype._onContentKeyDown = function (ev) {
        if (ev.which === KeyCodes_1.KeyCodes.up) {
            if (this.refs.header && this.refs.header.focus()) {
                ev.preventDefault();
                ev.stopPropagation();
            }
        }
    };
    DetailsList.prototype._getGroupNestingDepth = function () {
        var groups = this.props.groups;
        var level = 0;
        var groupsInLevel = groups;
        while (groupsInLevel && groupsInLevel.length > 0) {
            level++;
            groupsInLevel = groupsInLevel[0].children;
        }
        return level;
    };
    DetailsList.prototype._onRowDidMount = function (row) {
        var onRowDidMount = this.props.onRowDidMount;
        var index = row.props.itemIndex;
        this._activeRows[index] = row; // this is used for column auto resize
        // Set focus to the row if it should receive focus.
        if (this._initialFocusedIndex !== undefined && index === this._initialFocusedIndex) {
            if (this.refs.selectionZone) {
                this.refs.selectionZone.ignoreNextFocus();
            }
            row.focus();
            delete this._initialFocusedIndex;
        }
        if (onRowDidMount) {
            onRowDidMount(row.props.item, index);
        }
    };
    DetailsList.prototype._onRowWillUnmount = function (row) {
        var onRowWillUnmount = this.props.onRowWillUnmount;
        var index = row.props.itemIndex;
        delete this._activeRows[index];
        this._events.off(row.refs.root);
        if (onRowWillUnmount) {
            onRowWillUnmount(row.props.item, index);
        }
    };
    DetailsList.prototype._onToggleCollapse = function (collapsed) {
        this.setState({
            isCollapsed: collapsed
        });
        if (this.refs.groupedList) {
            this.refs.groupedList.toggleCollapseAll(collapsed);
        }
    };
    DetailsList.prototype._forceListUpdates = function () {
        if (this.refs.groupedList) {
            this.refs.groupedList.forceUpdate();
        }
        if (this.refs.list) {
            this.refs.list.forceUpdate();
        }
    };
    DetailsList.prototype._adjustColumns = function (newProps, forceUpdate, layoutMode) {
        var adjustedColumns = this._getAdjustedColumns(newProps, forceUpdate, layoutMode);
        var viewportWidth = this.props.viewport.width;
        if (adjustedColumns) {
            this.setState({
                adjustedColumns: adjustedColumns,
                lastWidth: viewportWidth,
                layoutMode: layoutMode
            });
        }
    };
    /** Returns adjusted columns, given the viewport size and layout mode. */
    DetailsList.prototype._getAdjustedColumns = function (newProps, forceUpdate, layoutMode) {
        var _this = this;
        var newColumns = newProps.columns, newItems = newProps.items, viewportWidth = newProps.viewport.width, selectionMode = newProps.selectionMode;
        if (layoutMode === undefined) {
            layoutMode = newProps.layoutMode;
        }
        var columns = this.props ? this.props.columns : [];
        var lastWidth = this.state ? this.state.lastWidth : -1;
        var lastSelectionMode = this.state ? this.state.lastSelectionMode : undefined;
        if (viewportWidth !== undefined) {
            if (!forceUpdate &&
                lastWidth === viewportWidth &&
                lastSelectionMode === selectionMode &&
                (!columns || newColumns === columns)) {
                return;
            }
        }
        else {
            viewportWidth = this.props.viewport.width;
        }
        newColumns = newColumns || buildColumns(newItems, true);
        var adjustedColumns;
        if (layoutMode === DetailsList_Props_1.DetailsListLayoutMode.fixedColumns) {
            adjustedColumns = this._getFixedColumns(newColumns);
        }
        else {
            adjustedColumns = this._getJustifiedColumns(newColumns, viewportWidth);
        }
        // Preserve adjusted column calculated widths.
        adjustedColumns.forEach(function (column) {
            var overrides = _this._columnOverrides[column.key] = _this._columnOverrides[column.key] || {};
            overrides.calculatedWidth = column.calculatedWidth;
        });
        return adjustedColumns;
    };
    /** Builds a set of columns based on the given columns mixed with the current overrides. */
    DetailsList.prototype._getFixedColumns = function (newColumns) {
        var _this = this;
        return newColumns.map(function (column) {
            var newColumn = object_1.assign({}, column, _this._columnOverrides[column.key]);
            if (!newColumn.calculatedWidth) {
                newColumn.calculatedWidth = newColumn.maxWidth || newColumn.minWidth || MIN_COLUMN_WIDTH;
            }
            return newColumn;
        });
    };
    /** Builds a set of columns to fix within the viewport width. */
    DetailsList.prototype._getJustifiedColumns = function (newColumns, viewportWidth) {
        var _a = this.props, selectionMode = _a.selectionMode, groups = _a.groups;
        var outerPadding = DEFAULT_INNER_PADDING;
        var rowCheckWidth = (selectionMode !== index_1.SelectionMode.none) ? CHECKBOX_WIDTH : 0;
        var groupExpandWidth = groups ? GROUP_EXPAND_WIDTH : 0;
        var totalWidth = 0; // offset because we have one less inner padding.
        var availableWidth = viewportWidth - outerPadding - rowCheckWidth - groupExpandWidth;
        var adjustedColumns = newColumns.map(function (column, i) {
            var newColumn = object_1.assign({}, column, {
                calculatedWidth: column.minWidth || MIN_COLUMN_WIDTH
            });
            totalWidth += newColumn.calculatedWidth + (i > 0 ? DEFAULT_INNER_PADDING : 0);
            return newColumn;
        });
        var lastIndex = adjustedColumns.length - 1;
        // Remove collapsable columns.
        while (lastIndex > 1 && totalWidth > availableWidth) {
            var column = adjustedColumns[lastIndex];
            if (column.isCollapsable) {
                totalWidth -= column.calculatedWidth + DEFAULT_INNER_PADDING;
                adjustedColumns.splice(lastIndex, 1);
            }
            lastIndex--;
        }
        // Then expand columns starting at the beginning, until we've filled the width.
        for (var i = 0; i < adjustedColumns.length && totalWidth < availableWidth; i++) {
            var column = adjustedColumns[i];
            var maxWidth = column.maxWidth;
            var minWidth = column.minWidth || maxWidth || MIN_COLUMN_WIDTH;
            var spaceLeft = availableWidth - totalWidth;
            var increment = Math.min(spaceLeft, maxWidth - minWidth);
            // Add remaining space to the last column.
            if (i === (adjustedColumns.length - 1)) {
                increment = spaceLeft;
            }
            column.calculatedWidth += increment;
            totalWidth += increment;
        }
        // Mark the last column as not resizable to avoid extra scrolling issues.
        if (adjustedColumns.length) {
            adjustedColumns[adjustedColumns.length - 1].isResizable = false;
        }
        return adjustedColumns;
    };
    DetailsList.prototype._onColumnResized = function (resizingColumn, newWidth) {
        this._columnOverrides[resizingColumn.key].calculatedWidth = Math.max(resizingColumn.minWidth || MIN_COLUMN_WIDTH, newWidth);
        this._adjustColumns(this.props, true, DetailsList_Props_1.DetailsListLayoutMode.fixedColumns);
        this._forceListUpdates();
    };
    /**
     * Callback function when double clicked on the details header column resizer
     * which will measure the column cells of all the active rows and resize the
     * column to the max cell width.
     *
     * @private
     * @param {IColumn} column (double clicked column definition)
     * @param {number} columnIndex (double clicked column index)
     * @todo min width 100 should be changed to const value and should be consistent with the value used on _onSizerMove method in DetailsHeader
     */
    DetailsList.prototype._onColumnAutoResized = function (column, columnIndex) {
        var _this = this;
        var max = 0;
        var count = 0;
        var totalCount = Object.keys(this._activeRows).length;
        for (var key in this._activeRows) {
            if (this._activeRows.hasOwnProperty(key)) {
                var currentRow = this._activeRows[key];
                currentRow.measureCell(columnIndex, function (width) {
                    max = Math.max(max, width);
                    count++;
                    if (count === totalCount) {
                        _this._onColumnResized(column, max);
                    }
                });
            }
        }
    };
    /**
     * Call back function when an element in FocusZone becomes active. It will transalate it into item
     * and call onActiveItemChanged callback if specified.
     *
     * @private
     * @param {el} row element that became active in Focus Zone
     * @param {ev} focus event from Focus Zone
     */
    DetailsList.prototype._onActiveRowChanged = function (el, ev) {
        var _a = this.props, items = _a.items, onActiveItemChanged = _a.onActiveItemChanged;
        if (!onActiveItemChanged || !el) {
            return;
        }
        var index = Number(el.getAttribute('data-item-index'));
        if (index >= 0) {
            onActiveItemChanged(items[index], index, ev);
        }
    };
    ;
    DetailsList.defaultProps = {
        layoutMode: DetailsList_Props_1.DetailsListLayoutMode.justified,
        selectionMode: index_1.SelectionMode.multiple,
        constrainMode: DetailsList_Props_1.ConstrainMode.horizontalConstrained,
        checkboxVisibility: DetailsList_Props_1.CheckboxVisibility.onHover,
        isHeaderVisible: true
    };
    __decorate([
        autobind_1.autobind
    ], DetailsList.prototype, "_onRenderRow", null);
    DetailsList = __decorate([
        withViewport_1.withViewport
    ], DetailsList);
    return DetailsList;
}(React.Component));
exports.DetailsList = DetailsList;
function buildColumns(items, canResizeColumns, onColumnClick, sortedColumnKey, isSortedDescending, groupedColumnKey, isMultiline) {
    var columns = [];
    if (items && items.length) {
        var firstItem = items[0];
        var isFirstColumn = true;
        for (var propName in firstItem) {
            if (firstItem.hasOwnProperty(propName)) {
                columns.push({
                    key: propName,
                    name: propName,
                    fieldName: propName,
                    minWidth: MIN_COLUMN_WIDTH,
                    maxWidth: 300,
                    isCollapsable: !!columns.length,
                    isMultiline: (isMultiline === undefined) ? false : isMultiline,
                    isSorted: sortedColumnKey === propName,
                    isSortedDescending: !!isSortedDescending,
                    isRowHeader: false,
                    columnActionsMode: DetailsList_Props_1.ColumnActionsMode.clickable,
                    isResizable: canResizeColumns,
                    onColumnClick: onColumnClick,
                    isGrouped: groupedColumnKey === propName
                });
                isFirstColumn = false;
            }
        }
    }
    return columns;
}
exports.buildColumns = buildColumns;

//# sourceMappingURL=DetailsList.js.map
