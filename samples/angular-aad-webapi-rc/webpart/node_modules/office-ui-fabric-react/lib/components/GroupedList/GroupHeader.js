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
var index_1 = require('../../utilities/selection/index');
var Check_1 = require('../Check/Check');
var GroupSpacer_1 = require('./GroupSpacer');
var Spinner_1 = require('../../Spinner');
var FocusZone_1 = require('../../FocusZone');
var css_1 = require('../../utilities/css');
var autobind_1 = require('../../utilities/autobind');
require('./GroupHeader.scss');
var GroupHeader = (function (_super) {
    __extends(GroupHeader, _super);
    function GroupHeader(props) {
        _super.call(this, props);
        this.state = {
            isCollapsed: this.props.group && this.props.group.isCollapsed,
            isLoadingVisible: false
        };
    }
    GroupHeader.prototype.componentWillReceiveProps = function (newProps) {
        if (newProps.group) {
            var newCollapsed = newProps.group.isCollapsed;
            var isGroupLoading = newProps.headerProps && newProps.headerProps.isGroupLoading;
            var newLoadingVisible = !newCollapsed && isGroupLoading && isGroupLoading(newProps.group);
            this.setState({
                isCollapsed: newCollapsed,
                isLoadingVisible: newLoadingVisible
            });
        }
    };
    GroupHeader.prototype.render = function () {
        var _a = this.props, group = _a.group, groupLevel = _a.groupLevel, viewport = _a.viewport, selectionMode = _a.selectionMode, loadingText = _a.loadingText, isSelected = _a.isSelected, selected = _a.selected, isCollapsedGroupSelectVisible = _a.isCollapsedGroupSelectVisible;
        var _b = this.state, isCollapsed = _b.isCollapsed, isLoadingVisible = _b.isLoadingVisible;
        if (isCollapsedGroupSelectVisible === undefined) {
            isCollapsedGroupSelectVisible = true;
        }
        var canSelectGroup = selectionMode === index_1.SelectionMode.multiple;
        var isSelectionCheckVisible = canSelectGroup && (isCollapsedGroupSelectVisible || !(group && group.isCollapsed));
        var currentlySelected = isSelected || selected;
        return group && (React.createElement("div", {className: css_1.css('ms-GroupHeader', {
            'is-selected': currentlySelected
        }), style: viewport ? { minWidth: viewport.width } : {}, onClick: this._onHeaderClick, "aria-label": group.ariaLabel || group.name, "data-is-focusable": true}, 
            React.createElement(FocusZone_1.FocusZone, {direction: FocusZone_1.FocusZoneDirection.horizontal}, 
                isSelectionCheckVisible ? (React.createElement("button", {className: 'ms-GroupHeader-check', "data-selection-toggle": true, onClick: this._onToggleSelectGroupClick}, 
                    React.createElement(Check_1.Check, {checked: currentlySelected})
                )) : (selectionMode !== index_1.SelectionMode.none ? GroupSpacer_1.GroupSpacer({ count: 1 }) : null), 
                GroupSpacer_1.GroupSpacer({ count: groupLevel }), 
                React.createElement("div", {className: 'ms-GroupHeader-dropIcon'}, 
                    React.createElement("i", {className: 'ms-Icon ms-Icon--Tag'})
                ), 
                React.createElement("button", {className: 'ms-GroupHeader-expand', onClick: this._onToggleCollapse}, 
                    React.createElement("i", {className: css_1.css('ms-Icon ms-Icon--ChevronDown', {
                        'is-collapsed': isCollapsed
                    })})
                ), 
                React.createElement("div", {className: 'ms-GroupHeader-title ms-font-xl'}, 
                    React.createElement("span", null, 
                        group.name, 
                        " "), 
                    React.createElement("span", null, 
                        "(", 
                        group.count, 
                        ") ")), 
                React.createElement("div", {className: css_1.css('ms-GroupHeader-loading', { 'is-loading': isLoadingVisible })}, 
                    React.createElement(Spinner_1.Spinner, {label: loadingText})
                ))
        ));
    };
    GroupHeader.prototype._onToggleCollapse = function (ev) {
        var _a = this.props, group = _a.group, onToggleCollapse = _a.onToggleCollapse, isGroupLoading = _a.isGroupLoading;
        var isCollapsed = this.state.isCollapsed;
        var newCollapsed = !isCollapsed;
        var newLoadingVisible = !newCollapsed && isGroupLoading && isGroupLoading(group);
        this.setState({
            isCollapsed: newCollapsed,
            isLoadingVisible: newLoadingVisible
        });
        if (onToggleCollapse) {
            onToggleCollapse(group);
        }
        ev.stopPropagation();
        ev.preventDefault();
    };
    GroupHeader.prototype._onToggleSelectGroupClick = function (ev) {
        var _a = this.props, onToggleSelectGroup = _a.onToggleSelectGroup, group = _a.group;
        if (onToggleSelectGroup) {
            onToggleSelectGroup(group);
        }
        ev.preventDefault();
        ev.stopPropagation();
    };
    GroupHeader.prototype._onHeaderClick = function () {
        var _a = this.props, group = _a.group, onGroupHeaderClick = _a.onGroupHeaderClick, onToggleSelectGroup = _a.onToggleSelectGroup;
        if (onGroupHeaderClick) {
            onGroupHeaderClick(group);
        }
        else if (onToggleSelectGroup) {
            onToggleSelectGroup(group);
        }
    };
    __decorate([
        autobind_1.autobind
    ], GroupHeader.prototype, "_onToggleCollapse", null);
    __decorate([
        autobind_1.autobind
    ], GroupHeader.prototype, "_onToggleSelectGroupClick", null);
    __decorate([
        autobind_1.autobind
    ], GroupHeader.prototype, "_onHeaderClick", null);
    return GroupHeader;
}(React.Component));
exports.GroupHeader = GroupHeader;

//# sourceMappingURL=GroupHeader.js.map
