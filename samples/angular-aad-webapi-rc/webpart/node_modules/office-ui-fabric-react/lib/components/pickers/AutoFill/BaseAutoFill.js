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
var BaseComponent_1 = require('../../../common/BaseComponent');
var properties_1 = require('../../../utilities/properties');
var autobind_1 = require('../../../utilities/autobind');
var KeyCodes_1 = require('../../../utilities/KeyCodes');
var SELECTION_FORWARD = 'forward';
var SELECTION_BACKWARD = 'backward';
var BaseAutoFill = (function (_super) {
    __extends(BaseAutoFill, _super);
    function BaseAutoFill(props) {
        _super.call(this, props);
        this.state = {
            value: ''
        };
    }
    Object.defineProperty(BaseAutoFill.prototype, "cursorLocation", {
        get: function () {
            if (this._inputElement) {
                var inputElement = this._inputElement;
                if (inputElement.selectionDirection !== SELECTION_FORWARD) {
                    return inputElement.selectionEnd;
                }
                else {
                    return inputElement.selectionStart;
                }
            }
            else {
                return -1;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseAutoFill.prototype, "isValueSelected", {
        get: function () {
            return this.inputElement.selectionStart !== this.inputElement.selectionEnd;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseAutoFill.prototype, "value", {
        get: function () {
            return this.state.value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseAutoFill.prototype, "selectionStart", {
        get: function () {
            return this._inputElement ? this._inputElement.selectionStart : -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseAutoFill.prototype, "selectionEnd", {
        get: function () {
            return this._inputElement ? this._inputElement.selectionEnd : -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseAutoFill.prototype, "inputElement", {
        get: function () {
            return this._inputElement;
        },
        enumerable: true,
        configurable: true
    });
    BaseAutoFill.prototype.componentDidUpdate = function () {
        var value = this.state.value;
        var suggestedDisplayValue = this.props.suggestedDisplayValue;
        var differenceIndex = 0;
        if (value && suggestedDisplayValue && this._doesTextStartWith(suggestedDisplayValue, value)) {
            while (differenceIndex < value.length && value[differenceIndex].toLocaleLowerCase() === suggestedDisplayValue[differenceIndex].toLocaleLowerCase()) {
                differenceIndex++;
            }
            if (differenceIndex > 0) {
                this._inputElement.setSelectionRange(differenceIndex, suggestedDisplayValue.length, SELECTION_BACKWARD);
            }
        }
    };
    BaseAutoFill.prototype.render = function () {
        var value = this.state.value;
        var suggestedDisplayValue = this.props.suggestedDisplayValue;
        var displayValue = value;
        if (this._doesTextStartWith(suggestedDisplayValue, value)) {
            displayValue = suggestedDisplayValue;
        }
        var nativeProps = properties_1.getNativeProps(this.props, properties_1.inputProperties);
        return React.createElement("input", __assign({}, nativeProps, {ref: this._resolveRef('_inputElement'), value: displayValue, autoCapitalize: 'off', autoComplete: 'off', onChange: this._onChange, onKeyDown: this._onKeyDown}));
    };
    BaseAutoFill.prototype.focus = function () {
        this._inputElement.focus();
    };
    BaseAutoFill.prototype.clear = function () {
        this._updateValue('');
    };
    BaseAutoFill.prototype._onKeyDown = function (ev) {
        switch (ev.which) {
            case KeyCodes_1.KeyCodes.backspace:
                this._handleBackspace(ev);
                break;
        }
    };
    BaseAutoFill.prototype._handleBackspace = function (ev) {
        var value = this.state.value;
        if (value && value.length > 0) {
            this._updateValue(value.substring(0, value.length - 1));
            // Since this effectively deletes a letter from the string we need to preventDefault so that
            // the backspace doesn't try to delete a letter that's already been deleted. If a letter is deleted
            // it can trigger the onChange event again which can have unintended consequences.
            ev.preventDefault();
        }
    };
    BaseAutoFill.prototype._onChange = function (ev) {
        var value = ev.target.value;
        this._updateValue(value);
    };
    BaseAutoFill.prototype._notifyInputChange = function (newValue) {
        if (this.props.onInputValueChange) {
            this.props.onInputValueChange(newValue);
        }
    };
    BaseAutoFill.prototype._updateValue = function (newValue) {
        var _this = this;
        this.setState({
            value: newValue
        }, function () { return _this._notifyInputChange(newValue); });
    };
    BaseAutoFill.prototype._doesTextStartWith = function (text, startWith) {
        if (!text || !startWith) {
            return false;
        }
        return text.toLocaleLowerCase().indexOf(startWith.toLocaleLowerCase()) === 0;
    };
    __decorate([
        autobind_1.autobind
    ], BaseAutoFill.prototype, "_onKeyDown", null);
    __decorate([
        autobind_1.autobind
    ], BaseAutoFill.prototype, "_onChange", null);
    return BaseAutoFill;
}(BaseComponent_1.BaseComponent));
exports.BaseAutoFill = BaseAutoFill;

//# sourceMappingURL=BaseAutoFill.js.map
