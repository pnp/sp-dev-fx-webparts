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
var Utilities_1 = require('../../Utilities');
var SelectionLayout_1 = require('./SelectionLayout');
var interfaces_1 = require('./interfaces');
var focus_1 = require('../../utilities/focus');
// Selection definitions:
//
// Anchor index: the point from which a range selection starts.
// Focus index: the point from which layout movement originates from.
//
// These two can differ. Tests:
//
// If you start at index 5
// Shift click to index 10
//    The focus is 10, the anchor is 5.
// If you shift click at index 0
//    The anchor remains at 5, the items between 0 and 5 are selected and everything else is cleared.
// If you click index 8
//    The anchor and focus are set to 8.
var SELECTION_INDEX_ATTRIBUTE_NAME = 'data-selection-index';
var SELECTION_TOGGLE_ATTRIBUTE_NAME = 'data-selection-toggle';
var SELECTION_INVOKE_ATTRIBUTE_NAME = 'data-selection-invoke';
var SELECTALL_TOGGLE_ALL_ATTRIBUTE_NAME = 'data-selection-all-toggle';
var SelectionZone = (function (_super) {
    __extends(SelectionZone, _super);
    function SelectionZone() {
        _super.apply(this, arguments);
    }
    SelectionZone.prototype.componentDidMount = function () {
        var win = Utilities_1.getWindow(this.refs.root);
        // Track the latest modifier keys globally.
        this._events.on(win, 'keydown keyup', this._updateModifiers);
        this._events.on(win, 'click', this._tryClearOnEmptyClick);
    };
    SelectionZone.prototype.render = function () {
        return (React.createElement("div", __assign({className: 'ms-SelectionZone', ref: 'root', onKeyDown: this._onKeyDown, onMouseDown: this._onMouseDown, onClick: this._onClick, onDoubleClick: this._onDoubleClick}, {
            onMouseDownCapture: this.ignoreNextFocus,
            onFocusCapture: this._onFocus
        }), this.props.children));
    };
    /**
     * In some cases, the consuming scenario requires to set focus on a row without having SelectionZone
     * react to the event. Note that focus events in IE <= 11 will occur asynchronously after .focus() has
     * been called on an element, so we need a flag to store the idea that we will bypass the "next"
     * focus event that occurs. This method does that.
     */
    SelectionZone.prototype.ignoreNextFocus = function () {
        this._shouldIgnoreFocus = true;
    };
    /**
     * When we focus an item, for single/multi select scenarios, we should try to select it immediately
     * as long as the focus did not originate from a mouse down/touch event. For those cases, we handle them
     * specially.
     */
    SelectionZone.prototype._onFocus = function (ev) {
        var target = ev.target;
        var _a = this.props, selection = _a.selection, selectionMode = _a.selectionMode;
        var isToggleModifierPressed = this._isCtrlPressed || this._isMetaPressed;
        if (this._shouldIgnoreFocus || selectionMode === interfaces_1.SelectionMode.none) {
            this._shouldIgnoreFocus = false;
            return;
        }
        var isToggle = this._hasAttribute(target, SELECTION_TOGGLE_ATTRIBUTE_NAME);
        var itemRoot = this._findItemRoot(target);
        if (!isToggle && itemRoot) {
            var index = this._getItemIndex(itemRoot);
            if (isToggleModifierPressed) {
                // set anchor only.
                selection.setIndexSelected(index, selection.isIndexSelected(index), true);
            }
            else {
                this._onItemSurfaceClick(ev, index);
            }
        }
    };
    SelectionZone.prototype._onMouseDown = function (ev) {
        this._updateModifiers(ev);
        var target = ev.target;
        var itemRoot = this._findItemRoot(target);
        while (target !== this.refs.root) {
            if (this._hasAttribute(target, SELECTALL_TOGGLE_ALL_ATTRIBUTE_NAME)) {
                break;
            }
            else if (itemRoot) {
                if (this._hasAttribute(target, SELECTION_TOGGLE_ATTRIBUTE_NAME)) {
                    break;
                }
                else if (this._hasAttribute(target, SELECTION_INVOKE_ATTRIBUTE_NAME)) {
                    this._onInvokeMouseDown(ev, this._getItemIndex(itemRoot));
                    break;
                }
                else if (target === itemRoot) {
                    break;
                }
            }
            target = Utilities_1.getParent(target);
        }
    };
    SelectionZone.prototype._onClick = function (ev) {
        this._updateModifiers(ev);
        var target = ev.target;
        var itemRoot = this._findItemRoot(target);
        while (target !== this.refs.root) {
            if (this._hasAttribute(target, SELECTALL_TOGGLE_ALL_ATTRIBUTE_NAME)) {
                this._onToggleAllClick(ev);
                break;
            }
            else if (itemRoot) {
                var index = this._getItemIndex(itemRoot);
                if (this._hasAttribute(target, SELECTION_TOGGLE_ATTRIBUTE_NAME)) {
                    if (this._isShiftPressed) {
                        this._onItemSurfaceClick(ev, index);
                    }
                    else {
                        this._onToggleClick(ev, index);
                    }
                    break;
                }
                else if (this._hasAttribute(target, SELECTION_INVOKE_ATTRIBUTE_NAME)) {
                    this._onInvokeClick(ev, index);
                    break;
                }
                else if (target === itemRoot) {
                    this._onItemSurfaceClick(ev, index);
                    break;
                }
            }
            target = Utilities_1.getParent(target);
        }
    };
    /**
     * In multi selection, if you double click within an item's root (but not within the invoke element or input elements),
     * we should execute the invoke handler.
     */
    SelectionZone.prototype._onDoubleClick = function (ev) {
        var target = ev.target;
        var _a = this.props, selectionMode = _a.selectionMode, onItemInvoked = _a.onItemInvoked;
        var itemRoot = this._findItemRoot(target);
        if (itemRoot && onItemInvoked && selectionMode !== interfaces_1.SelectionMode.none && !this._isInputElement(target)) {
            var index = this._getItemIndex(itemRoot);
            while (target !== this.refs.root) {
                if (this._hasAttribute(target, SELECTION_TOGGLE_ATTRIBUTE_NAME) ||
                    this._hasAttribute(target, SELECTION_INVOKE_ATTRIBUTE_NAME)) {
                    break;
                }
                else if (target === itemRoot) {
                    this._onInvokeClick(ev, index);
                    break;
                }
                target = Utilities_1.getParent(target);
            }
            target = Utilities_1.getParent(target);
        }
    };
    SelectionZone.prototype._onKeyDown = function (ev) {
        this._updateModifiers(ev);
        var target = ev.target;
        var _a = this.props, selection = _a.selection, selectionMode = _a.selectionMode;
        var isSelectAllKey = ev.which === Utilities_1.KeyCodes.a && (this._isCtrlPressed || this._isMetaPressed);
        var isClearSelectionKey = ev.which === Utilities_1.KeyCodes.escape;
        // Ignore key downs from input elements.
        if (this._isInputElement(target)) {
            return;
        }
        // If ctrl-a is pressed, select all (if all are not already selected.)
        if (isSelectAllKey && selectionMode === interfaces_1.SelectionMode.multiple && !selection.isAllSelected()) {
            selection.setAllSelected(true);
            ev.stopPropagation();
            ev.preventDefault();
            return;
        }
        // If escape is pressed, clear selection (if any are selected.)
        if (isClearSelectionKey && selection.getSelectedCount() > 0) {
            selection.setAllSelected(false);
            ev.stopPropagation();
            ev.preventDefault();
            return;
        }
        var itemRoot = this._findItemRoot(target);
        // If a key was pressed within an item, we should treat "enters" as invokes and "space" as toggle
        if (itemRoot) {
            var index = this._getItemIndex(itemRoot);
            while (target !== this.refs.root) {
                if (this._hasAttribute(target, SELECTION_TOGGLE_ATTRIBUTE_NAME)) {
                    // For toggle elements, assuming they are rendered as buttons, they will generate a click event,
                    // so we can no-op for any keydowns in this case.
                    break;
                }
                else if (target === itemRoot) {
                    if (ev.which === Utilities_1.KeyCodes.enter) {
                        this._onInvokeClick(ev, index);
                    }
                    else if (ev.which === Utilities_1.KeyCodes.space) {
                        this._onToggleClick(ev, index);
                    }
                    break;
                }
                target = Utilities_1.getParent(target);
            }
        }
    };
    SelectionZone.prototype._onToggleAllClick = function (ev) {
        var _a = this.props, selection = _a.selection, selectionMode = _a.selectionMode;
        if (selectionMode === interfaces_1.SelectionMode.multiple) {
            selection.toggleAllSelected();
            ev.stopPropagation();
            ev.preventDefault();
        }
    };
    SelectionZone.prototype._onToggleClick = function (ev, index) {
        var _a = this.props, selection = _a.selection, selectionMode = _a.selectionMode;
        if (selectionMode === interfaces_1.SelectionMode.multiple) {
            selection.toggleIndexSelected(index);
        }
        else if (selectionMode === interfaces_1.SelectionMode.single) {
            var isSelected = selection.isIndexSelected(index);
            selection.setChangeEvents(false);
            selection.setAllSelected(false);
            selection.setIndexSelected(index, !isSelected, true);
            selection.setChangeEvents(true);
        }
        else {
            return;
        }
        ev.stopPropagation();
        // NOTE: ev.preventDefault is not called for toggle clicks, because this will kill the browser behavior
        // for checkboxes if you use a checkbox for the toggle.
    };
    SelectionZone.prototype._onInvokeClick = function (ev, index) {
        var _a = this.props, selection = _a.selection, onItemInvoked = _a.onItemInvoked;
        if (onItemInvoked) {
            onItemInvoked(selection.getItems()[index], index, ev.nativeEvent);
            ev.preventDefault();
            ev.stopPropagation();
        }
    };
    SelectionZone.prototype._onItemSurfaceClick = function (ev, index) {
        var _a = this.props, selection = _a.selection, selectionMode = _a.selectionMode;
        var isToggleModifierPressed = this._isCtrlPressed || this._isMetaPressed;
        if (selectionMode === interfaces_1.SelectionMode.multiple) {
            if (this._isShiftPressed) {
                selection.selectToIndex(index, !isToggleModifierPressed);
            }
            else if (isToggleModifierPressed) {
                selection.toggleIndexSelected(index);
            }
            else {
                this._clearAndSelectIndex(index);
            }
        }
        else if (selectionMode === interfaces_1.SelectionMode.single) {
            this._clearAndSelectIndex(index);
        }
    };
    SelectionZone.prototype._onInvokeMouseDown = function (ev, index) {
        var selection = this.props.selection;
        // Only do work if item is not selected.
        if (selection.isIndexSelected(index)) {
            return;
        }
        this._clearAndSelectIndex(index);
    };
    SelectionZone.prototype._tryClearOnEmptyClick = function (ev) {
        if (this._isNonHandledClick(ev.target)) {
            this.props.selection.setAllSelected(false);
        }
    };
    SelectionZone.prototype._clearAndSelectIndex = function (index) {
        var selection = this.props.selection;
        var isAlreadySingleSelected = selection.getSelectedCount() === 1 && selection.isIndexSelected(index);
        if (!isAlreadySingleSelected) {
            selection.setChangeEvents(false);
            selection.setAllSelected(false);
            selection.setIndexSelected(index, true, true);
            selection.setChangeEvents(true);
        }
    };
    /**
     * We need to track the modifier key states so that when focus events occur, which do not contain
     * modifier states in the Event object, we know how to behave.
     */
    SelectionZone.prototype._updateModifiers = function (ev) {
        this._isShiftPressed = ev.shiftKey;
        this._isCtrlPressed = ev.ctrlKey;
        this._isMetaPressed = ev.metaKey;
    };
    SelectionZone.prototype._findItemRoot = function (target) {
        var selection = this.props.selection;
        while (target !== this.refs.root) {
            var indexValue = target.getAttribute(SELECTION_INDEX_ATTRIBUTE_NAME);
            var index = Number(indexValue);
            if (indexValue !== null && index >= 0 && index < selection.getItems().length) {
                break;
            }
            target = Utilities_1.getParent(target);
        }
        if (target === this.refs.root) {
            return undefined;
        }
        return target;
    };
    SelectionZone.prototype._getItemIndex = function (itemRoot) {
        return Number(itemRoot.getAttribute(SELECTION_INDEX_ATTRIBUTE_NAME));
    };
    SelectionZone.prototype._hasAttribute = function (element, attributeName) {
        var isToggle = false;
        while (!isToggle && element !== this.refs.root) {
            isToggle = element.getAttribute(attributeName) === 'true';
            element = Utilities_1.getParent(element);
        }
        return isToggle;
    };
    SelectionZone.prototype._isInputElement = function (element) {
        return element.tagName === 'INPUT' || element.tagName === 'TEXTAREA';
    };
    SelectionZone.prototype._isNonHandledClick = function (element) {
        var doc = Utilities_1.getDocument();
        if (doc && element) {
            while (element !== doc.body) {
                if (focus_1.isElementTabbable(element)) {
                    return false;
                }
                element = Utilities_1.getParent(element);
            }
        }
        return true;
    };
    SelectionZone.defaultProps = {
        layout: new SelectionLayout_1.SelectionLayout(interfaces_1.SelectionDirection.vertical),
        isMultiSelectEnabled: true,
        isSelectedOnFocus: true,
        selectionMode: interfaces_1.SelectionMode.multiple
    };
    __decorate([
        Utilities_1.autobind
    ], SelectionZone.prototype, "ignoreNextFocus", null);
    __decorate([
        Utilities_1.autobind
    ], SelectionZone.prototype, "_onFocus", null);
    __decorate([
        Utilities_1.autobind
    ], SelectionZone.prototype, "_onMouseDown", null);
    __decorate([
        Utilities_1.autobind
    ], SelectionZone.prototype, "_onClick", null);
    __decorate([
        Utilities_1.autobind
    ], SelectionZone.prototype, "_onDoubleClick", null);
    __decorate([
        Utilities_1.autobind
    ], SelectionZone.prototype, "_onKeyDown", null);
    return SelectionZone;
}(Utilities_1.BaseComponent));
exports.SelectionZone = SelectionZone;

//# sourceMappingURL=SelectionZone.js.map
