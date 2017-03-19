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
require('./SearchBox.scss');
var SearchBox = (function (_super) {
    __extends(SearchBox, _super);
    function SearchBox(props) {
        _super.call(this, props);
        // Handle deprecated prop
        if (this.props.onChanged) {
            this.props.onChange = this.props.onChanged;
        }
        this.state = {
            value: props.value || '',
            hasFocus: false,
            id: Utilities_1.getId('SearchBox')
        };
    }
    SearchBox.prototype.componentWillReceiveProps = function (newProps) {
        if (newProps.value !== undefined) {
            this.setState({
                value: newProps.value
            });
        }
    };
    SearchBox.prototype.render = function () {
        var _a = this.props, labelText = _a.labelText, className = _a.className;
        var _b = this.state, value = _b.value, hasFocus = _b.hasFocus, id = _b.id;
        return (React.createElement("div", __assign({ref: this._resolveRef('_rootElement'), className: Utilities_1.css('ms-SearchBox', className, {
            'is-active': hasFocus,
            'can-clear': value.length > 0
        })}, { onFocusCapture: this._onFocusCapture }), 
            React.createElement("i", {className: 'ms-SearchBox-icon ms-Icon ms-Icon--Search'}), 
            React.createElement("input", {id: id, className: 'ms-SearchBox-field', placeholder: labelText, onChange: this._onInputChange, onKeyDown: this._onKeyDown, value: value, ref: this._resolveRef('_inputElement')}), 
            React.createElement("div", {className: 'ms-SearchBox-clearButton', onClick: this._onClearClick}, 
                React.createElement("i", {className: 'ms-Icon ms-Icon--Clear'})
            )));
    };
    SearchBox.prototype._onClearClick = function (ev) {
        this.setState({
            value: ''
        });
        this._callOnChange('');
        ev.stopPropagation();
        ev.preventDefault();
        this._inputElement.focus();
    };
    SearchBox.prototype._onFocusCapture = function (ev) {
        this.setState({
            hasFocus: true
        });
        this._events.on(Utilities_1.getDocument().body, 'focus', this._handleDocumentFocus, true);
    };
    SearchBox.prototype._onKeyDown = function (ev) {
        switch (ev.which) {
            case Utilities_1.KeyCodes.escape:
                this._onClearClick(ev);
                break;
            case Utilities_1.KeyCodes.enter:
                if (this.props.onSearch && this.state.value.length > 0) {
                    this.props.onSearch(this.state.value);
                }
                break;
            default:
                return;
        }
        // We only get here if the keypress has been handled.
        ev.preventDefault();
        ev.stopPropagation();
    };
    SearchBox.prototype._onInputChange = function (ev) {
        this.setState({
            value: this._inputElement.value
        });
        this._callOnChange(this._inputElement.value);
    };
    SearchBox.prototype._handleDocumentFocus = function (ev) {
        if (!Utilities_1.elementContains(this._rootElement, ev.target)) {
            this._events.off(Utilities_1.getDocument().body, 'focus');
            this.setState({
                hasFocus: false
            });
        }
    };
    SearchBox.prototype._callOnChange = function (newValue) {
        var onChange = this.props.onChange;
        if (onChange) {
            onChange(newValue);
        }
    };
    SearchBox.defaultProps = {
        labelText: 'Search',
    };
    __decorate([
        Utilities_1.autobind
    ], SearchBox.prototype, "_onClearClick", null);
    __decorate([
        Utilities_1.autobind
    ], SearchBox.prototype, "_onFocusCapture", null);
    __decorate([
        Utilities_1.autobind
    ], SearchBox.prototype, "_onKeyDown", null);
    __decorate([
        Utilities_1.autobind
    ], SearchBox.prototype, "_onInputChange", null);
    return SearchBox;
}(Utilities_1.BaseComponent));
exports.SearchBox = SearchBox;

//# sourceMappingURL=SearchBox.js.map
