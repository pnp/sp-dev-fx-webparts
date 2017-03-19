"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/* tslint:disable:no-unused-variable */
var React = require('react');
/* tslint:enable:no-unused-variable */
var index_1 = require('../../../../index');
var data_1 = require('../../../utilities/data');
require('./DetailsListExample.scss');
var ITEMS_PER_GROUP = 20;
var GROUP_COUNT = 20;
var _items;
var _groups;
var DetailsListCustomGroupHeadersExample = (function (_super) {
    __extends(DetailsListCustomGroupHeadersExample, _super);
    function DetailsListCustomGroupHeadersExample() {
        _super.call(this);
        _items = _items || data_1.createListItems(500);
        _groups = _groups || data_1.createGroups(GROUP_COUNT, 1, 0, ITEMS_PER_GROUP);
    }
    DetailsListCustomGroupHeadersExample.prototype.render = function () {
        return (React.createElement("div", null, 
            React.createElement(index_1.DetailsList, {items: _items, groups: _groups, groupProps: {
                onRenderHeader: function (props) { return (React.createElement("div", {className: 'DetailsListExample-customHeader'}, 
                    React.createElement("div", {className: 'DetailsListExample-customHeaderTitle'}, "I am a custom header for: " + props.group.name), 
                    React.createElement("div", {className: 'DetailsListExample-customHeaderLinkSet'}, 
                        React.createElement(index_1.Link, {className: 'DetailsListExample-customHeaderLink', onClick: function () { return props.onToggleSelectGroup(props.group); }}, props.isSelected ? 'Remove selection' : 'Select group'), 
                        React.createElement(index_1.Link, {className: 'DetailsListExample-customHeaderLink', onClick: function () { return props.onToggleCollapse(props.group); }}, props.group.isCollapsed ? 'Expand group' : 'Collapse group')))); },
                onRenderFooter: function (props) { return (React.createElement("div", {className: 'DetailsListExample-customHeader'}, 
                    React.createElement("div", {className: 'DetailsListExample-customHeaderTitle'}, "I'm a custom footer for: " + props.group.name)
                )); }
            }})
        ));
    };
    return DetailsListCustomGroupHeadersExample;
}(React.Component));
exports.DetailsListCustomGroupHeadersExample = DetailsListCustomGroupHeadersExample;

//# sourceMappingURL=DetailsList.CustomGroupHeaders.Example.js.map
