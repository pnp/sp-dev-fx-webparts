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
var Button_1 = require('../../../Button');
var css_1 = require('../../../utilities/css');
var BaseComponent_1 = require('../../../common/BaseComponent');
var Spinner_1 = require('../../../Spinner');
require('./Suggestions.scss');
var SuggestionsItem = (function (_super) {
    __extends(SuggestionsItem, _super);
    function SuggestionsItem() {
        _super.apply(this, arguments);
    }
    SuggestionsItem.prototype.render = function () {
        var _a = this.props, suggestionModel = _a.suggestionModel, RenderSuggestion = _a.RenderSuggestion, onClick = _a.onClick, className = _a.className;
        return (React.createElement(Button_1.Button, {onClick: onClick, className: css_1.css('ms-Suggestions-item', { 'is-suggested': suggestionModel.selected }, className)}, 
            React.createElement(RenderSuggestion, __assign({}, suggestionModel.item))
        ));
    };
    return SuggestionsItem;
}(React.Component));
exports.SuggestionsItem = SuggestionsItem;
var Suggestions = (function (_super) {
    __extends(Suggestions, _super);
    function Suggestions(suggestionsProps) {
        _super.call(this, suggestionsProps);
        this.SuggestionsItemOfProperType = SuggestionsItem;
        this._getMoreResults = this._getMoreResults.bind(this);
    }
    Suggestions.prototype.componentDidUpdate = function () {
        this.scrollSelected();
    };
    Suggestions.prototype.render = function () {
        var _a = this.props, suggestionsHeaderText = _a.suggestionsHeaderText, searchForMoreText = _a.searchForMoreText, className = _a.className, moreSuggestionsAvailable = _a.moreSuggestionsAvailable, noResultsFoundText = _a.noResultsFoundText, suggestions = _a.suggestions, isLoading = _a.isLoading, loadingText = _a.loadingText;
        var noResults = noResultsFoundText ? React.createElement("div", {className: 'ms-Suggestions-none'}, noResultsFoundText) : null;
        return (React.createElement("div", {className: css_1.css('ms-Suggestions', className ? className : '')}, 
            suggestionsHeaderText ?
                (React.createElement("div", {className: 'ms-Suggestions-title'}, suggestionsHeaderText)) : (null), 
            isLoading && (React.createElement(Spinner_1.Spinner, {className: 'ms-Suggestions-spinner', label: loadingText})), 
            (!suggestions || !suggestions.length) && !isLoading ?
                noResults :
                this._renderSuggestions(), 
            searchForMoreText && moreSuggestionsAvailable ?
                (React.createElement(Button_1.Button, {onClick: this._getMoreResults.bind(this), className: 'ms-SearchMore-button', buttonType: Button_1.ButtonType.icon, icon: 'Search', ref: this._resolveRef('_searchForMoreButton')}, searchForMoreText)) : (null)));
    };
    Suggestions.prototype.focusSearchForMoreButton = function () {
        if (this._searchForMoreButton) {
            this._searchForMoreButton.focus();
        }
    };
    // TODO get the element to scroll into view properly regardless of direction.
    Suggestions.prototype.scrollSelected = function () {
        if (this._selectedElement) {
            this._selectedElement.scrollIntoView(false);
        }
    };
    Suggestions.prototype._renderSuggestions = function () {
        var _this = this;
        var _a = this.props, suggestions = _a.suggestions, onRenderSuggestion = _a.onRenderSuggestion, suggestionsItemClassName = _a.suggestionsItemClassName;
        var TypedSuggestionsItem = this.SuggestionsItemOfProperType;
        return (React.createElement("div", {className: 'ms-Suggestions-container', id: 'suggestion-list', role: 'menu'}, suggestions.map(function (suggestion, index) {
            return React.createElement("div", {ref: _this._resolveRef(suggestion.selected ? '_selectedElement' : ''), key: index, id: 'sug-' + index, role: 'menuitem'}, 
                React.createElement(TypedSuggestionsItem, {suggestionModel: suggestion, RenderSuggestion: onRenderSuggestion, onClick: function (ev) { return _this.props.onSuggestionClick(ev, suggestion.item, index); }, className: suggestionsItemClassName})
            );
        })));
    };
    Suggestions.prototype._getMoreResults = function () {
        if (this.props.onGetMoreResults) {
            this.props.onGetMoreResults();
        }
    };
    return Suggestions;
}(BaseComponent_1.BaseComponent));
exports.Suggestions = Suggestions;

//# sourceMappingURL=Suggestions.js.map
