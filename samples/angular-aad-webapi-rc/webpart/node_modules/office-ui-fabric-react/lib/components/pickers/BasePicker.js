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
var FocusZone_1 = require('../../FocusZone');
var Callout_1 = require('../../Callout');
var index_1 = require('../../utilities/selection/index');
var Suggestions_1 = require('./Suggestions/Suggestions');
var SuggestionsController_1 = require('./Suggestions/SuggestionsController');
var BaseAutoFill_1 = require('./AutoFill/BaseAutoFill');
var BaseComponent_1 = require('../../common/BaseComponent');
var Utilities_1 = require('../../Utilities');
require('./BasePicker.scss');
var BasePicker = (function (_super) {
    __extends(BasePicker, _super);
    function BasePicker(basePickerProps) {
        var _this = this;
        _super.call(this, basePickerProps);
        this.SuggestionOfProperType = Suggestions_1.Suggestions;
        var items = basePickerProps.defaultSelectedItems || [];
        this.suggestionStore = new SuggestionsController_1.SuggestionsController();
        this.selection = new index_1.Selection({ onSelectionChanged: function () { return _this.onSelectionChange(); } });
        this.selection.setItems(items);
        this.state = {
            items: items,
            suggestedDisplayValue: '',
            moreSuggestionsAvailable: false
        };
    }
    BasePicker.prototype.componentWillReceiveProps = function (newProps, newState) {
        if (newState.items && newState.items !== this.state.items) {
            this.selection.setItems(newState.items);
        }
    };
    BasePicker.prototype.componentDidMount = function () {
        this.selection.setItems(this.state.items);
    };
    BasePicker.prototype.focus = function () {
        this.focusZone.focus();
    };
    BasePicker.prototype.dismissSuggestions = function () {
        this.setState({ suggestionsVisible: false });
    };
    BasePicker.prototype.completeSuggestion = function () {
        if (this.suggestionStore.hasSelectedSuggestion()) {
            this.addItem(this.suggestionStore.currentSuggestion.item);
            this.updateValue('');
            this.input.clear();
        }
    };
    BasePicker.prototype.render = function () {
        var suggestedDisplayValue = this.state.suggestedDisplayValue;
        var _a = this.props, className = _a.className, inputProps = _a.inputProps;
        return (React.createElement("div", {ref: this._resolveRef('root'), className: Utilities_1.css('ms-BasePicker', className ? className : ''), onKeyDown: this.onKeyDown}, 
            React.createElement(index_1.SelectionZone, {selection: this.selection, selectionMode: index_1.SelectionMode.multiple}, 
                React.createElement(FocusZone_1.FocusZone, {ref: this._resolveRef('focusZone'), className: 'ms-BasePicker-text'}, 
                    this.renderItems(), 
                    React.createElement(BaseAutoFill_1.BaseAutoFill, __assign({}, inputProps, {className: 'ms-BasePicker-input', ref: this._resolveRef('input'), onFocus: this.onInputFocus, onInputValueChange: this.onInputChange, suggestedDisplayValue: suggestedDisplayValue, "aria-activedescendant": 'sug-' + this.suggestionStore.currentIndex, "aria-owns": 'suggestion-list', "aria-expanded": 'true', "aria-haspopup": 'true', autoCapitalize: 'off', autoComplete: 'off', role: 'combobox'})))
            ), 
            this.renderSuggestions()));
    };
    BasePicker.prototype.renderSuggestions = function () {
        var TypedSuggestion = this.SuggestionOfProperType;
        return this.state.suggestionsVisible ? (React.createElement(Callout_1.Callout, {isBeakVisible: false, gapSpace: 0, targetElement: this.root, onDismiss: this.dismissSuggestions, directionalHint: Utilities_1.getRTL() ? Callout_1.DirectionalHint.bottomRightEdge : Callout_1.DirectionalHint.bottomLeftEdge}, 
            React.createElement(TypedSuggestion, __assign({onRenderSuggestion: this.props.onRenderSuggestionsItem, onSuggestionClick: this.onSuggestionClick, suggestions: this.suggestionStore.getSuggestions(), ref: this._resolveRef('suggestionElement'), onGetMoreResults: this.onGetMoreResults, moreSuggestionsAvailable: this.state.moreSuggestionsAvailable, isLoading: this.state.suggestionsLoading}, this.props.pickerSuggestionsProps))
        )) : (null);
    };
    BasePicker.prototype.renderItems = function () {
        var _this = this;
        var onRenderItem = this.props.onRenderItem;
        var items = this.state.items;
        return items.map(function (item, index) { return onRenderItem({
            item: item,
            index: index,
            key: index + _this._getTextFromItem(item),
            selected: _this.selection.isIndexSelected(index),
            onRemoveItem: function () { return _this.removeItem(item); }
        }); });
    };
    BasePicker.prototype.resetFocus = function (index) {
        var items = this.state.items;
        if (items.length) {
            var newEl = this.root.querySelectorAll('[data-selection-index]')[Math.min(index, items.length - 1)];
            if (newEl) {
                this.focusZone.focusElement(newEl);
            }
        }
        else {
            this.input.focus();
        }
    };
    BasePicker.prototype.onSuggestionSelect = function () {
        if (this.suggestionStore.currentSuggestion) {
            var currentValue = this.input.value;
            var itemValue = this._getTextFromItem(this.suggestionStore.currentSuggestion.item, currentValue);
            this.setState({ suggestedDisplayValue: itemValue });
        }
    };
    BasePicker.prototype.onSelectionChange = function () {
        this.forceUpdate();
    };
    BasePicker.prototype.updateSuggestions = function (suggestions) {
        this.suggestionStore.updateSuggestions(suggestions);
        this.forceUpdate();
    };
    BasePicker.prototype.updateValue = function (updatedValue) {
        var _this = this;
        var suggestions = this.props.onResolveSuggestions(updatedValue, this.state.items);
        var suggestionsArray = suggestions;
        var suggestionsPromiseLike = suggestions;
        // Check to see if the returned value is an array, if it is then just pass it into the next function.
        // If the returned value is not an array then check to see if it's a promise or PromiseLike. If it is then resolve it asynchronously.
        if (Array.isArray(suggestionsArray)) {
            this.resolveNewValue(updatedValue, suggestionsArray);
        }
        else if (suggestionsPromiseLike.then) {
            if (!this.loadingTimer) {
                this.loadingTimer = this._async.setTimeout(function () { return _this.setState({
                    suggestionsLoading: true
                }); }, 500);
            }
            this.setState({
                suggestionsVisible: this.input.value !== '' && this.input.inputElement === document.activeElement
            });
            // Ensure that the promise will only use the callback if it was the most recent one.
            var promise_1 = this.currentPromise = suggestionsPromiseLike;
            promise_1.then(function (newSuggestions) {
                if (promise_1 === _this.currentPromise) {
                    _this.resolveNewValue(updatedValue, newSuggestions);
                    if (_this.loadingTimer) {
                        _this._async.clearTimeout(_this.loadingTimer);
                        _this.loadingTimer = undefined;
                    }
                }
            });
        }
    };
    BasePicker.prototype.resolveNewValue = function (updatedValue, suggestions) {
        this.suggestionStore.updateSuggestions(suggestions);
        var itemValue = undefined;
        if (this.suggestionStore.currentSuggestion) {
            itemValue = this._getTextFromItem(this.suggestionStore.currentSuggestion.item, updatedValue);
        }
        this.setState({
            suggestionsLoading: false,
            suggestedDisplayValue: itemValue,
            suggestionsVisible: this.input.value !== '' && this.input.inputElement === document.activeElement
        });
    };
    BasePicker.prototype.onChange = function () {
        if (this.props.onChange) {
            this.props.onChange(this.state.items);
        }
    };
    BasePicker.prototype.onInputChange = function (value) {
        this.updateValue(value);
        this.setState({ moreSuggestionsAvailable: true });
    };
    BasePicker.prototype.onSuggestionClick = function (ev, item, index) {
        this.addItemByIndex(index);
    };
    BasePicker.prototype.onInputFocus = function (ev) {
        this.selection.setAllSelected(false);
        if (this.input.value) {
            this.setState({ suggestionsVisible: true });
        }
    };
    BasePicker.prototype.onKeyDown = function (ev) {
        var value = this.input.value;
        switch (ev.which) {
            case Utilities_1.KeyCodes.escape:
                this.dismissSuggestions();
                break;
            case Utilities_1.KeyCodes.tab:
            case Utilities_1.KeyCodes.enter:
                if (value && this.suggestionStore.hasSelectedSuggestion()) {
                    this.completeSuggestion();
                    ev.preventDefault();
                    ev.stopPropagation();
                }
                break;
            case Utilities_1.KeyCodes.backspace:
                this.onBackspace(ev);
                break;
            case Utilities_1.KeyCodes.up:
                if (ev.target === this.input.inputElement && this.suggestionStore.previousSuggestion()) {
                    ev.preventDefault();
                    ev.stopPropagation();
                    this.onSuggestionSelect();
                }
                break;
            case Utilities_1.KeyCodes.down:
                if (ev.target === this.input.inputElement) {
                    if (this.suggestionStore.nextSuggestion()) {
                        ev.preventDefault();
                        ev.stopPropagation();
                        this.onSuggestionSelect();
                    }
                }
                break;
        }
    };
    BasePicker.prototype.onGetMoreResults = function () {
        var _this = this;
        if (this.props.onGetMoreResults) {
            var suggestions = this.props.onGetMoreResults(this.input.value, this.state.items);
            var suggestionsArray = suggestions;
            var suggestionsPromiseLike = suggestions;
            if (Array.isArray(suggestionsArray)) {
                this.updateSuggestions(suggestionsArray);
            }
            else if (suggestionsPromiseLike.then) {
                suggestionsPromiseLike.then(function (newSuggestions) { return _this.updateSuggestions(newSuggestions); });
            }
        }
        this.input.focus();
        this.setState({ moreSuggestionsAvailable: false });
    };
    BasePicker.prototype.addItemByIndex = function (index) {
        this.addItem(this.suggestionStore.getSuggestionAtIndex(index).item);
        this.input.clear();
        this.updateValue('');
    };
    BasePicker.prototype.addItem = function (item) {
        var _this = this;
        var newItems = this.state.items.concat([item]);
        this.selection.setItems(newItems);
        this.setState({ items: newItems }, function () { return _this.onChange(); });
    };
    BasePicker.prototype.removeItem = function (item) {
        var _this = this;
        var items = this.state.items;
        var index = items.indexOf(item);
        if (index >= 0) {
            var newItems = items.slice(0, index).concat(items.slice(index + 1));
            this.selection.setItems(newItems);
            this.setState({ items: newItems }, function () { return _this.onChange(); });
        }
    };
    BasePicker.prototype.removeItems = function (itemsToRemove) {
        var _this = this;
        var items = this.state.items;
        var newItems = items.filter(function (item) { return itemsToRemove.indexOf(item) === -1; });
        var firstItemToRemove = this.selection.getSelection()[0];
        var index = items.indexOf(firstItemToRemove);
        this.selection.setItems(newItems);
        this.setState({ items: newItems }, function () { return _this.resetFocus(index); });
    };
    // This is protected because we may expect the backspace key to work differently in a different kind of picker.
    // This lets the subclass override it and provide it's own onBackspace. For an example see the BasePickerListBelow
    BasePicker.prototype.onBackspace = function (ev) {
        if (this.state.items.length && !this.input.isValueSelected && this.input.cursorLocation === 0) {
            this.removeItem(this.state.items[this.state.items.length - 1]);
        }
        else if (this.selection.getSelectedCount() > 0) {
            this.removeItems(this.selection.getSelection());
        }
    };
    BasePicker.prototype._getTextFromItem = function (item, currentValue) {
        if (this.props.getTextFromItem) {
            return this.props.getTextFromItem(item, currentValue);
        }
        else {
            return '';
        }
    };
    __decorate([
        Utilities_1.autobind
    ], BasePicker.prototype, "dismissSuggestions", null);
    __decorate([
        Utilities_1.autobind
    ], BasePicker.prototype, "onInputChange", null);
    __decorate([
        Utilities_1.autobind
    ], BasePicker.prototype, "onSuggestionClick", null);
    __decorate([
        Utilities_1.autobind
    ], BasePicker.prototype, "onInputFocus", null);
    __decorate([
        Utilities_1.autobind
    ], BasePicker.prototype, "onKeyDown", null);
    __decorate([
        Utilities_1.autobind
    ], BasePicker.prototype, "onGetMoreResults", null);
    __decorate([
        Utilities_1.autobind
    ], BasePicker.prototype, "addItemByIndex", null);
    __decorate([
        Utilities_1.autobind
    ], BasePicker.prototype, "addItem", null);
    __decorate([
        Utilities_1.autobind
    ], BasePicker.prototype, "removeItem", null);
    __decorate([
        Utilities_1.autobind
    ], BasePicker.prototype, "removeItems", null);
    return BasePicker;
}(BaseComponent_1.BaseComponent));
exports.BasePicker = BasePicker;
var BasePickerListBelow = (function (_super) {
    __extends(BasePickerListBelow, _super);
    function BasePickerListBelow() {
        _super.apply(this, arguments);
    }
    BasePickerListBelow.prototype.render = function () {
        var suggestedDisplayValue = this.state.suggestedDisplayValue;
        var _a = this.props, className = _a.className, inputProps = _a.inputProps;
        return (React.createElement("div", null, 
            React.createElement("div", {ref: this._resolveRef('root'), className: Utilities_1.css('ms-BasePicker', className ? className : ''), onKeyDown: this.onKeyDown}, 
                React.createElement(index_1.SelectionZone, {selection: this.selection, selectionMode: index_1.SelectionMode.multiple}, 
                    React.createElement("div", {className: 'ms-BasePicker-text'}, 
                        React.createElement(BaseAutoFill_1.BaseAutoFill, __assign({}, inputProps, {className: 'ms-BasePicker-input', ref: this._resolveRef('input'), onFocus: this.onInputFocus, onInputValueChange: this.onInputChange, suggestedDisplayValue: suggestedDisplayValue, "aria-activedescendant": 'sug-' + this.suggestionStore.currentIndex, "aria-owns": 'suggestion-list', "aria-expanded": 'true', "aria-haspopup": 'true', autoCapitalize: 'off', autoComplete: 'off', role: 'combobox'}))
                    )
                )
            ), 
            this.renderSuggestions(), 
            React.createElement(FocusZone_1.FocusZone, {ref: this._resolveRef('focusZone'), className: 'ms-BasePicker-selectedItems'}, this.renderItems())));
    };
    BasePickerListBelow.prototype.onBackspace = function (ev) {
        // override the existing backspace method to not do anything because the list items appear below.
    };
    return BasePickerListBelow;
}(BasePicker));
exports.BasePickerListBelow = BasePickerListBelow;

//# sourceMappingURL=BasePicker.js.map
