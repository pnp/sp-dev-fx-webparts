"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var Image_1 = require('../../Image');
var css_1 = require('../../utilities/css');
var object_1 = require('../../utilities/object');
require('./ChoiceGroup.scss');
var ChoiceGroup = (function (_super) {
    __extends(ChoiceGroup, _super);
    function ChoiceGroup(props) {
        _super.call(this);
        this.state = {
            keyChecked: this._getKeyChecked(props.options),
            keyFocused: undefined
        };
        this._id = object_1.getId('ChoiceGroup');
        this._descriptionId = object_1.getId('ChoiceGroupDescription');
    }
    ChoiceGroup.prototype.componentWillReceiveProps = function (newProps) {
        var newKeyChecked = this._getKeyChecked(newProps.options);
        var oldKeyCheched = this._getKeyChecked(this.props.options);
        if (newKeyChecked !== oldKeyCheched) {
            this.setState({
                keyChecked: newKeyChecked,
            });
        }
    };
    ChoiceGroup.prototype.render = function () {
        var _this = this;
        var _a = this.props, label = _a.label, options = _a.options, className = _a.className, required = _a.required;
        var _b = this.state, keyChecked = _b.keyChecked, keyFocused = _b.keyFocused;
        var titleClassName = css_1.css('ms-Label', className, {
            'is-required': required
        });
        return (
        // Need to assign role application on containing div because JAWS doesnt call OnKeyDown without this role
        React.createElement("div", {role: 'application', className: className}, 
            React.createElement("div", {className: 'ms-ChoiceFieldGroup', role: 'radiogroup', "aria-labelledby": this.props.label ? this._id + '-label' : ''}, 
                React.createElement("div", {className: 'ms-ChoiceFieldGroup-title'}, this.props.label ? React.createElement("label", {className: titleClassName, id: this._id + '-label'}, label) : null), 
                options.map(function (option) { return (React.createElement("div", {key: option.key, className: css_1.css('ms-ChoiceField', {
                    'ms-ChoiceField--image': !!option.imageSrc,
                    'is-inFocus': option.key === keyFocused
                })}, 
                    React.createElement("input", {ref: function (c) { return _this._inputElement = c; }, id: _this._id + "-" + option.key, className: 'ms-ChoiceField-input', type: 'radio', name: _this._id, disabled: option.isDisabled || option.disabled || _this.props.disabled, checked: option.key === keyChecked, onChange: _this._onChange.bind(_this, option), onFocus: _this._onFocus.bind(_this, option), onBlur: _this._onBlur.bind(_this, option), "aria-describedby": _this._descriptionId + "-" + option.key}), 
                    _this._renderField(option))); }))
        ));
    };
    ChoiceGroup.prototype.focus = function () {
        if (this._inputElement) {
            this._inputElement.focus();
        }
    };
    ChoiceGroup.prototype._onFocus = function (option, ev) {
        this.setState({
            keyFocused: option.key,
            keyChecked: this.state.keyChecked
        });
    };
    ChoiceGroup.prototype._onBlur = function (option, ev) {
        this.setState({
            keyFocused: undefined,
            keyChecked: this.state.keyChecked
        });
    };
    ChoiceGroup.prototype._renderField = function (option) {
        var keyChecked = this.state.keyChecked;
        var isDisabled = option.isDisabled || option.disabled || this.props.disabled;
        return (React.createElement("label", {htmlFor: this._id + '-' + option.key, className: css_1.css({
            'ms-ChoiceField-field--image': !!option.imageSrc,
            'ms-ChoiceField-field': !option.imageSrc,
            'is-checked': option.key === keyChecked,
            'is-disabled': isDisabled
        })}, 
            option.imageSrc
                ? React.createElement("div", {className: 'ms-ChoiceField-innerField'}, 
                    React.createElement("div", {className: css_1.css('ms-ChoiceField-imageWrapper', { 'is-hidden': option.key === keyChecked })}, 
                        React.createElement(Image_1.Image, {src: option.imageSrc, width: option.imageSize.width, height: option.imageSize.height})
                    ), 
                    React.createElement("div", {className: css_1.css('ms-ChoiceField-imageWrapper', { 'is-hidden': option.key !== keyChecked })}, 
                        React.createElement(Image_1.Image, {src: option.selectedImageSrc, width: option.imageSize.width, height: option.imageSize.height})
                    ))
                : null, 
            option.imageSrc
                ? React.createElement("div", {className: 'ms-ChoiceField-labelWrapper'}, 
                    React.createElement("i", {className: 'ms-ChoiceField-icon ms-Icon ms-Icon--CheckMark'}), 
                    React.createElement("span", {id: this._descriptionId + "-" + option.key, className: 'ms-Label'}, option.text))
                : React.createElement("span", {id: this._descriptionId + "-" + option.key, className: 'ms-Label'}, option.text)));
    };
    ChoiceGroup.prototype._onChange = function (option, evt) {
        var onChanged = this.props.onChanged;
        this.setState({
            keyChecked: option.key
        });
        if (onChanged) {
            onChanged(option);
        }
    };
    /**
     * If all the isChecked property of options are falsy values, return undefined;
     * Else return the key of the first option with the truthy isChecked property.
     */
    ChoiceGroup.prototype._getKeyChecked = function (options) {
        var optionsChecked = options.filter(function (option) {
            return option.isChecked || option.checked;
        });
        if (optionsChecked.length === 0) {
            return undefined;
        }
        else {
            return optionsChecked[0].key;
        }
    };
    ChoiceGroup.defaultProps = {
        options: []
    };
    return ChoiceGroup;
}(React.Component));
exports.ChoiceGroup = ChoiceGroup;

//# sourceMappingURL=ChoiceGroup.js.map
