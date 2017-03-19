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
var Utilities_1 = require('../../Utilities');
var index_1 = require('../../utilities/selection/index');
var GroupFooter_1 = require('./GroupFooter');
var GroupHeader_1 = require('./GroupHeader');
var List_1 = require('../../List');
var Utilities_2 = require('../../Utilities');
var DEFAULT_DROPPING_CSS_CLASS = 'is-dropping';
var GroupedListSection = (function (_super) {
    __extends(GroupedListSection, _super);
    function GroupedListSection(props) {
        _super.call(this, props);
        var selection = props.selection, group = props.group;
        this._subGroups = {};
        this.state = {
            isDropping: false,
            isSelected: (selection && group) ? selection.isRangeSelected(group.startIndex, group.count) : false
        };
    }
    GroupedListSection.prototype.componentDidMount = function () {
        var _a = this.props, dragDropHelper = _a.dragDropHelper, selection = _a.selection;
        if (dragDropHelper) {
            dragDropHelper.subscribe(this.refs.root, this._events, this._getGroupDragDropOptions());
        }
        if (selection) {
            this._events.on(selection, index_1.SELECTION_CHANGE, this._onSelectionChange);
        }
    };
    GroupedListSection.prototype.componentWillUnmount = function () {
        var dragDropHelper = this.props.dragDropHelper;
        if (dragDropHelper) {
            dragDropHelper.unsubscribe(this.refs.root, this._dragDropKey);
        }
    };
    GroupedListSection.prototype.render = function () {
        var _a = this.props, getGroupItemLimit = _a.getGroupItemLimit, group = _a.group, groupIndex = _a.groupIndex, headerProps = _a.headerProps, footerProps = _a.footerProps, viewport = _a.viewport, selectionMode = _a.selectionMode, _b = _a.onRenderGroupHeader, onRenderGroupHeader = _b === void 0 ? this._onRenderGroupHeader : _b, _c = _a.onRenderGroupFooter, onRenderGroupFooter = _c === void 0 ? this._onRenderGroupFooter : _c;
        var isSelected = this.state.isSelected;
        var renderCount = group && getGroupItemLimit ? getGroupItemLimit(group) : Infinity;
        var isFooterVisible = group && !group.children && !group.isCollapsed && !group.isShowingAll && group.count > renderCount;
        var hasNestedGroups = group && group.children && group.children.length > 0;
        var dividerProps = {
            group: group,
            groupIndex: groupIndex,
            groupLevel: group ? group.level : 0,
            isSelected: isSelected,
            viewport: viewport,
            selectionMode: selectionMode
        };
        var groupHeaderProps = Utilities_2.assign({}, headerProps, dividerProps);
        var groupFooterProps = Utilities_2.assign({}, footerProps, dividerProps);
        return (React.createElement("div", {ref: 'root', className: Utilities_2.css('ms-GroupedList-group', this._getDroppingClassName())}, 
            onRenderGroupHeader(groupHeaderProps, this._onRenderGroupHeader), 
            group && group.isCollapsed ?
                null :
                (hasNestedGroups ?
                    (React.createElement(List_1.List, {ref: 'list', items: group.children, onRenderCell: this._renderSubGroup, getItemCountForPage: function () { return 1; }})) :
                    this._onRenderGroup(renderCount)), 
            isFooterVisible && onRenderGroupFooter(groupFooterProps, this._onRenderGroupFooter)));
    };
    GroupedListSection.prototype.forceUpdate = function () {
        _super.prototype.forceUpdate.call(this);
        this.forceListUpdate();
    };
    GroupedListSection.prototype.forceListUpdate = function () {
        var group = this.props.group;
        if (this.refs.list) {
            this.refs.list.forceUpdate();
            if (group && group.children && group.children.length > 0) {
                var subGroupCount = group.children.length;
                for (var i = 0; i < subGroupCount; i++) {
                    var subGroup = this.refs.list.refs['subGroup_' + String(i)];
                    if (subGroup) {
                        subGroup.forceListUpdate();
                    }
                }
            }
        }
        else {
            var subGroup = this.refs['subGroup_' + String(0)];
            if (subGroup) {
                subGroup.forceListUpdate();
            }
        }
    };
    GroupedListSection.prototype._onRenderGroupHeader = function (props) {
        return React.createElement(GroupHeader_1.GroupHeader, __assign({}, props));
    };
    GroupedListSection.prototype._onRenderGroupFooter = function (props) {
        return React.createElement(GroupFooter_1.GroupFooter, __assign({}, props));
    };
    GroupedListSection.prototype._onSelectionChange = function () {
        var _a = this.props, group = _a.group, selection = _a.selection;
        var isSelected = selection.isRangeSelected(group.startIndex, group.count);
        if (isSelected !== this.state.isSelected) {
            this.setState({ isSelected: isSelected });
        }
    };
    GroupedListSection.prototype._onRenderGroup = function (renderCount) {
        var _a = this.props, group = _a.group, items = _a.items, onRenderCell = _a.onRenderCell, listProps = _a.listProps, groupNestingDepth = _a.groupNestingDepth;
        var count = group ? group.count : items.length;
        var startIndex = group ? group.startIndex : 0;
        return (React.createElement(List_1.List, __assign({items: items, onRenderCell: function (item, itemIndex) { return onRenderCell(groupNestingDepth, item, itemIndex); }, ref: 'list', renderCount: Math.min(count, renderCount), startIndex: startIndex}, listProps)));
    };
    GroupedListSection.prototype._renderSubGroup = function (subGroup, subGroupIndex) {
        var _a = this.props, dragDropEvents = _a.dragDropEvents, dragDropHelper = _a.dragDropHelper, eventsToRegister = _a.eventsToRegister, getGroupItemLimit = _a.getGroupItemLimit, groupNestingDepth = _a.groupNestingDepth, items = _a.items, headerProps = _a.headerProps, footerProps = _a.footerProps, listProps = _a.listProps, onRenderCell = _a.onRenderCell, selection = _a.selection, selectionMode = _a.selectionMode, viewport = _a.viewport;
        return (!subGroup || subGroup.count > 0) ? (React.createElement(GroupedListSection, {ref: 'subGroup_' + subGroupIndex, key: this._getGroupKey(subGroup, subGroupIndex), dragDropEvents: dragDropEvents, dragDropHelper: dragDropHelper, eventsToRegister: eventsToRegister, footerProps: footerProps, getGroupItemLimit: getGroupItemLimit, group: subGroup, groupIndex: subGroupIndex, groupNestingDepth: groupNestingDepth, headerProps: headerProps, items: items, listProps: listProps, onRenderCell: onRenderCell, selection: selection, selectionMode: selectionMode, viewport: viewport})) : null;
    };
    GroupedListSection.prototype._getGroupKey = function (group, groupIndex) {
        return 'group-' + (group ?
            group.key + '-' + group.count :
            '');
    };
    /**
     * collect all the data we need to enable drag/drop for a group
     */
    GroupedListSection.prototype._getGroupDragDropOptions = function () {
        var _a = this.props, group = _a.group, groupIndex = _a.groupIndex, dragDropEvents = _a.dragDropEvents, eventsToRegister = _a.eventsToRegister;
        this._dragDropKey = 'group-' + (group ? group.key : String(groupIndex));
        var options = {
            key: this._dragDropKey,
            eventMap: eventsToRegister,
            selectionIndex: -1,
            context: { data: group, index: groupIndex, isGroup: true },
            canDrag: function () { return false; },
            canDrop: dragDropEvents.canDrop,
            onDragStart: null,
            updateDropState: this._updateDroppingState
        };
        return options;
    };
    /**
     * update groupIsDropping state based on the input value, which is used to change style during drag and drop
     *
     * @private
     * @param {boolean} newValue (new isDropping state value)
     * @param {DragEvent} event (the event trigger dropping state change which can be dragenter, dragleave etc)
     */
    GroupedListSection.prototype._updateDroppingState = function (newIsDropping, event) {
        var isDropping = this.state.isDropping;
        var dragDropEvents = this.props.dragDropEvents;
        if (!isDropping) {
            if (dragDropEvents.onDragLeave) {
                dragDropEvents.onDragLeave(event, null);
            }
        }
        else {
            if (dragDropEvents.onDragEnter) {
                dragDropEvents.onDragEnter(event, null);
            }
        }
        if (isDropping !== newIsDropping) {
            this.setState({ isDropping: newIsDropping });
        }
    };
    /**
     * get the correct css class to reflect the dropping state for a given group
     *
     * If the group is the current drop target, return the default dropping class name
     * Otherwise, return '';
     *
     */
    GroupedListSection.prototype._getDroppingClassName = function () {
        var isDropping = this.state.isDropping;
        var group = this.props.group;
        var droppingClass = group && isDropping ? DEFAULT_DROPPING_CSS_CLASS : '';
        return droppingClass;
    };
    __decorate([
        Utilities_1.autobind
    ], GroupedListSection.prototype, "_onRenderGroupHeader", null);
    __decorate([
        Utilities_1.autobind
    ], GroupedListSection.prototype, "_onRenderGroupFooter", null);
    __decorate([
        Utilities_1.autobind
    ], GroupedListSection.prototype, "_renderSubGroup", null);
    __decorate([
        Utilities_1.autobind
    ], GroupedListSection.prototype, "_getGroupDragDropOptions", null);
    __decorate([
        Utilities_1.autobind
    ], GroupedListSection.prototype, "_updateDroppingState", null);
    return GroupedListSection;
}(Utilities_1.BaseComponent));
exports.GroupedListSection = GroupedListSection;

//# sourceMappingURL=GroupedListSection.js.map
