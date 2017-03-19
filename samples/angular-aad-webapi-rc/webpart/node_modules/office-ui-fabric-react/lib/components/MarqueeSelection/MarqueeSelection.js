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
var AutoScroll_1 = require('../../utilities/AutoScroll/AutoScroll');
var BaseComponent_1 = require('../../common/BaseComponent');
var css_1 = require('../../utilities/css');
var scroll_1 = require('../../utilities/scroll');
var math_1 = require('../../utilities/math');
var rtl_1 = require('../../utilities/rtl');
var autobind_1 = require('../../utilities/autobind');
require('./MarqueeSelection.scss');
// We want to make the marquee selection start when the user drags a minimum distance. Otherwise we'd start
// the drag even if they just click an item without moving.
var MIN_DRAG_DISTANCE = 5;
/**
 * MarqueeSelection component abstracts managing a draggable rectangle which sets items selected/not selected.
 * Elements which have data-selectable-index attributes are queried and measured once to determine if they
 * fall within the bounds of the rectangle. The measure is memoized during the drag as a performance optimization
 * so if the items change sizes while dragging, that could cause incorrect results.
 */
var MarqueeSelection = (function (_super) {
    __extends(MarqueeSelection, _super);
    function MarqueeSelection(props) {
        _super.call(this, props);
        this.state = {
            dragRect: undefined
        };
    }
    MarqueeSelection.prototype.componentDidMount = function () {
        this._scrollableParent = scroll_1.findScrollableParent(this.refs.root);
        this._scrollableSurface = this._scrollableParent === window ? document.body : this._scrollableParent;
        // When scroll events come from window, we need to read scrollTop values from the body.
        this._events.on(this.props.isDraggingConstrainedToRoot ? this.refs.root : this._scrollableSurface, 'mousedown', this._onMouseDown);
    };
    MarqueeSelection.prototype.componentWillUnmount = function () {
        if (this._autoScroll) {
            this._autoScroll.dispose();
        }
    };
    MarqueeSelection.prototype.render = function () {
        var _a = this.props, rootProps = _a.rootProps, children = _a.children;
        var dragRect = this.state.dragRect;
        return (React.createElement("div", __assign({}, rootProps, {className: css_1.css('ms-MarqueeSelection', rootProps.className), ref: 'root'}), 
            children, 
            dragRect && (React.createElement("div", {className: 'ms-MarqueeSelection-dragMask'})), 
            dragRect && (React.createElement("div", {className: 'ms-MarqueeSelection-box', style: dragRect}, 
                React.createElement("div", {className: 'ms-MarqueeSelection-boxFill'})
            ))));
    };
    /** Determine if the mouse event occured on a scrollbar of the target element. */
    MarqueeSelection.prototype._isMouseEventOnScrollbar = function (ev) {
        var targetElement = ev.target;
        var targetScrollbarWidth = (targetElement.offsetWidth - targetElement.clientWidth);
        if (targetScrollbarWidth) {
            var targetRect = targetElement.getBoundingClientRect();
            // Check vertical scroll
            if (rtl_1.getRTL()) {
                if (ev.clientX < (targetRect.left + targetScrollbarWidth)) {
                    return true;
                }
            }
            else {
                if (ev.clientX > (targetRect.left + targetElement.clientWidth)) {
                    return true;
                }
            }
            // Check horizontal scroll
            if (ev.clientY > (targetRect.top + targetElement.clientHeight)) {
                return true;
            }
        }
        return false;
    };
    MarqueeSelection.prototype._onMouseDown = function (ev) {
        var _a = this.props, isEnabled = _a.isEnabled, onShouldStartSelection = _a.onShouldStartSelection;
        // Ensure the mousedown is within the boundaries of the target. If not, it may have been a click on a scrollbar.
        if (this._isMouseEventOnScrollbar(ev)) {
            return;
        }
        if (isEnabled && (!onShouldStartSelection || onShouldStartSelection(ev))) {
            if (this._scrollableSurface && ev.button === 0) {
                this._selectedIndicies = {};
                this._events.on(window, 'mousemove', this._onMouseMove);
                this._events.on(this._scrollableParent, 'scroll', this._onMouseMove);
                this._events.on(window, 'mouseup', this._onMouseUp, true);
                this._autoScroll = new AutoScroll_1.AutoScroll(this.refs.root);
                this._scrollTop = this._scrollableSurface.scrollTop;
                this._rootRect = this.refs.root.getBoundingClientRect();
            }
        }
    };
    MarqueeSelection.prototype._getRootRect = function () {
        return {
            left: this._rootRect.left,
            top: this._rootRect.top + (this._scrollTop - this._scrollableSurface.scrollTop),
            width: this._rootRect.width,
            height: this._rootRect.height
        };
    };
    MarqueeSelection.prototype._onMouseMove = function (ev) {
        if (ev.clientX !== undefined) {
            this._lastMouseEvent = ev;
        }
        var rootRect = this._getRootRect();
        var currentPoint = { x: ev.clientX - rootRect.left, y: ev.clientY - rootRect.top };
        if (!this._dragOrigin) {
            this._dragOrigin = currentPoint;
        }
        if (ev.buttons !== undefined && ev.buttons === 0) {
            this._onMouseUp(ev);
        }
        else {
            if (this.state.dragRect || math_1.getDistanceBetweenPoints(this._dragOrigin, currentPoint) > MIN_DRAG_DISTANCE) {
                // We need to constrain the current point to the rootRect boundaries.
                var constrainedPoint = this.props.isDraggingConstrainedToRoot ? {
                    x: Math.max(0, Math.min(rootRect.width, this._lastMouseEvent.clientX - rootRect.left)),
                    y: Math.max(0, Math.min(rootRect.height, this._lastMouseEvent.clientY - rootRect.top))
                } : {
                    x: this._lastMouseEvent.clientX - rootRect.left,
                    y: this._lastMouseEvent.clientY - rootRect.top
                };
                var dragRect = {
                    left: Math.min(this._dragOrigin.x, constrainedPoint.x),
                    top: Math.min(this._dragOrigin.y, constrainedPoint.y),
                    width: Math.abs(constrainedPoint.x - this._dragOrigin.x),
                    height: Math.abs(constrainedPoint.y - this._dragOrigin.y)
                };
                this.setState({ dragRect: dragRect });
                this._evaluateSelection(dragRect);
            }
        }
        ev.stopPropagation();
        ev.preventDefault();
        return false;
    };
    MarqueeSelection.prototype._onMouseUp = function (ev) {
        var _this = this;
        this._events.off(window);
        this._events.off(this._scrollableParent, 'scroll');
        this._autoScroll.dispose();
        this._autoScroll = this._dragOrigin = this._lastMouseEvent = this._selectedIndicies = this._itemRectCache = undefined;
        if (this.state.dragRect) {
            // When we've moused up from selection, make sure the click doesn't get executed.
            var clickRemovalCallback_1 = function (clickEvent) {
                _this._events.off(ev.target, 'click', clickRemovalCallback_1);
                clickEvent.preventDefault();
                clickEvent.stopPropagation();
            };
            this._events.on(ev.target, 'click', clickRemovalCallback_1, true);
            this.setState({
                dragRect: undefined
            });
            ev.preventDefault();
            ev.stopPropagation();
        }
    };
    MarqueeSelection.prototype._evaluateSelection = function (dragRect) {
        // Break early if we don't need to evaluate.
        if (!dragRect) {
            return;
        }
        var selection = this.props.selection;
        var rootRect = this._getRootRect();
        var allElements = this.refs.root.querySelectorAll('[data-selection-index]');
        if (!this._itemRectCache) {
            this._itemRectCache = {};
        }
        // Stop change events, clear selection to re-populate.
        selection.setChangeEvents(false);
        selection.setAllSelected(false);
        for (var i = 0; i < allElements.length; i++) {
            var element = allElements[i];
            var index = element.getAttribute('data-selection-index');
            // Pull the memoized rectangle for the item, or the get the rect and memoize.
            var itemRect = this._itemRectCache[index];
            if (!itemRect) {
                itemRect = element.getBoundingClientRect();
                // Normalize the item rect to the dragRect coordinates.
                itemRect = {
                    left: itemRect.left - rootRect.left,
                    top: itemRect.top - rootRect.top,
                    width: itemRect.width,
                    height: itemRect.height,
                    right: (itemRect.left - rootRect.left) + itemRect.width,
                    bottom: (itemRect.top - rootRect.top) + itemRect.height
                };
                if (itemRect.width > 0 && itemRect.height > 0) {
                    this._itemRectCache[index] = itemRect;
                }
            }
            if (itemRect.top < (dragRect.top + dragRect.height) &&
                itemRect.bottom > dragRect.top &&
                itemRect.left < (dragRect.left + dragRect.width) &&
                itemRect.right > dragRect.left) {
                this._selectedIndicies[index] = true;
            }
            else {
                delete this._selectedIndicies[index];
            }
        }
        for (var index in this._selectedIndicies) {
            if (this._selectedIndicies.hasOwnProperty(index)) {
                selection.setIndexSelected(Number(index), true, false);
            }
        }
        selection.setChangeEvents(true);
    };
    MarqueeSelection.defaultProps = {
        rootTagName: 'div',
        rootProps: {},
        isEnabled: true
    };
    __decorate([
        autobind_1.autobind
    ], MarqueeSelection.prototype, "_onMouseDown", null);
    return MarqueeSelection;
}(BaseComponent_1.BaseComponent));
exports.MarqueeSelection = MarqueeSelection;

//# sourceMappingURL=MarqueeSelection.js.map
