"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var React = require('react');
var GroupedListSection_1 = require('./GroupedListSection');
var css_1 = require('../../utilities/css');
var List_1 = require('../../List');
var index_1 = require('../../utilities/selection/index');
var Utilities_1 = require('../../Utilities');
require('./GroupedList.scss');
var GroupedList = (function (_super) {
    __extends(GroupedList, _super);
    function GroupedList(props) {
        _super.call(this, props);
        this._isSomeGroupExpanded = this._computeIsSomeGroupExpanded(props.groups);
        this.state = {
            lastWidth: 0,
            groups: props.groups
        };
    }
    GroupedList.prototype.componentWillReceiveProps = function (newProps) {
        var _a = this.props, groups = _a.groups, selectionMode = _a.selectionMode;
        var shouldForceUpdates = false;
        if (newProps.groups !== groups) {
            this.setState({ groups: newProps.groups });
            shouldForceUpdates = true;
        }
        if (newProps.selectionMode !== selectionMode) {
            shouldForceUpdates = true;
        }
        if (shouldForceUpdates) {
            this._forceListUpdates();
        }
    };
    GroupedList.prototype.render = function () {
        var className = this.props.className;
        var groups = this.state.groups;
        return (React.createElement("div", {ref: 'root', className: css_1.css('ms-GroupedList', className), "data-automationid": 'GroupedList', "data-is-scrollable": 'false', role: 'grid'}, !groups ?
            this._renderGroup(null, 0) : (React.createElement(List_1.List, {ref: 'list', items: groups, onRenderCell: this._renderGroup, getItemCountForPage: function () { return 1; }}))));
    };
    GroupedList.prototype.forceUpdate = function () {
        _super.prototype.forceUpdate.call(this);
        this._forceListUpdates();
    };
    GroupedList.prototype.toggleCollapseAll = function (allCollapsed) {
        var groups = this.state.groups;
        var groupProps = this.props.groupProps;
        var onToggleCollapseAll = groupProps && groupProps.onToggleCollapseAll;
        if (groups) {
            if (onToggleCollapseAll) {
                onToggleCollapseAll(allCollapsed);
            }
            for (var groupIndex = 0; groupIndex < groups.length; groupIndex++) {
                groups[groupIndex].isCollapsed = allCollapsed;
            }
            this._updateIsSomeGroupExpanded();
            this.forceUpdate();
        }
    };
    GroupedList.prototype._renderGroup = function (group, groupIndex) {
        var _a = this.props, dragDropEvents = _a.dragDropEvents, dragDropHelper = _a.dragDropHelper, eventsToRegister = _a.eventsToRegister, groupProps = _a.groupProps, items = _a.items, listProps = _a.listProps, onRenderCell = _a.onRenderCell, selectionMode = _a.selectionMode, selection = _a.selection, viewport = _a.viewport;
        // override group header/footer props as needed
        var dividerProps = {
            onToggleSelectGroup: this._onToggleSelectGroup,
            onToggleCollapse: this._onToggleCollapse,
            onToggleSummarize: this._onToggleSummarize
        };
        var headerProps = Utilities_1.assign({}, groupProps.headerProps, dividerProps);
        var footerProps = Utilities_1.assign({}, groupProps.footerProps, dividerProps);
        var groupNestingDepth = this._getGroupNestingDepth();
        return (!group || group.count > 0) ? (React.createElement(GroupedListSection_1.GroupedListSection, {ref: 'group_' + groupIndex, key: this._getGroupKey(group), dragDropEvents: dragDropEvents, dragDropHelper: dragDropHelper, eventsToRegister: eventsToRegister, footerProps: footerProps, getGroupItemLimit: groupProps && groupProps.getGroupItemLimit, group: group, groupIndex: groupIndex, groupNestingDepth: groupNestingDepth, headerProps: headerProps, listProps: listProps, items: items, onRenderCell: onRenderCell, onRenderGroupHeader: groupProps.onRenderHeader, onRenderGroupFooter: groupProps.onRenderFooter, selectionMode: selectionMode, selection: selection, viewport: viewport})) : null;
    };
    GroupedList.prototype._getGroupKey = function (group) {
        return 'group-' + (group ?
            group.key + '-' + group.count :
            '');
    };
    GroupedList.prototype._getGroupNestingDepth = function () {
        var groups = this.state.groups;
        var level = 0;
        var groupsInLevel = groups;
        while (groupsInLevel && groupsInLevel.length > 0) {
            level++;
            groupsInLevel = groupsInLevel[0].children;
        }
        return level;
    };
    GroupedList.prototype._onToggleCollapse = function (group) {
        var groupProps = this.props.groupProps;
        var onToggleCollapse = groupProps && groupProps.headerProps && groupProps.headerProps.onToggleCollapse;
        if (group) {
            if (onToggleCollapse) {
                onToggleCollapse(group);
            }
            group.isCollapsed = !group.isCollapsed;
            this._updateIsSomeGroupExpanded();
            this.setState({}, this.forceUpdate);
        }
    };
    GroupedList.prototype._onToggleSelectGroup = function (group) {
        if (group) {
            this.props.selection.toggleRangeSelected(group.startIndex, group.count);
        }
    };
    GroupedList.prototype._forceListUpdates = function (groups) {
        groups = groups || this.state.groups;
        var groupCount = groups ? groups.length : 1;
        if (this.refs.list) {
            this.refs.list.forceUpdate();
            for (var i = 0; i < groupCount; i++) {
                var group = this.refs.list.refs['group_' + String(i)];
                if (group) {
                    group.forceListUpdate();
                }
            }
        }
        else {
            var group = this.refs['group_' + String(0)];
            if (group) {
                group.forceListUpdate();
            }
        }
    };
    GroupedList.prototype._onToggleSummarize = function (group) {
        var groupProps = this.props.groupProps;
        var onToggleSummarize = groupProps && groupProps.footerProps && groupProps.footerProps.onToggleSummarize;
        if (onToggleSummarize) {
            onToggleSummarize(group);
        }
        else {
            if (group) {
                group.isShowingAll = !group.isShowingAll;
            }
            this.forceUpdate();
        }
    };
    GroupedList.prototype._computeIsSomeGroupExpanded = function (groups) {
        var _this = this;
        return groups && groups.some(function (group) { return group.children ? _this._computeIsSomeGroupExpanded(group.children) : !group.isCollapsed; });
    };
    GroupedList.prototype._updateIsSomeGroupExpanded = function () {
        var groups = this.state.groups;
        var onGroupExpandStateChanged = this.props.onGroupExpandStateChanged;
        var newIsSomeGroupExpanded = this._computeIsSomeGroupExpanded(groups);
        if (this._isSomeGroupExpanded !== newIsSomeGroupExpanded) {
            if (onGroupExpandStateChanged) {
                onGroupExpandStateChanged(newIsSomeGroupExpanded);
            }
            this._isSomeGroupExpanded = newIsSomeGroupExpanded;
        }
    };
    GroupedList.defaultProps = {
        selectionMode: index_1.SelectionMode.multiple,
        isHeaderVisible: true,
        groupProps: {}
    };
    __decorate([
        Utilities_1.autobind
    ], GroupedList.prototype, "_renderGroup", null);
    __decorate([
        Utilities_1.autobind
    ], GroupedList.prototype, "_getGroupKey", null);
    __decorate([
        Utilities_1.autobind
    ], GroupedList.prototype, "_onToggleCollapse", null);
    __decorate([
        Utilities_1.autobind
    ], GroupedList.prototype, "_onToggleSelectGroup", null);
    __decorate([
        Utilities_1.autobind
    ], GroupedList.prototype, "_onToggleSummarize", null);
    return GroupedList;
}(Utilities_1.BaseComponent));
exports.GroupedList = GroupedList;

//# sourceMappingURL=GroupedList.js.map
