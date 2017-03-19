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
var BaseComponent_1 = require('../../common/BaseComponent');
var FocusZone_1 = require('../../FocusZone');
var ContextualMenu_1 = require('../../ContextualMenu');
var DirectionalHint_1 = require('../../common/DirectionalHint');
var rtl_1 = require('../../utilities/rtl');
var object_1 = require('../../utilities/object');
var css_1 = require('../../utilities/css');
var autobind_1 = require('../../utilities/autobind');
require('./Breadcrumb.scss');
var OVERFLOW_KEY = 'overflow';
var OVERFLOW_WIDTH = 44;
var Breadcrumb = (function (_super) {
    __extends(Breadcrumb, _super);
    function Breadcrumb(props) {
        _super.call(this, props);
        this._id = object_1.getId('Breadcrumb');
        this.state = this._getStateFromProps(props);
    }
    Breadcrumb.prototype.componentDidMount = function () {
        this._updateItemMeasurements();
        this._updateRenderedItems();
        this._events.on(window, 'resize', this._updateRenderedItems);
    };
    Breadcrumb.prototype.componentWillReceiveProps = function (nextProps) {
        this.setState(this._getStateFromProps(nextProps));
        this._breadcrumbItemWidths = null;
    };
    Breadcrumb.prototype.componentDidUpdate = function (prevProps, prevStates) {
        if (!this._breadcrumbItemWidths) {
            this._updateItemMeasurements();
            this._updateRenderedItems();
        }
    };
    Breadcrumb.prototype.render = function () {
        var _this = this;
        var className = this.props.className;
        var _a = this.state, isOverflowOpen = _a.isOverflowOpen, overflowAnchor = _a.overflowAnchor, renderedItems = _a.renderedItems, renderedOverflowItems = _a.renderedOverflowItems;
        var overflowMenuId = this._id + '-overflow';
        return (React.createElement("div", {className: css_1.css('ms-Breadcrumb', className), ref: 'renderingArea'}, 
            React.createElement(FocusZone_1.FocusZone, {direction: FocusZone_1.FocusZoneDirection.horizontal}, 
                React.createElement("ul", {className: 'ms-Breadcrumb-list'}, 
                    renderedOverflowItems && renderedOverflowItems.length ? (React.createElement("li", {className: 'ms-Breadcrumb-overflow', key: OVERFLOW_KEY, ref: OVERFLOW_KEY}, 
                        React.createElement("div", {className: 'ms-Breadcrumb-overflowButton ms-Icon ms-Icon--More', onClick: this._onOverflowClicked, "data-is-focusable": true, role: 'button', "aria-haspopup": 'true', "aria-owns": isOverflowOpen ? overflowMenuId : null}), 
                        React.createElement("i", {className: css_1.css('ms-Breadcrumb-chevron ms-Icon', rtl_1.getRTL() ? 'ms-Icon--ChevronLeft' : 'ms-Icon--ChevronRight')}))) : (null), 
                    renderedItems.map(function (item, index) { return (React.createElement("li", {className: 'ms-Breadcrumb-listItem', key: item.key || String(index), ref: item.key || String(index)}, 
                        React.createElement("a", {className: 'ms-Breadcrumb-itemLink', onClick: item.onClick ? _this._onBreadcrumbClicked.bind(_this, item) : null, href: item.href, role: item.onClick ? 'button' : 'link'}, item.text), 
                        React.createElement("i", {className: css_1.css('ms-Breadcrumb-chevron ms-Icon', rtl_1.getRTL() ? 'ms-Icon--ChevronLeft' : 'ms-Icon--ChevronRight')}))); }))
            ), 
            isOverflowOpen ? (React.createElement(ContextualMenu_1.ContextualMenu, {targetElement: overflowAnchor, isBeakVisible: true, items: renderedOverflowItems.map(function (item, index) { return ({
                name: item.text,
                key: item.key,
                onClick: _this._onBreadcrumbClicked.bind(_this, item),
                href: item.href
            }); }), id: overflowMenuId, directionalHint: DirectionalHint_1.DirectionalHint.bottomLeftEdge, onDismiss: this._onOverflowDismissed})) : (null)));
    };
    Breadcrumb.prototype._onOverflowClicked = function (ev) {
        this.setState({
            'isOverflowOpen': !this.state.isOverflowOpen,
            'overflowAnchor': ev.currentTarget
        });
    };
    Breadcrumb.prototype._onOverflowDismissed = function (ev) {
        this.setState({
            'isOverflowOpen': false,
            'overflowAnchor': null
        });
    };
    Breadcrumb.prototype._onBreadcrumbClicked = function (item, ev) {
        if (item.onClick) {
            item.onClick(ev, item);
        }
        this.setState({
            'isOverflowOpen': false
        });
    };
    Breadcrumb.prototype._updateItemMeasurements = function () {
        var items = this.props.items;
        if (!this._breadcrumbItemWidths) {
            this._breadcrumbItemWidths = {};
        }
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            if (!this._breadcrumbItemWidths[item.key]) {
                var el = this.refs[item.key];
                this._breadcrumbItemWidths[item.key] = el.getBoundingClientRect().width;
            }
        }
    };
    Breadcrumb.prototype._updateRenderedItems = function () {
        var _a = this.props, items = _a.items, maxDisplayedItems = _a.maxDisplayedItems;
        var renderingArea = this.refs.renderingArea;
        var renderedItems = [];
        var renderedOverflowItems = [].concat(items);
        var consumedWidth = 0;
        var style = window.getComputedStyle(renderingArea);
        var availableWidth = renderingArea.clientWidth - parseInt(style.marginLeft, 10) - parseInt(style.marginRight, 10);
        availableWidth -= OVERFLOW_WIDTH;
        var i;
        var minIndex = Math.max(0, renderedOverflowItems.length - maxDisplayedItems);
        for (i = renderedOverflowItems.length - 1; i >= minIndex; i--) {
            var item = renderedOverflowItems[i];
            var itemWidth = this._breadcrumbItemWidths[item.key];
            if ((consumedWidth + itemWidth) >= availableWidth) {
                break;
            }
            else {
                consumedWidth += itemWidth;
            }
        }
        renderedItems = renderedOverflowItems.splice(i + 1);
        this.setState({
            isOverflowOpen: this.state.isOverflowOpen,
            overflowAnchor: this.state.overflowAnchor,
            renderedItems: renderedItems,
            renderedOverflowItems: renderedOverflowItems,
        });
    };
    Breadcrumb.prototype._getStateFromProps = function (nextProps) {
        return {
            isOverflowOpen: false,
            overflowAnchor: null,
            renderedItems: nextProps.items || [],
            renderedOverflowItems: null
        };
    };
    Breadcrumb.defaultProps = {
        items: [],
        maxDisplayedItems: 999
    };
    __decorate([
        autobind_1.autobind
    ], Breadcrumb.prototype, "_onOverflowClicked", null);
    __decorate([
        autobind_1.autobind
    ], Breadcrumb.prototype, "_onOverflowDismissed", null);
    __decorate([
        autobind_1.autobind
    ], Breadcrumb.prototype, "_onBreadcrumbClicked", null);
    return Breadcrumb;
}(BaseComponent_1.BaseComponent));
exports.Breadcrumb = Breadcrumb;

//# sourceMappingURL=Breadcrumb.js.map
