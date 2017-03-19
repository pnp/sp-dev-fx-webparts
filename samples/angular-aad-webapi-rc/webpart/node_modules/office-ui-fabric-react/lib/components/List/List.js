"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var Utilities_1 = require('../../Utilities');
var scroll_1 = require('../../utilities/scroll');
var RESIZE_DELAY = 16;
var MIN_SCROLL_UPDATE_DELAY = 100;
var MAX_SCROLL_UPDATE_DELAY = 500;
var IDLE_DEBOUNCE_DELAY = 200;
var DEFAULT_ITEMS_PER_PAGE = 10;
var DEFAULT_PAGE_HEIGHT = 30;
var DEFAULT_RENDERED_WINDOWS_BEHIND = 2;
var DEFAULT_RENDERED_WINDOWS_AHEAD = 2;
var EMPTY_RECT = {
    top: -1,
    bottom: -1,
    left: -1,
    right: -1,
    width: 0,
    height: 0
};
// Naming expensive measures so that they're named in profiles.
var _measurePageRect = function (element) { return element.getBoundingClientRect(); };
var _measureSurfaceRect = _measurePageRect;
/**
 * The List renders virtualized pages of items. Each page's item count is determined by the getItemCountForPage callback if
 * provided by the caller, or 10 as default. Each page's height is determined by the getPageHeight callback if provided by
 * the caller, or by cached measurements if available, or by a running average, or a default fallback.
 *
 * The algorithm for rendering pages works like this:
 *
 * 1. Predict visible pages based on "current measure data" (page heights, surface position, visible window)
 * 2. If changes are necessary, apply changes (add/remove pages)
 * 3. For pages that are added, measure the page heights if we need to using getBoundingClientRect
 * 4. If measurements don't match predictions, update measure data and goto step 1 asynchronously
 *
 * Measuring too frequently can pull performance down significantly. To compensate, we cache measured values so that
 * we can avoid re-measuring during operations that should not alter heights, like scrolling.
 *
 * However, certain operations can make measure data stale. For example, resizing the list, or passing in new props,
 * or forcing an update change cause pages to shrink/grow. When these operations occur, we increment a measureVersion
 * number, which we associate with cached measurements and use to determine if a remeasure should occur.
 */
var List = (function (_super) {
    __extends(List, _super);
    function List(props) {
        _super.call(this, props);
        this.state = {
            pages: []
        };
        this._estimatedPageHeight = 0;
        this._totalEstimates = 0;
        this._requiredWindowsAhead = 0;
        this._requiredWindowsBehind = 0;
        // Track the measure version for everything.
        this._measureVersion = 0;
        // Ensure that scrolls are lazy updated.
        this._onAsyncScroll = this._async.debounce(this._onAsyncScroll, MIN_SCROLL_UPDATE_DELAY, {
            leading: false,
            maxWait: MAX_SCROLL_UPDATE_DELAY
        });
        this._onAsyncIdle = this._async.debounce(this._onAsyncIdle, IDLE_DEBOUNCE_DELAY, {
            leading: false
        });
        this._onAsyncResize = this._async.debounce(this._onAsyncResize, RESIZE_DELAY, {
            leading: false
        });
        this._cachedPageHeights = {};
        this._estimatedPageHeight = 0;
        this._focusedIndex = -1;
        this._scrollingToIndex = -1;
    }
    List.prototype.componentDidMount = function () {
        this._updatePages();
        this._measureVersion++;
        this._scrollElement = scroll_1.findScrollableParent(this.refs.root);
        this._events.on(window, 'resize', this._onAsyncResize);
        this._events.on(this.refs.root, 'focus', this._onFocus, true);
        if (this._scrollElement) {
            this._events.on(this._scrollElement, 'scroll', this._onScroll);
            this._events.on(this._scrollElement, 'scroll', this._onAsyncScroll);
        }
    };
    List.prototype.componentWillReceiveProps = function (newProps) {
        if (newProps.items !== this.props.items ||
            newProps.renderCount !== this.props.renderCount ||
            newProps.startIndex !== this.props.startIndex) {
            this._measureVersion++;
            this._updatePages(newProps);
        }
    };
    List.prototype.shouldComponentUpdate = function (newProps, newState) {
        var _a = this.props, renderedWindowsAhead = _a.renderedWindowsAhead, renderedWindowsBehind = _a.renderedWindowsBehind;
        var oldPages = this.state.pages;
        var newPages = newState.pages, measureVersion = newState.measureVersion;
        var shouldComponentUpdate = false;
        if (this._measureVersion === measureVersion &&
            newProps.renderedWindowsAhead === renderedWindowsAhead,
            newProps.renderedWindowsBehind === renderedWindowsBehind,
            newProps.items === this.props.items &&
                oldPages.length === newPages.length) {
            for (var i = 0; i < oldPages.length; i++) {
                var oldPage = oldPages[i];
                var newPage = newPages[i];
                if ((oldPage.key !== newPage.key ||
                    oldPage.itemCount !== newPage.itemCount)) {
                    shouldComponentUpdate = true;
                    break;
                }
            }
        }
        else {
            shouldComponentUpdate = true;
        }
        return shouldComponentUpdate;
    };
    List.prototype.forceUpdate = function () {
        // Ensure that when the list is force updated we update the pages first before render.
        this._updateRenderRects(this.props, true);
        this._updatePages();
        this._measureVersion++;
        _super.prototype.forceUpdate.call(this);
    };
    List.prototype.render = function () {
        var className = this.props.className;
        var pages = this.state.pages;
        var pageElements = [];
        for (var i = 0; i < pages.length; i++) {
            pageElements.push(this._renderPage(pages[i]));
        }
        return (React.createElement("div", {ref: 'root', className: Utilities_1.css('ms-List', className)}, 
            React.createElement("div", {ref: 'surface', className: 'ms-List-surface'}, pageElements)
        ));
    };
    List.prototype._renderPage = function (page) {
        var onRenderCell = this.props.onRenderCell;
        var cells = [];
        var pageStyle = this._getPageStyle(page);
        for (var i = 0; page.items && i < page.items.length; i++) {
            var item = page.items[i];
            var itemKey = (item ? item.key : null);
            if (itemKey === null || itemKey === undefined) {
                itemKey = page.startIndex + i;
            }
            cells.push(React.createElement("div", {className: 'ms-List-cell', key: itemKey, "data-list-index": i + page.startIndex, "data-automationid": 'ListCell'}, onRenderCell(item, page.startIndex + i)));
        }
        return (React.createElement("div", {className: 'ms-List-page', key: page.key, ref: page.key, style: pageStyle}, cells));
    };
    /** Generate the style object for the page. */
    List.prototype._getPageStyle = function (page) {
        var style;
        var getPageStyle = this.props.getPageStyle;
        if (getPageStyle) {
            style = getPageStyle(page);
        }
        if (!page.items) {
            style = style || {};
            style.height = page.height;
        }
        return style;
    };
    /** Track the last item index focused so that we ensure we keep it rendered. */
    List.prototype._onFocus = function (ev) {
        var target = ev.target;
        while (target !== this.refs.surface) {
            var indexString = target.getAttribute('data-list-index');
            if (indexString) {
                this._focusedIndex = Number(indexString);
                break;
            }
            target = Utilities_1.getParent(target);
        }
    };
    /**
     * Called synchronously to reset the required render range to 0 on scrolling. After async scroll has executed,
     * we will call onAsyncIdle which will reset it back to it's correct value.
     */
    List.prototype._onScroll = function () {
        this._requiredWindowsAhead = 0;
        this._requiredWindowsBehind = 0;
    };
    /**
     * Debounced method to asynchronously update the visible region on a scroll event.
     */
    List.prototype._onAsyncScroll = function () {
        this._updateRenderRects();
        // Only update pages when the visible rect falls outside of the materialized rect.
        if (!this._materializedRect || !_isContainedWithin(this._requiredRect, this._materializedRect)) {
            this._updatePages();
        }
        else {
        }
    };
    /**
     * This is an async debounced method that will try and increment the windows we render. If we can increment
     * either, we increase the amount we render and re-evaluate.
     */
    List.prototype._onAsyncIdle = function () {
        var _a = this.props, renderedWindowsAhead = _a.renderedWindowsAhead, renderedWindowsBehind = _a.renderedWindowsBehind;
        var _b = this, requiredWindowsAhead = _b._requiredWindowsAhead, requiredWindowsBehind = _b._requiredWindowsBehind;
        var windowsAhead = Math.min(renderedWindowsAhead, requiredWindowsAhead + 1);
        var windowsBehind = Math.min(renderedWindowsBehind, requiredWindowsBehind + 1);
        if (windowsAhead !== requiredWindowsAhead || windowsBehind !== requiredWindowsBehind) {
            // console.log('idling', windowsBehind, windowsAhead);
            this._requiredWindowsAhead = windowsAhead;
            this._requiredWindowsBehind = windowsBehind;
            this._updateRenderRects();
            this._updatePages();
        }
        if (renderedWindowsAhead > windowsAhead || renderedWindowsBehind > windowsBehind) {
            // Async increment on next tick.
            this._onAsyncIdle();
        }
    };
    List.prototype._onAsyncResize = function () {
        this.forceUpdate();
    };
    List.prototype._updatePages = function (props) {
        var _this = this;
        var _a = (props || this.props), items = _a.items, startIndex = _a.startIndex, renderCount = _a.renderCount;
        renderCount = this._getRenderCount(props);
        // console.log('updating pages');
        if (!this._requiredRect) {
            this._updateRenderRects(props);
        }
        var newListState = this._buildPages(items, startIndex, renderCount);
        var oldListPages = this.state.pages;
        this.setState(newListState, function () {
            // If measured version is invalid since we've updated the DOM
            var heightsChanged = _this._updatePageMeasurements(oldListPages, newListState.pages);
            // On first render, we should re-measure so that we don't get a visual glitch.
            if (heightsChanged) {
                _this._materializedRect = null;
                if (!_this._hasCompletedFirstRender) {
                    _this._hasCompletedFirstRender = true;
                    _this._updatePages();
                }
                else {
                    _this._onAsyncScroll();
                }
            }
            else {
                // Enqueue an idle bump.
                _this._onAsyncIdle();
            }
        });
    };
    List.prototype._updatePageMeasurements = function (oldPages, newPages) {
        var renderedIndexes = {};
        var heightChanged = false;
        var renderCount = this._getRenderCount();
        for (var i = 0; i < oldPages.length; i++) {
            var page = oldPages[i];
            if (page.items) {
                renderedIndexes[page.startIndex] = page;
            }
        }
        for (var i = 0; i < newPages.length; i++) {
            var page = newPages[i];
            if (page.items) {
                // Only evaluate page height if the page contains less items than total.
                if (page.items.length < renderCount) {
                    heightChanged = this._measurePage(page) || heightChanged;
                }
                if (!renderedIndexes[page.startIndex]) {
                    this._onPageAdded(page);
                }
                else {
                    delete renderedIndexes[page.startIndex];
                }
            }
        }
        for (var index in renderedIndexes) {
            if (renderedIndexes.hasOwnProperty(index)) {
                this._onPageRemoved(renderedIndexes[index]);
            }
        }
        return heightChanged;
    };
    /**
     * Given a page, measure its dimensions, update cache.
     * @returns True if the height has changed.
     */
    List.prototype._measurePage = function (page) {
        var hasChangedHeight = false;
        var pageElement = this.refs[page.key];
        var cachedHeight = this._cachedPageHeights[page.startIndex];
        // console.log('   * measure attempt', page.startIndex, cachedHeight);
        if (pageElement && (!cachedHeight || cachedHeight.measureVersion !== this._measureVersion)) {
            var newClientRect = _measurePageRect(pageElement);
            hasChangedHeight = page.height !== newClientRect.height;
            // console.warn(' *** expensive page measure', page.startIndex, page.height, newClientRect.height);
            page.height = newClientRect.height;
            this._cachedPageHeights[page.startIndex] = {
                height: newClientRect.height,
                measureVersion: this._measureVersion
            };
            this._estimatedPageHeight = Math.round(((this._estimatedPageHeight * this._totalEstimates) + newClientRect.height) /
                (this._totalEstimates + 1));
            this._totalEstimates++;
        }
        return hasChangedHeight;
    };
    /** Called when a page has been added to the DOM. */
    List.prototype._onPageAdded = function (page) {
        var onPageAdded = this.props.onPageAdded;
        // console.log('page added', page.startIndex, this.state.pages.map(page=>page.key).join(', '));
        if (onPageAdded) {
            onPageAdded(page);
        }
    };
    /** Called when a page has been removed from the DOM. */
    List.prototype._onPageRemoved = function (page) {
        var onPageRemoved = this.props.onPageRemoved;
        // console.log('  --- page removed', page.startIndex, this.state.pages.map(page=>page.key).join(', '));
        if (onPageRemoved) {
            onPageRemoved(page);
        }
    };
    /** Build up the pages that should be rendered. */
    List.prototype._buildPages = function (items, startIndex, renderCount) {
        var materializedRect = Utilities_1.assign({}, EMPTY_RECT);
        var itemsPerPage = 1;
        var pages = [];
        var pageTop = 0;
        var currentSpacer = null;
        var focusedIndex = this._focusedIndex;
        var endIndex = startIndex + renderCount;
        // First render is very important to track; when we render cells, we have no idea of estimated page height.
        // So we should default to rendering only the first page so that we can get information.
        // However if the user provides a measure function, let's just assume they know the right heights.
        var isFirstRender = this._estimatedPageHeight === 0 && !this.props.getPageHeight;
        var _loop_1 = function(itemIndex) {
            itemsPerPage = this_1._getItemCountForPage(itemIndex, this_1._allowedRect);
            var pageHeight = this_1._getPageHeight(itemIndex, itemsPerPage, this_1._surfaceRect);
            var pageBottom = pageTop + pageHeight - 1;
            var isPageRendered = Utilities_1.findIndex(this_1.state.pages, function (page) { return page.items && page.startIndex === itemIndex; }) > -1;
            var isPageInAllowedRange = pageBottom >= this_1._allowedRect.top && pageTop <= this_1._allowedRect.bottom;
            var isPageInRequiredRange = pageBottom >= this_1._requiredRect.top && pageTop <= this_1._requiredRect.bottom;
            var isPageVisible = !isFirstRender && (isPageInRequiredRange || (isPageInAllowedRange && isPageRendered));
            var isPageFocused = focusedIndex >= itemIndex && focusedIndex < (itemIndex + itemsPerPage);
            var isFirstPage = itemIndex === startIndex;
            // console.log('building page', itemIndex, 'pageTop: ' + pageTop, 'inAllowed: ' + isPageInAllowedRange, 'inRequired: ' + isPageInRequiredRange);
            // Only render whats visible, focused, or first page.
            if (isPageVisible || isPageFocused || isFirstPage) {
                if (currentSpacer) {
                    pages.push(currentSpacer);
                    currentSpacer = null;
                }
                var itemsInPage = Math.min(itemsPerPage, endIndex - itemIndex);
                var newPage = this_1._createPage(null, items.slice(itemIndex, itemIndex + itemsInPage), itemIndex);
                newPage.top = pageTop;
                newPage.height = pageHeight;
                pages.push(newPage);
                if (isPageInRequiredRange) {
                    _mergeRect(materializedRect, {
                        top: pageTop,
                        bottom: pageBottom,
                        height: pageHeight,
                        left: this_1._allowedRect.left,
                        right: this_1._allowedRect.right,
                        width: this_1._allowedRect.width
                    });
                }
            }
            else {
                if (!currentSpacer) {
                    currentSpacer = this_1._createPage('spacer-' + itemIndex, null, itemIndex, 0);
                }
                currentSpacer.height = (currentSpacer.height || 0) + (pageBottom - pageTop) + 1;
                currentSpacer.itemCount += itemsPerPage;
            }
            pageTop += (pageBottom - pageTop + 1);
            if (isFirstRender) {
                return "break";
            }
        };
        var this_1 = this;
        for (var itemIndex = startIndex; itemIndex < endIndex; itemIndex += itemsPerPage) {
            var state_1 = _loop_1(itemIndex);
            if (state_1 === "break") break;
        }
        if (currentSpacer) {
            currentSpacer.key = 'spacer-end';
            pages.push(currentSpacer);
        }
        this._materializedRect = materializedRect;
        // console.log('materialized: ', materializedRect);
        return {
            pages: pages,
            measureVersion: this._measureVersion
        };
    };
    /**
     * Get the pixel height of a give page. Will use the props getPageHeight first, and if not provided, fallback to
     * cached height, or estimated page height, or default page height.
     */
    List.prototype._getPageHeight = function (itemIndex, itemsPerPage, visibleRect) {
        if (this.props.getPageHeight) {
            return this.props.getPageHeight(itemIndex, visibleRect);
        }
        else {
            var cachedHeight = (this._cachedPageHeights[itemIndex]);
            return cachedHeight ? cachedHeight.height : (this._estimatedPageHeight || DEFAULT_PAGE_HEIGHT);
        }
    };
    List.prototype._getItemCountForPage = function (itemIndex, visibileRect) {
        var itemsPerPage = this.props.getItemCountForPage ? this.props.getItemCountForPage(itemIndex, visibileRect) : DEFAULT_ITEMS_PER_PAGE;
        return itemsPerPage ? itemsPerPage : DEFAULT_ITEMS_PER_PAGE;
    };
    List.prototype._createPage = function (pageKey, items, startIndex, count, style) {
        pageKey = pageKey || ('page-' + startIndex);
        // Fill undefined cells because array.map will ignore undefined cells.
        if (items) {
            for (var i = 0; i < items.length; i++) {
                items[i] = items[i] || null;
            }
        }
        return {
            key: pageKey,
            startIndex: startIndex === undefined ? -1 : startIndex,
            itemCount: (count === undefined) ? (items ? items.length : 0) : count,
            items: items,
            style: style || {},
            top: 0,
            height: 0
        };
    };
    List.prototype._getRenderCount = function (props) {
        var _a = props || this.props, items = _a.items, startIndex = _a.startIndex, renderCount = _a.renderCount;
        return (renderCount === undefined ? (items ? items.length - startIndex : 0) : renderCount);
    };
    /** Calculate the visible rect within the list where top: 0 and left: 0 is the top/left of the list. */
    List.prototype._updateRenderRects = function (props, forceUpdate) {
        var _a = (props || this.props), renderedWindowsAhead = _a.renderedWindowsAhead, renderedWindowsBehind = _a.renderedWindowsBehind;
        var pages = this.state.pages;
        var renderCount = this._getRenderCount(props);
        var surfaceRect = this._surfaceRect;
        // WARNING: EXPENSIVE CALL! We need to know the surface top relative to the window.
        if (forceUpdate ||
            !pages ||
            !this._surfaceRect ||
            (pages.length > 0 && pages[0].items && pages[0].items.length < renderCount)) {
            surfaceRect = this._surfaceRect = _measureSurfaceRect(this.refs.surface);
        }
        // If the surface is above the container top or below the container bottom, or if this is not the first
        // render return empty rect.
        // The first time the list gets rendered we need to calculate the rectangle. The width of the list is
        // used to calculate the width of the list items.
        var visibleTop = Math.max(0, -surfaceRect.top);
        var visibleRect = {
            top: visibleTop,
            left: surfaceRect.left,
            bottom: visibleTop + window.innerHeight,
            right: surfaceRect.right,
            width: surfaceRect.width,
            height: window.innerHeight
        };
        // The required/allowed rects are adjusted versions of the visible rect.
        this._requiredRect = _expandRect(visibleRect, this._requiredWindowsBehind, this._requiredWindowsAhead);
        this._allowedRect = _expandRect(visibleRect, renderedWindowsBehind, renderedWindowsAhead);
    };
    List.defaultProps = {
        startIndex: 0,
        onRenderCell: function (item, index, containsFocus) { return (React.createElement("div", null, (item && item.name) || '')); },
        renderedWindowsAhead: DEFAULT_RENDERED_WINDOWS_AHEAD,
        renderedWindowsBehind: DEFAULT_RENDERED_WINDOWS_BEHIND
    };
    return List;
}(Utilities_1.BaseComponent));
exports.List = List;
function _expandRect(rect, pagesBefore, pagesAfter) {
    var top = rect.top - (pagesBefore * rect.height);
    var height = rect.height + ((pagesBefore + pagesAfter) * rect.height);
    return {
        top: top,
        bottom: top + height,
        height: height,
        left: rect.left,
        right: rect.right,
        width: rect.width
    };
}
function _isContainedWithin(innerRect, outerRect) {
    return (innerRect.top >= outerRect.top &&
        innerRect.left >= outerRect.left &&
        innerRect.bottom <= outerRect.bottom &&
        innerRect.right <= outerRect.right);
}
function _mergeRect(targetRect, newRect) {
    targetRect.top = (newRect.top < targetRect.top || targetRect.top === -1) ? newRect.top : targetRect.top;
    targetRect.left = (newRect.left < targetRect.left || targetRect.left === -1) ? newRect.left : targetRect.left;
    targetRect.bottom = (newRect.bottom > targetRect.bottom || targetRect.bottom === -1) ? newRect.bottom : targetRect.bottom;
    targetRect.right = (newRect.right > targetRect.right || targetRect.right === -1) ? newRect.right : targetRect.right;
    targetRect.width = targetRect.right - targetRect.left + 1;
    targetRect.height = targetRect.bottom - targetRect.top + 1;
    return targetRect;
}

//# sourceMappingURL=List.js.map
