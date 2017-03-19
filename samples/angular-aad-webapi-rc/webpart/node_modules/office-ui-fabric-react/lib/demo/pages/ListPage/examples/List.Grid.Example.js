"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var index_1 = require('../../../../index');
require('./List.Grid.Example.scss');
var ROWS_PER_PAGE = 3;
var MAX_ROW_HEIGHT = 250;
var ListGridExample = (function (_super) {
    __extends(ListGridExample, _super);
    function ListGridExample() {
        _super.call(this);
        this._positions = {};
        this._getItemCountForPage = this._getItemCountForPage.bind(this);
        this._getPageHeight = this._getPageHeight.bind(this);
    }
    ListGridExample.prototype.render = function () {
        var _this = this;
        return (React.createElement(index_1.FocusZone, null, 
            React.createElement(index_1.List, {className: 'ms-ListGridExample', items: this.props.items, getItemCountForPage: this._getItemCountForPage, getPageHeight: this._getPageHeight, renderedWindowsAhead: 4, onRenderCell: function (item, index) { return (React.createElement("div", {className: 'ms-ListGridExample-tile', "data-is-focusable": true, style: {
                width: (100 / _this._columnCount) + '%'
            }}, 
                React.createElement("div", {className: 'ms-ListGridExample-sizer'}, 
                    React.createElement("div", {className: 'msListGridExample-padder'}, 
                        React.createElement("img", {src: item.thumbnail, className: 'ms-ListGridExample-image'}), 
                        React.createElement("span", {className: 'ms-ListGridExample-label'}, "item " + index))
                )
            )); }})
        ));
    };
    ListGridExample.prototype._getItemCountForPage = function (itemIndex, surfaceRect) {
        if (itemIndex === 0) {
            this._columnCount = Math.ceil(surfaceRect.width / MAX_ROW_HEIGHT);
            this._columnWidth = Math.floor(surfaceRect.width / this._columnCount);
            this._rowHeight = this._columnWidth;
        }
        return this._columnCount * ROWS_PER_PAGE;
    };
    ListGridExample.prototype._getPageHeight = function (itemIndex, surfaceRect) {
        return this._rowHeight * ROWS_PER_PAGE;
    };
    return ListGridExample;
}(React.Component));
exports.ListGridExample = ListGridExample;

//# sourceMappingURL=List.Grid.Example.js.map
