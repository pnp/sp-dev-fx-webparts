"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var index_1 = require('../../../../index');
var css_1 = require('../../../../utilities/css');
var rtl_1 = require('../../../../utilities/rtl');
require('./List.Basic.Example.scss');
var ListBasicExample = (function (_super) {
    __extends(ListBasicExample, _super);
    function ListBasicExample(props) {
        _super.call(this, props);
        this._onFilterChanged = this._onFilterChanged.bind(this);
        this.state = {
            filterText: '',
            items: props.items
        };
    }
    ListBasicExample.prototype.render = function () {
        var originalItems = this.props.items;
        var items = this.state.items;
        var resultCountText = items.length === originalItems.length ? '' : " (" + items.length + " of " + originalItems.length + " shown)";
        return (React.createElement(index_1.FocusZone, {direction: index_1.FocusZoneDirection.vertical}, 
            React.createElement(index_1.TextField, {label: 'Filter by name' + resultCountText, onBeforeChange: this._onFilterChanged}), 
            React.createElement(index_1.List, {items: items, onRenderCell: function (item, index) { return (React.createElement("div", {className: 'ms-ListBasicExample-itemCell', "data-is-focusable": true}, 
                React.createElement(index_1.Image, {className: 'ms-ListBasicExample-itemImage', src: item.thumbnail, width: 50, height: 50, imageFit: index_1.ImageFit.cover}), 
                React.createElement("div", {className: 'ms-ListBasicExample-itemContent'}, 
                    React.createElement("div", {className: 'ms-ListBasicExample-itemName ms-font-xl'}, item.name), 
                    React.createElement("div", {className: 'ms-ListBasicExample-itemIndex'}, "Item " + index), 
                    React.createElement("div", {className: 'ms-ListBasicExample-itemDesc ms-font-s'}, item.description)), 
                React.createElement("i", {className: css_1.css('ms-ListBasicExample-chevron ms-Icon', {
                    'ms-Icon--chevronRight': !rtl_1.getRTL(),
                    'ms-Icon--chevronLeft': rtl_1.getRTL()
                })}))); }})));
    };
    ListBasicExample.prototype._onFilterChanged = function (text) {
        var items = this.props.items;
        this.setState({
            filterText: text,
            items: text ?
                items.filter(function (item) { return item.name.toLowerCase().indexOf(text.toLowerCase()) >= 0; }) :
                items
        });
    };
    return ListBasicExample;
}(React.Component));
exports.ListBasicExample = ListBasicExample;

//# sourceMappingURL=List.Basic.Example.js.map
