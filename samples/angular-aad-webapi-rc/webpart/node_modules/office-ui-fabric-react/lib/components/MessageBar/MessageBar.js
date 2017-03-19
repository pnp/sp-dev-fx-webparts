"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var Button_1 = require('../../Button');
require('./MessageBar.scss');
var css_1 = require('../../utilities/css');
var MessageBar_Props_1 = require('./MessageBar.Props');
var object_1 = require('../../utilities/object');
var MessageBar = (function (_super) {
    __extends(MessageBar, _super);
    function MessageBar(props) {
        _super.call(this, props);
        this.ICON_MAP = (_a = {},
            _a[MessageBar_Props_1.MessageBarType.info] = 'Info',
            _a[MessageBar_Props_1.MessageBarType.warning] = 'Info',
            _a[MessageBar_Props_1.MessageBarType.error] = 'ErrorBadge',
            _a[MessageBar_Props_1.MessageBarType.blocked] = 'Blocked',
            _a[MessageBar_Props_1.MessageBarType.remove] = 'Blocked',
            _a[MessageBar_Props_1.MessageBarType.severeWarning] = 'Warning',
            _a[MessageBar_Props_1.MessageBarType.success] = 'Completed',
            _a
        );
        this.state = {
            labelId: object_1.getId('MessageBar')
        };
        var _a;
    }
    MessageBar.prototype.render = function () {
        var isMultiline = this.props.isMultiline;
        return isMultiline ? this._renderMultiLine() : this._renderSingleLine();
    };
    MessageBar.prototype._getActionsDiv = function () {
        if (this.props.actions) {
            return this.props.isMultiline ?
                React.createElement("div", {className: 'ms-MessageBar-actions'}, 
                    " ", 
                    this.props.actions, 
                    " ") :
                React.createElement("div", {className: 'ms-MessageBar-actionsOneline'}, 
                    this._getDismissDiv(), 
                    this.props.actions);
        }
        return null;
    };
    MessageBar.prototype._getClassName = function () {
        return css_1.css(this.props.className, 'ms-MessageBar', {
            'ms-MessageBar': this.props.messageBarType === MessageBar_Props_1.MessageBarType.info,
            'ms-MessageBar--error': this.props.messageBarType === MessageBar_Props_1.MessageBarType.error,
            'ms-MessageBar--blocked': (this.props.messageBarType === MessageBar_Props_1.MessageBarType.blocked) || (this.props.messageBarType === MessageBar_Props_1.MessageBarType.remove),
            'ms-MessageBar--severeWarning': this.props.messageBarType === MessageBar_Props_1.MessageBarType.severeWarning,
            'ms-MessageBar--success': this.props.messageBarType === MessageBar_Props_1.MessageBarType.success,
            'ms-MessageBar--warning': this.props.messageBarType === MessageBar_Props_1.MessageBarType.warning
        });
    };
    MessageBar.prototype._getDismissDiv = function () {
        if (this.props.onDismiss != null) {
            return React.createElement(Button_1.Button, {disabled: false, className: 'ms-MessageBar-dismissal', buttonType: Button_1.ButtonType.icon, onClick: this.props.onDismiss, icon: 'Cancel', ariaLabel: this.props.dismissButtonAriaLabel});
        }
        return null;
    };
    MessageBar.prototype._getIconSpan = function () {
        return React.createElement("div", {className: 'ms-MessageBar-icon'}, 
            React.createElement("i", {className: "ms-Icon ms-Icon--" + this.ICON_MAP[this.props.messageBarType]})
        );
    };
    MessageBar.prototype._getInnerTextClassName = function () {
        return this.props.onDismiss || this.props.actions ? 'ms-MessageBar-innerTextPadding' : 'ms-MessageBar-innerText';
    };
    MessageBar.prototype._renderMultiLine = function () {
        return (React.createElement("div", {className: this._getClassName() + ' ms-MessageBar-multiline', role: 'status', "aria-live": 'polite', "aria-controls": 'ms-MessageBar-text'}, 
            React.createElement("div", {className: 'ms-MessageBar-content'}, 
                this._getIconSpan(), 
                React.createElement("div", {className: 'ms-MessageBar-actionables'}, 
                    this._getDismissDiv(), 
                    React.createElement("div", {className: 'ms-MessageBar-text', id: this.state.labelId}, 
                        React.createElement("span", {className: this._getInnerTextClassName()}, this.props.children)
                    ), 
                    this._getActionsDiv()))
        ));
    };
    MessageBar.prototype._renderSingleLine = function () {
        return (React.createElement("div", {className: this._getClassName() + ' ms-MessageBar-singleline', role: 'status', "aria-live": 'polite', "aria-controls": 'ms-MessageBar-text'}, 
            React.createElement("div", {className: 'ms-MessageBar-content'}, 
                this._getIconSpan(), 
                React.createElement("div", {className: 'ms-MessageBar-actionables'}, 
                    React.createElement("div", {className: 'ms-MessageBar-text', id: this.state.labelId}, 
                        React.createElement("span", {className: this._getInnerTextClassName()}, this.props.children)
                    )
                ), 
                this._getActionsDiv())
        ));
    };
    MessageBar.defaultProps = {
        messageBarType: MessageBar_Props_1.MessageBarType.info,
        onDismiss: null,
        isMultiline: true,
    };
    return MessageBar;
}(React.Component));
exports.MessageBar = MessageBar;

//# sourceMappingURL=MessageBar.js.map
