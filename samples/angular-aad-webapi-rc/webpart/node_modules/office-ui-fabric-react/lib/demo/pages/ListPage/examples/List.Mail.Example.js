"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var index_1 = require('../../../../index');
require('./List.Mail.Example.scss');
var MailTile = (function (_super) {
    __extends(MailTile, _super);
    function MailTile() {
        _super.apply(this, arguments);
    }
    MailTile.prototype.render = function () {
        var item = this.props.item;
        return (React.createElement("div", {className: 'ms-ListItem is-unread is-selectable'}, 
            React.createElement("span", {className: 'ms-ListItem-primaryText'}, item.name), 
            React.createElement("span", {className: 'ms-ListItem-secondaryText'}, item.title), 
            React.createElement("span", {className: 'ms-ListItem-tertiaryText'}, item.description), 
            React.createElement("span", {className: 'ms-ListItem-metaText'}, "2:42p"), 
            React.createElement("div", {className: 'ms-ListItem-selectionTarget js-toggleSelection'}), 
            React.createElement("div", {className: 'ms-ListItem-actions'}, 
                React.createElement("div", {className: 'ms-ListItem-action'}), 
                React.createElement("div", {className: 'ms-ListItem-action'}), 
                React.createElement("div", {className: 'ms-ListItem-action'}), 
                React.createElement("div", {className: 'ms-ListItem-action'}))));
    };
    return MailTile;
}(React.Component));
exports.MailTile = MailTile;
var ListMailExample = (function (_super) {
    __extends(ListMailExample, _super);
    function ListMailExample() {
        _super.apply(this, arguments);
    }
    ListMailExample.prototype.render = function () {
        return (React.createElement("div", null, 
            React.createElement("h1", {className: 'ms-font-xxl'}, "Inbox"), 
            React.createElement("div", {className: 'MailList', "data-is-scrollable": true}, 
                React.createElement(index_1.List, {items: this.props.items, onRenderCell: function (item, index) { return (React.createElement(MailTile, {item: item})); }})
            )));
    };
    return ListMailExample;
}(React.Component));
exports.ListMailExample = ListMailExample;

//# sourceMappingURL=List.Mail.Example.js.map
