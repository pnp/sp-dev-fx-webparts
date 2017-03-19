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
var React = require('react');
var DetailsList_Props_1 = require('./DetailsList.Props');
var DetailsRowCheck_1 = require('./DetailsRowCheck');
var GroupSpacer_1 = require('../GroupedList/GroupSpacer');
var DetailsRowFields_1 = require('./DetailsRowFields');
var FocusZone_1 = require('../../FocusZone');
var interfaces_1 = require('../../utilities/selection/interfaces');
var EventGroup_1 = require('../../utilities/eventGroup/EventGroup');
var object_1 = require('../../utilities/object');
var css_1 = require('../../utilities/css');
require('./DetailsRow.scss');
var DEFAULT_DROPPING_CSS_CLASS = 'is-dropping';
var DetailsRow = (function (_super) {
    __extends(DetailsRow, _super);
    function DetailsRow(props) {
        _super.call(this, props);
        this.state = {
            selectionState: this._getSelectionState(props),
            columnMeasureInfo: null,
            isDropping: false,
            groupNestingDepth: props.groupNestingDepth
        };
        this._hasSetFocus = false;
        this._events = new EventGroup_1.EventGroup(this);
        this._droppingClassNames = '';
        this._updateDroppingState = this._updateDroppingState.bind(this);
    }
    DetailsRow.prototype.componentDidMount = function () {
        var dragDropHelper = this.props.dragDropHelper;
        if (dragDropHelper) {
            dragDropHelper.subscribe(this.refs.root, this._events, this._getRowDragDropOptions());
        }
        this._events.on(this.props.selection, interfaces_1.SELECTION_CHANGE, this._onSelectionChanged);
        if (this.props.onDidMount && this.props.item) {
            // If the item appears later, we should wait for it before calling this method.
            this._hasMounted = true;
            this.props.onDidMount(this);
        }
    };
    DetailsRow.prototype.componentDidUpdate = function () {
        var state = this.state;
        var _a = this.props, item = _a.item, onDidMount = _a.onDidMount;
        var columnMeasureInfo = state.columnMeasureInfo;
        if (columnMeasureInfo && columnMeasureInfo.index >= 0) {
            var newWidth = this.refs.cellMeasurer.getBoundingClientRect().width;
            columnMeasureInfo.onMeasureDone(newWidth);
            this.setState({
                columnMeasureInfo: null
            });
        }
        if (item && onDidMount && !this._hasMounted) {
            this._hasMounted = true;
            onDidMount(this);
        }
    };
    DetailsRow.prototype.componentWillUnmount = function () {
        var _a = this.props, item = _a.item, onWillUnmount = _a.onWillUnmount, dragDropHelper = _a.dragDropHelper;
        this._events.dispose();
        // Only call the onWillUnmount callback if we have an item.
        if (onWillUnmount && item) {
            onWillUnmount(this);
        }
        if (dragDropHelper) {
            dragDropHelper.unsubscribe(this.refs.root, this._dragDropKey);
        }
    };
    DetailsRow.prototype.componentWillReceiveProps = function (newProps) {
        this.setState({
            selectionState: this._getSelectionState(newProps),
            groupNestingDepth: newProps.groupNestingDepth
        });
    };
    DetailsRow.prototype.render = function () {
        var _a = this.props, columns = _a.columns, dragDropEvents = _a.dragDropEvents, item = _a.item, itemIndex = _a.itemIndex, _b = _a.onRenderCheck, onRenderCheck = _b === void 0 ? this._onRenderCheck : _b, onRenderItemColumn = _a.onRenderItemColumn, selectionMode = _a.selectionMode, viewport = _a.viewport, checkboxVisibility = _a.checkboxVisibility, getRowAriaLabel = _a.getRowAriaLabel, checkButtonAriaLabel = _a.checkButtonAriaLabel, selection = _a.selection;
        var _c = this.state, _d = _c.selectionState, isSelected = _d.isSelected, anySelected = _d.anySelected, columnMeasureInfo = _c.columnMeasureInfo, isDropping = _c.isDropping, groupNestingDepth = _c.groupNestingDepth;
        var isDraggable = Boolean(dragDropEvents && dragDropEvents.canDrag && dragDropEvents.canDrag(item));
        var droppingClassName = isDropping ? (this._droppingClassNames ? this._droppingClassNames : DEFAULT_DROPPING_CSS_CLASS) : '';
        var ariaLabel = getRowAriaLabel ? getRowAriaLabel(item) : null;
        var canSelect = selection.canSelectItem(item);
        return (React.createElement("div", {ref: 'root', role: 'row', "aria-label": ariaLabel, className: css_1.css('ms-DetailsRow ms-u-fadeIn400', droppingClassName, {
            'is-selected': isSelected,
            'is-check-visible': checkboxVisibility === DetailsList_Props_1.CheckboxVisibility.always
        }), "data-is-focusable": true, "data-selection-index": itemIndex, "data-item-index": itemIndex, "data-is-draggable": isDraggable, "data-automationid": 'DetailsRow', style: { minWidth: viewport ? viewport.width : 0 }, "aria-selected": isSelected}, 
            React.createElement(FocusZone_1.FocusZone, {direction: FocusZone_1.FocusZoneDirection.horizontal}, 
                (selectionMode !== interfaces_1.SelectionMode.none && checkboxVisibility !== DetailsList_Props_1.CheckboxVisibility.hidden) && (React.createElement("span", {role: 'gridcell'}, onRenderCheck({
                    isSelected: isSelected,
                    anySelected: anySelected,
                    ariaLabel: checkButtonAriaLabel,
                    canSelect: canSelect
                }))), 
                GroupSpacer_1.GroupSpacer({ count: groupNestingDepth }), 
                item && (React.createElement(DetailsRowFields_1.DetailsRowFields, {columns: columns, item: item, itemIndex: itemIndex, onRenderItemColumn: onRenderItemColumn})), 
                columnMeasureInfo && (React.createElement("span", {className: 'ms-DetailsRow-cellMeasurer ms-DetailsRow-cell', ref: 'cellMeasurer'}, 
                    React.createElement(DetailsRowFields_1.DetailsRowFields, {columns: [columnMeasureInfo.column], item: item, itemIndex: itemIndex, onRenderItemColumn: onRenderItemColumn})
                )))
        ));
    };
    /**
     * measure cell at index. and call the call back with the measured cell width when finish measure
     *
     * @param {number} index (the cell index)
     * @param {(width: number) => void} onMeasureDone (the call back function when finish measure)
     */
    DetailsRow.prototype.measureCell = function (index, onMeasureDone) {
        var column = object_1.assign({}, this.props.columns[index]);
        column.minWidth = 0;
        column.maxWidth = 999999;
        delete column.calculatedWidth;
        this.setState({
            columnMeasureInfo: {
                index: index,
                column: column,
                onMeasureDone: onMeasureDone
            }
        });
    };
    DetailsRow.prototype.focus = function () {
        if (this.refs && this.refs.root) {
            this.refs.root.tabIndex = 0;
            this.refs.root.focus();
        }
    };
    DetailsRow.prototype._onRenderCheck = function (props) {
        return React.createElement(DetailsRowCheck_1.DetailsRowCheck, __assign({}, props));
    };
    DetailsRow.prototype._getSelectionState = function (props) {
        var itemIndex = props.itemIndex, selection = props.selection;
        return {
            isSelected: selection.isIndexSelected(itemIndex),
            anySelected: selection.getSelectedCount() > 0
        };
    };
    DetailsRow.prototype._onSelectionChanged = function () {
        var selectionState = this._getSelectionState(this.props);
        if (!object_1.shallowCompare(selectionState, this.state.selectionState)) {
            this.setState({
                selectionState: selectionState
            });
        }
    };
    DetailsRow.prototype._getRowDragDropOptions = function () {
        var _a = this.props, item = _a.item, itemIndex = _a.itemIndex, dragDropEvents = _a.dragDropEvents, eventsToRegister = _a.eventsToRegister;
        this._dragDropKey = 'row-' + itemIndex;
        var options = {
            key: this._dragDropKey,
            eventMap: eventsToRegister,
            selectionIndex: itemIndex,
            context: { data: item, index: itemIndex },
            canDrag: dragDropEvents.canDrag,
            canDrop: dragDropEvents.canDrop,
            onDragStart: dragDropEvents.onDragStart,
            updateDropState: this._updateDroppingState
        };
        return options;
    };
    /**
     * update isDropping state based on the input value, which is used to change style during drag and drop
     *
     * when change to true, that means drag enter. we will add default dropping class name
     * or the custom dropping class name (return result from onDragEnter) to the root elemet.
     *
     * when change to false, that means drag leave. we will remove the dropping class name from root element.
     *
     * @private
     * @param {boolean} newValue (new isDropping state value)
     * @param {DragEvent} event (the event trigger dropping state change which can be dragenter, dragleave etc)
     */
    DetailsRow.prototype._updateDroppingState = function (newValue, event) {
        var _a = this.state, selectionState = _a.selectionState, isDropping = _a.isDropping;
        var _b = this.props, dragDropEvents = _b.dragDropEvents, item = _b.item;
        if (!newValue) {
            if (dragDropEvents.onDragLeave) {
                dragDropEvents.onDragLeave(item, event);
            }
        }
        else {
            if (dragDropEvents.onDragEnter) {
                this._droppingClassNames = dragDropEvents.onDragEnter(item, event);
            }
        }
        if (isDropping !== newValue) {
            this.setState({ selectionState: selectionState, isDropping: newValue });
        }
    };
    return DetailsRow;
}(React.Component));
exports.DetailsRow = DetailsRow;

//# sourceMappingURL=DetailsRow.js.map
