"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var css_1 = require('../../utilities/css');
var object_1 = require('../../utilities/object');
var Button_Props_1 = require('./Button.Props');
var object_2 = require('../../utilities/object');
var properties_1 = require('../../utilities/properties');
var BaseComponent_1 = require('../../common/BaseComponent');
require('./Button.scss');
var Button = (function (_super) {
    __extends(Button, _super);
    function Button(props) {
        _super.call(this, props, { 'rootProps': null });
        this.state = {
            labelId: object_2.getId('Button'),
            descriptionId: object_2.getId('Button'),
            ariaDescriptionId: object_2.getId('Button')
        };
    }
    Button.prototype.render = function () {
        var _this = this;
        var _a = this.props, buttonType = _a.buttonType, children = _a.children, icon = _a.icon, description = _a.description, ariaLabel = _a.ariaLabel, ariaDescription = _a.ariaDescription, href = _a.href, disabled = _a.disabled, onClick = _a.onClick;
        var _b = this.state, labelId = _b.labelId, descriptionId = _b.descriptionId, ariaDescriptionId = _b.ariaDescriptionId;
        var renderAsAnchor = !!href;
        var tag = renderAsAnchor ? 'a' : 'button';
        var nativeProps = properties_1.getNativeProps(this.props.rootProps || this.props, renderAsAnchor ? properties_1.anchorProperties : properties_1.buttonProperties);
        var className = css_1.css((this.props.className), 'ms-Button', {
            'ms-Button--primary': buttonType === Button_Props_1.ButtonType.primary,
            'ms-Button--hero': buttonType === Button_Props_1.ButtonType.hero,
            'ms-Button--compound': buttonType === Button_Props_1.ButtonType.compound,
            'ms-Button--command': buttonType === Button_Props_1.ButtonType.command,
            'ms-Button--icon': buttonType === Button_Props_1.ButtonType.icon,
            'disabled': (renderAsAnchor && disabled) // add disable styling if it is an anchor
        });
        var iconSpan = icon && (buttonType === Button_Props_1.ButtonType.command || buttonType === Button_Props_1.ButtonType.hero || buttonType === Button_Props_1.ButtonType.icon)
            ? React.createElement("span", {className: 'ms-Button-icon'}, 
                React.createElement("i", {className: "ms-Icon ms-Icon--" + icon})
            )
            : null;
        // ms-Button-description is only shown when the button type is compound.
        // In other cases it will not be displayed.
        var descriptionSpan = description
            ? React.createElement("span", {className: 'ms-Button-description', id: descriptionId}, description)
            : null;
        // If ariaDescription is given, descriptionId will be assigned to ariaDescriptionSpan,
        // otherwise it will be assigned to descriptionSpan.
        var ariaDescriptionSpan = ariaDescription
            ? React.createElement("span", {className: 'ms-u-screenReaderOnly', id: ariaDescriptionId}, ariaDescription)
            : null;
        // Check for ariaDescription, description or aria-describedby in the native props to determine source of aria-describedby
        // otherwise default to null.
        var ariaDescribedBy;
        if (ariaDescription) {
            ariaDescribedBy = ariaDescriptionId;
        }
        else if (description) {
            ariaDescribedBy = descriptionId;
        }
        else if (nativeProps['aria-describedby']) {
            ariaDescribedBy = nativeProps['aria-describedby'];
        }
        else {
            ariaDescribedBy = null;
        }
        return React.createElement(tag, object_1.assign({}, nativeProps, href ? { href: href } : null, {
            'aria-label': ariaLabel,
            'aria-labelledby': ariaLabel ? null : labelId,
            'aria-describedby': ariaDescribedBy,
            'ref': function (c) { return _this._buttonElement = c; }
        }, onClick && { 'onClick': onClick }, disabled && { 'disabled': disabled }, { className: className }), iconSpan, React.createElement("span", {className: 'ms-Button-label', id: labelId}, children), descriptionSpan, ariaDescriptionSpan);
    };
    Button.prototype.focus = function () {
        if (this._buttonElement) {
            this._buttonElement.focus();
        }
    };
    Button.defaultProps = {
        buttonType: Button_Props_1.ButtonType.normal
    };
    return Button;
}(BaseComponent_1.BaseComponent));
exports.Button = Button;

//# sourceMappingURL=Button.js.map
