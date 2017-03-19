"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var index_1 = require('../../../../components/GroupedList/index');
var Link_1 = require('../../../../Link');
var data_1 = require('../../../utilities/data');
require('./GroupedList.Custom.Example.scss');
var GroupedListCustomExample = (function (_super) {
    __extends(GroupedListCustomExample, _super);
    function GroupedListCustomExample() {
        _super.call(this);
        this._items = data_1.createListItems(20);
        this._groups = data_1.createGroups(4, 0, 0, 5);
    }
    GroupedListCustomExample.prototype.render = function () {
        return (React.createElement(index_1.GroupedList, {ref: 'groupedList', items: this._items, onRenderCell: this._onRenderCell, groupProps: {
            onRenderHeader: this._onRenderHeader,
            onRenderFooter: this._onRenderFooter
        }, groups: this._groups}));
    };
    GroupedListCustomExample.prototype._onRenderCell = function (nestingDepth, item, itemIndex) {
        return (React.createElement("div", {"data-selection-index": itemIndex}, 
            React.createElement("span", {className: 'ms-GroupedListExample-name'}, item.name)
        ));
    };
    GroupedListCustomExample.prototype._onRenderHeader = function (props) {
        return (React.createElement("div", {className: 'ms-GroupedListExample-header ms-font-xl'}, 
            "This is a custom header for ", 
            props.group.name, 
            "(", 
            React.createElement(Link_1.Link, {onClick: function () { return props.onToggleCollapse(props.group); }}, props.group.isCollapsed ? 'Expand' : 'Collapse'), 
            ")"));
    };
    GroupedListCustomExample.prototype._onRenderFooter = function (props) {
        return (React.createElement("div", {className: 'ms-GroupedListExample-footer ms-font-xl'}, 
            "This is a custom footer for ", 
            props.group.name));
    };
    return GroupedListCustomExample;
}(React.Component));
exports.GroupedListCustomExample = GroupedListCustomExample;

//# sourceMappingURL=GroupedList.Custom.Example.js.map
