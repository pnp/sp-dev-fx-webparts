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
var React = require('react');
var BaseDecorator_1 = require('./BaseDecorator');
var scroll_1 = require('../../utilities/scroll');
var dom_1 = require('../../utilities/dom');
var RESIZE_DELAY = 500;
function withViewport(ComposedComponent) {
    return (function (_super) {
        __extends(WithViewportComponent, _super);
        function WithViewportComponent() {
            _super.call(this);
            this.state = {
                viewport: {
                    width: 0,
                    height: 0
                }
            };
        }
        WithViewportComponent.prototype.componentDidMount = function () {
            this._onAsyncResize = this._async.debounce(this._onAsyncResize, RESIZE_DELAY, {
                leading: false
            });
            this._events.on(window, 'resize', this._onAsyncResize);
            this._updateViewport();
        };
        WithViewportComponent.prototype.componentWillUnmount = function () {
            this._events.dispose();
        };
        WithViewportComponent.prototype.render = function () {
            var viewport = this.state.viewport;
            var isViewportVisible = viewport.width > 0 && viewport.height > 0;
            return (React.createElement("div", {className: 'ms-Viewport', ref: 'root', style: { minWidth: 1, minHeight: 1 }}, isViewportVisible && (React.createElement(ComposedComponent, __assign({ref: this._updateComposedComponentRef, viewport: viewport}, this.props)))));
        };
        WithViewportComponent.prototype.forceUpdate = function () {
            this._updateViewport(true);
        };
        WithViewportComponent.prototype._onAsyncResize = function () {
            this._updateViewport();
        };
        WithViewportComponent.prototype._updateViewport = function (withForceUpdate) {
            var _this = this;
            var viewport = this.state.viewport;
            var viewportElement = this.refs.root;
            var scrollElement = scroll_1.findScrollableParent(viewportElement);
            var scrollRect = dom_1.getRect(scrollElement);
            var clientRect = dom_1.getRect(viewportElement);
            var updateComponent = function () {
                if (withForceUpdate && _this._composedComponentInstance) {
                    _this._composedComponentInstance.forceUpdate();
                }
            };
            var isSizeChanged = (clientRect.width !== viewport.width ||
                scrollRect.height !== viewport.height);
            if (isSizeChanged) {
                this.setState({
                    viewport: {
                        width: clientRect.width,
                        height: scrollRect.height
                    }
                }, updateComponent);
            }
            else {
                updateComponent();
            }
        };
        return WithViewportComponent;
    }(BaseDecorator_1.BaseDecorator));
}
exports.withViewport = withViewport;

//# sourceMappingURL=withViewport.js.map
