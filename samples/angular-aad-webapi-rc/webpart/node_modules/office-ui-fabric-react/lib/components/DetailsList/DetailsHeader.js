"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var BaseComponent_1 = require('../../common/BaseComponent');
var DetailsList_Props_1 = require('./DetailsList.Props');
var FocusZone_1 = require('../../FocusZone');
var Check_1 = require('../Check/Check');
var GroupSpacer_1 = require('../GroupedList/GroupSpacer');
var css_1 = require('../../utilities/css');
var interfaces_1 = require('../../utilities/selection/interfaces');
var rtl_1 = require('../../utilities/rtl');
require('./DetailsHeader.scss');
var MOUSEDOWN_PRIMARY_BUTTON = 0; // for mouse down event we are using ev.button property, 0 means left button
var MOUSEMOVE_PRIMARY_BUTTON = 1; // for mouse move event we are using ev.buttons property, 1 means left button
var INNER_PADDING = 16;
(function (SelectAllVisibility) {
    SelectAllVisibility[SelectAllVisibility["none"] = 0] = "none";
    SelectAllVisibility[SelectAllVisibility["hidden"] = 1] = "hidden";
    SelectAllVisibility[SelectAllVisibility["visible"] = 2] = "visible";
})(exports.SelectAllVisibility || (exports.SelectAllVisibility = {}));
var SelectAllVisibility = exports.SelectAllVisibility;
var DetailsHeader = (function (_super) {
    __extends(DetailsHeader, _super);
    function DetailsHeader(props) {
        _super.call(this, props);
        this.state = {
            columnResizeDetails: null,
            groupNestingDepth: this.props.groupNestingDepth,
            isAllCollapsed: this.props.isAllCollapsed
        };
        this._onToggleCollapseAll = this._onToggleCollapseAll.bind(this);
        this._onSelectAllClicked = this._onSelectAllClicked.bind(this);
    }
    DetailsHeader.prototype.componentDidMount = function () {
        var selection = this.props.selection;
        this._events.on(selection, interfaces_1.SELECTION_CHANGE, this._onSelectionChanged);
        this._events.on(this.refs.root, 'mousedown', this._onSizerDown);
    };
    DetailsHeader.prototype.componentWillReceiveProps = function (newProps) {
        var groupNestingDepth = this.state.groupNestingDepth;
        if (newProps.groupNestingDepth !== groupNestingDepth) {
            this.setState({ groupNestingDepth: newProps.groupNestingDepth });
        }
    };
    DetailsHeader.prototype.render = function () {
        var _this = this;
        var _a = this.props, columns = _a.columns, ariaLabel = _a.ariaLabel, ariaLabelForSelectAllCheckbox = _a.ariaLabelForSelectAllCheckbox, selectAllVisibility = _a.selectAllVisibility;
        var _b = this.state, isAllSelected = _b.isAllSelected, columnResizeDetails = _b.columnResizeDetails, isSizing = _b.isSizing, groupNestingDepth = _b.groupNestingDepth, isAllCollapsed = _b.isAllCollapsed;
        return (React.createElement("div", {role: 'row', "aria-label": ariaLabel, className: css_1.css('ms-DetailsHeader', {
            'is-allSelected': isAllSelected,
            'is-selectAllHidden': selectAllVisibility === SelectAllVisibility.hidden,
            'is-resizingColumn': !!columnResizeDetails && isSizing
        }), onMouseMove: this._onMove.bind(this), onMouseUp: this._onUp.bind(this), ref: 'root', "data-automationid": 'DetailsHeader'}, 
            React.createElement(FocusZone_1.FocusZone, {ref: 'focusZone', direction: FocusZone_1.FocusZoneDirection.horizontal}, 
                React.createElement("div", {className: 'ms-DetailsHeader-cellWrapper', role: 'columnheader'}, (selectAllVisibility === SelectAllVisibility.visible) ? (React.createElement("button", {className: 'ms-DetailsHeader-cell is-check', onClick: this._onSelectAllClicked, "aria-label": ariaLabelForSelectAllCheckbox, "aria-pressed": isAllSelected}, 
                    React.createElement(Check_1.Check, {checked: isAllSelected})
                )) : null), 
                groupNestingDepth > 0 ? (React.createElement("button", {className: 'ms-DetailsHeader-cell', onClick: this._onToggleCollapseAll}, 
                    React.createElement("i", {className: css_1.css('ms-DetailsHeader-collapseButton ms-Icon ms-Icon--ChevronDown', {
                        'is-collapsed': isAllCollapsed
                    })})
                )) : (null), 
                GroupSpacer_1.GroupSpacer({ count: groupNestingDepth - 1 }), 
                columns.map(function (column, columnIndex) { return (React.createElement("div", {key: column.key, className: 'ms-DetailsHeader-cellSizeWrapper'}, 
                    React.createElement("div", {className: 'ms-DetailsHeader-cellWrapper', role: 'columnheader'}, 
                        React.createElement("button", {key: column.fieldName, disabled: column.columnActionsMode === DetailsList_Props_1.ColumnActionsMode.disabled, className: css_1.css('ms-DetailsHeader-cell', column.headerClassName, {
                            'is-actionable': column.columnActionsMode !== DetailsList_Props_1.ColumnActionsMode.disabled,
                            'is-empty': !column.name,
                            'is-icon-visible': column.isSorted || column.isGrouped || column.isFiltered
                        }), style: { width: column.calculatedWidth + INNER_PADDING }, onClick: _this._onColumnClick.bind(_this, column), onContextMenu: _this._onColumnContextMenu.bind(_this, column), "aria-haspopup": column.columnActionsMode === DetailsList_Props_1.ColumnActionsMode.hasDropdown, "aria-label": column.ariaLabel || column.name, "aria-sort": column.isSorted ? (column.isSortedDescending ? 'descending' : 'ascending') : 'none', "data-automationid": 'ColumnsHeaderColumn', "data-item-key": column.key}, 
                            column.isFiltered && (React.createElement("i", {className: 'ms-Icon ms-Icon--filter'})), 
                            column.isSorted && (React.createElement("i", {className: css_1.css('ms-Icon', {
                                'ms-Icon--SortUp': !column.isSortedDescending,
                                'ms-Icon--SortDown': column.isSortedDescending
                            })})), 
                            column.isGrouped && (React.createElement("i", {className: 'ms-Icon ms-Icon--GroupedDescending'})), 
                            column.iconClassName && (React.createElement("i", {className: 'ms-Icon ' + column.iconClassName})), 
                            column.name, 
                            column.columnActionsMode === DetailsList_Props_1.ColumnActionsMode.hasDropdown && (React.createElement("i", {className: 'ms-DetailsHeader-filterChevron ms-Icon ms-Icon--ChevronDown'})))
                    ), 
                    (column.isResizable) ? (React.createElement("div", {"data-sizer-index": columnIndex, className: css_1.css('ms-DetailsHeader-cell is-sizer', {
                        'is-resizing': columnResizeDetails && columnResizeDetails.columnIndex === columnIndex && isSizing
                    }), onDoubleClick: _this._onSizerDoubleClick.bind(_this, columnIndex)})) : (null))); }))
        ));
    };
    /** Set focus to the active thing in the focus area. */
    DetailsHeader.prototype.focus = function () {
        return this.refs.focusZone.focus();
    };
    /**
     * double click on the column sizer will auto ajust column width
     * to fit the longest content among current rendered rows.
     *
     * @private
     * @param {number} columnIndex (index of the column user double clicked)
     * @param {React.MouseEvent} ev (mouse double click event)
     */
    DetailsHeader.prototype._onSizerDoubleClick = function (columnIndex, ev) {
        var _a = this.props, onColumnAutoResized = _a.onColumnAutoResized, columns = _a.columns;
        if (onColumnAutoResized) {
            onColumnAutoResized(columns[columnIndex], columnIndex);
        }
    };
    /**
     * Called when the select all toggle is clicked.
     */
    DetailsHeader.prototype._onSelectAllClicked = function () {
        var selection = this.props.selection;
        selection.toggleAllSelected();
    };
    /**
     * mouse move event handler in the header
     * it will set isSizing state to true when user clicked on the sizer and move the mouse.
     *
     * @private
     * @param {React.MouseEvent} ev (mouse move event)
     */
    DetailsHeader.prototype._onMove = function (ev) {
        var _a = ev.buttons, buttons = _a === void 0 ? MOUSEMOVE_PRIMARY_BUTTON : _a;
        var _b = this.props, onColumnIsSizingChanged = _b.onColumnIsSizingChanged, columns = _b.columns;
        var _c = this.state, columnResizeDetails = _c.columnResizeDetails, isSizing = _c.isSizing;
        if (columnResizeDetails) {
            if (buttons !== MOUSEMOVE_PRIMARY_BUTTON) {
                // cancel mouse down event and return early when the primary button is not pressed
                this._onUp(ev);
                return;
            }
            if (!isSizing && ev.clientX !== columnResizeDetails.originX) {
                isSizing = true;
                this._events.on(window, 'mousemove', this._onSizerMove, true);
                this._events.on(window, 'mouseup', this._onSizerUp, true);
                this.setState({ isSizing: isSizing });
                if (onColumnIsSizingChanged) {
                    onColumnIsSizingChanged(columns[columnResizeDetails.columnIndex], true);
                }
            }
        }
    };
    /**
     * mouse up event handler in the header
     * clear the resize related state.
     * This is to ensure we can catch double click event
     *
     * @private
     * @param {React.MouseEvent} ev (mouse up event)
     */
    DetailsHeader.prototype._onUp = function (ev) {
        this.setState({
            columnResizeDetails: null,
            isSizing: false
        });
    };
    DetailsHeader.prototype._onSizerDown = function (ev) {
        var columnIndexAttr = ev.target.getAttribute('data-sizer-index');
        var columnIndex = Number(columnIndexAttr);
        var columns = this.props.columns;
        if (columnIndexAttr === null || ev.button !== MOUSEDOWN_PRIMARY_BUTTON) {
            // Ignore anything except the primary button.
            return;
        }
        this.setState({
            columnResizeDetails: {
                columnIndex: columnIndex,
                columnMinWidth: columns[columnIndex].calculatedWidth,
                originX: ev.clientX
            }
        });
        ev.preventDefault();
        ev.stopPropagation();
    };
    DetailsHeader.prototype._onSelectionChanged = function () {
        var isAllSelected = this.props.selection.isAllSelected();
        if (this.state.isAllSelected !== isAllSelected) {
            this.setState({
                isAllSelected: isAllSelected
            });
        }
    };
    DetailsHeader.prototype._onSizerMove = function (ev) {
        var _a = ev.buttons, buttons = _a === void 0 ? MOUSEMOVE_PRIMARY_BUTTON : _a;
        var columnResizeDetails = this.state.columnResizeDetails;
        if (columnResizeDetails) {
            if (buttons !== MOUSEMOVE_PRIMARY_BUTTON) {
                // cancel mouse down event and return early when the primary button is not pressed
                this._onSizerUp();
                return;
            }
            var _b = this.props, onColumnResized = _b.onColumnResized, columns = _b.columns;
            if (onColumnResized) {
                var movement = ev.clientX - columnResizeDetails.originX;
                if (rtl_1.getRTL()) {
                    movement = -movement;
                }
                onColumnResized(columns[columnResizeDetails.columnIndex], columnResizeDetails.columnMinWidth + movement);
            }
        }
    };
    DetailsHeader.prototype._onSizerUp = function () {
        var _a = this.props, columns = _a.columns, onColumnIsSizingChanged = _a.onColumnIsSizingChanged;
        var columnResizeDetails = this.state.columnResizeDetails;
        this._events.off(window);
        this.setState({
            columnResizeDetails: null,
            isSizing: false
        });
        if (onColumnIsSizingChanged) {
            onColumnIsSizingChanged(columns[columnResizeDetails.columnIndex], false);
        }
    };
    DetailsHeader.prototype._onColumnClick = function (column, ev) {
        var onColumnClick = this.props.onColumnClick;
        if (column.onColumnClick) {
            column.onColumnClick(ev, column);
        }
        if (onColumnClick) {
            onColumnClick(ev, column);
        }
    };
    DetailsHeader.prototype._onColumnContextMenu = function (column, ev) {
        var onColumnContextMenu = this.props.onColumnContextMenu;
        if (column.onContextMenu) {
            column.onColumnContextMenu(column, ev);
        }
        if (onColumnContextMenu) {
            onColumnContextMenu(column, ev);
        }
    };
    DetailsHeader.prototype._onToggleCollapseAll = function () {
        var onToggleCollapseAll = this.props.onToggleCollapseAll;
        var newCollapsed = !this.state.isAllCollapsed;
        this.setState({
            isAllCollapsed: newCollapsed
        });
        if (onToggleCollapseAll) {
            onToggleCollapseAll(newCollapsed);
        }
    };
    DetailsHeader.defaultProps = {
        isSelectAllVisible: SelectAllVisibility.visible
    };
    return DetailsHeader;
}(BaseComponent_1.BaseComponent));
exports.DetailsHeader = DetailsHeader;

//# sourceMappingURL=DetailsHeader.js.map
