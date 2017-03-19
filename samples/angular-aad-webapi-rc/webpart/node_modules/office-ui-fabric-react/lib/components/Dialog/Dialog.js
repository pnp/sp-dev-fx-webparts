"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var React = require('react');
var index_1 = require('../FocusTrapZone/index');
var Dialog_Props_1 = require('./Dialog.Props');
var Overlay_1 = require('../../Overlay');
var Layer_1 = require('../../Layer');
var Button_1 = require('../../Button');
var DialogFooter_1 = require('./DialogFooter');
var css_1 = require('../../utilities/css');
var index_2 = require('../Popup/index');
var withResponsiveMode_1 = require('../../utilities/decorators/withResponsiveMode');
var object_1 = require('../../utilities/object');
var BaseComponent_1 = require('../../common/BaseComponent');
require('./Dialog.scss');
var Dialog = (function (_super) {
    __extends(Dialog, _super);
    function Dialog(props) {
        _super.call(this, props);
        this._onDialogRef = this._onDialogRef.bind(this);
        this.state = {
            id: object_1.getId('Dialog'),
            isOpen: props.isOpen,
            isAnimatingOpen: props.isOpen,
            isAnimatingClose: false
        };
    }
    Dialog.prototype.componentWillReceiveProps = function (newProps) {
        // Opening the dialog
        if (newProps.isOpen && !this.state.isOpen) {
            this.setState({
                isOpen: true,
                isAnimatingOpen: true,
                isAnimatingClose: false
            });
        }
        // Closing the dialog
        if (!newProps.isOpen && this.state.isOpen) {
            this.setState({
                isAnimatingOpen: false,
                isAnimatingClose: true
            });
        }
    };
    Dialog.prototype.render = function () {
        var _a = this.props, type = _a.type, isDarkOverlay = _a.isDarkOverlay, onDismiss = _a.onDismiss, title = _a.title, subText = _a.subText, isBlocking = _a.isBlocking, responsiveMode = _a.responsiveMode, elementToFocusOnDismiss = _a.elementToFocusOnDismiss, ignoreExternalFocusing = _a.ignoreExternalFocusing, forceFocusInsideTrap = _a.forceFocusInsideTrap, firstFocusableSelector = _a.firstFocusableSelector, closeButtonAriaLabel = _a.closeButtonAriaLabel, onLayerMounted = _a.onLayerMounted, isClickableOutsideFocusTrap = _a.isClickableOutsideFocusTrap;
        var _b = this.state, id = _b.id, isOpen = _b.isOpen, isAnimatingOpen = _b.isAnimatingOpen, isAnimatingClose = _b.isAnimatingClose;
        // @TODO - the discussion on whether the Dialog contain a property for rendering itself is still being discussed
        if (!isOpen) {
            return null;
        }
        var subTextContent;
        var dialogClassName = css_1.css('ms-Dialog', this.props.className, {
            'ms-Dialog--lgHeader': type === Dialog_Props_1.DialogType.largeHeader,
            'ms-Dialog--close': type === Dialog_Props_1.DialogType.close,
            'is-open': isOpen,
            'is-animatingOpen': isAnimatingOpen,
            'is-animatingClose': isAnimatingClose
        });
        var groupings = this._groupChildren();
        if (subText) {
            subTextContent = React.createElement("p", {className: 'ms-Dialog-subText', id: id + '-subText'}, subText);
        }
        // @temp tuatology - Will adjust this to be a panel at certain breakpoints
        if (responsiveMode >= withResponsiveMode_1.ResponsiveMode.small) {
            return (React.createElement(Layer_1.Layer, {onLayerMounted: onLayerMounted}, 
                React.createElement(index_2.Popup, {role: 'dialog', ariaLabelledBy: title ? id + '-title' : '', ariaDescribedBy: subText ? id + '-subText' : '', onDismiss: onDismiss}, 
                    React.createElement("div", {className: dialogClassName, ref: this._onDialogRef}, 
                        React.createElement(Overlay_1.Overlay, {isDarkThemed: isDarkOverlay, onClick: isBlocking ? null : onDismiss}), 
                        React.createElement(index_1.FocusTrapZone, {className: css_1.css('ms-Dialog-main', this.props.containerClassName), elementToFocusOnDismiss: elementToFocusOnDismiss, isClickableOutsideFocusTrap: isClickableOutsideFocusTrap ? isClickableOutsideFocusTrap : !isBlocking, ignoreExternalFocusing: ignoreExternalFocusing, forceFocusInsideTrap: forceFocusInsideTrap, firstFocusableSelector: firstFocusableSelector}, 
                            React.createElement("div", {className: 'ms-Dialog-header'}, 
                                React.createElement("p", {className: 'ms-Dialog-title', id: id + '-title'}, title), 
                                React.createElement("div", {className: 'ms-Dialog-topButton'}, 
                                    React.createElement(Button_1.Button, {className: 'ms-Dialog-button ms-Dialog-button--close', buttonType: Button_1.ButtonType.icon, icon: 'Cancel', rootProps: { title: closeButtonAriaLabel }, ariaLabel: closeButtonAriaLabel, onClick: onDismiss})
                                )), 
                            React.createElement("div", {className: 'ms-Dialog-inner'}, 
                                React.createElement("div", {className: css_1.css('ms-Dialog-content', this.props.contentClassName)}, 
                                    subTextContent, 
                                    groupings.contents), 
                                groupings.footers)))
                )
            ));
        }
    };
    // @TODO - typing the footers as an array of DialogFooter is difficult because
    // casing "child as DialogFooter" causes a problem because
    // "Neither type 'ReactElement<any>' nor type 'DialogFooter' is assignable to the other."
    Dialog.prototype._groupChildren = function () {
        var groupings = {
            footers: [],
            contents: []
        };
        React.Children.map(this.props.children, function (child) {
            if (typeof child === 'object' && child !== null && child.type === DialogFooter_1.DialogFooter) {
                groupings.footers.push(child);
            }
            else {
                groupings.contents.push(child);
            }
        });
        return groupings;
    };
    Dialog.prototype._onDialogRef = function (ref) {
        if (ref) {
            this._events.on(ref, 'animationend', this._onAnimationEnd);
        }
        else {
            this._events.off();
        }
    };
    // Watch for completed animations and set the state
    Dialog.prototype._onAnimationEnd = function (ev) {
        // The dialog has just opened (faded in)
        if (ev.animationName.indexOf('fadeIn') > -1) {
            this.setState({
                isOpen: true,
                isAnimatingOpen: false
            });
        }
        // The dialog has just closed (faded out)
        if (ev.animationName.indexOf('fadeOut') > -1) {
            this.setState({
                isOpen: false,
                isAnimatingClose: false
            });
            // Call the onDismiss callback
            if (this.props.onDismiss) {
                this.props.onDismiss();
            }
        }
    };
    Dialog.defaultProps = {
        isOpen: false,
        type: Dialog_Props_1.DialogType.normal,
        isDarkOverlay: true,
        isBlocking: false,
        className: '',
        containerClassName: '',
        contentClassName: ''
    };
    Dialog = __decorate([
        withResponsiveMode_1.withResponsiveMode
    ], Dialog);
    return Dialog;
}(BaseComponent_1.BaseComponent));
exports.Dialog = Dialog;

//# sourceMappingURL=Dialog.js.map
