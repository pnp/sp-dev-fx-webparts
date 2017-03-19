"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/* tslint:disable:no-unused-variable */
var React = require('react');
/* tslint:enable:no-unused-variable */
var BaseComponent_1 = require('../../common/BaseComponent');
var index_1 = require('../FocusTrapZone/index');
var Panel_Props_1 = require('./Panel.Props');
var Layer_1 = require('../Layer/Layer');
var Overlay_1 = require('../../Overlay');
var index_2 = require('../Popup/index');
var css_1 = require('../../utilities/css');
var object_1 = require('../../utilities/object');
var rtl_1 = require('../../utilities/rtl');
require('./Panel.scss');
var Panel = (function (_super) {
    __extends(Panel, _super);
    function Panel(props) {
        _super.call(this, props);
        this._onPanelClick = this._onPanelClick.bind(this);
        this._onPanelRef = this._onPanelRef.bind(this);
        this.state = {
            isOpen: !!props.isOpen,
            isAnimatingOpen: props.isOpen,
            isAnimatingClose: false,
            id: object_1.getId('Panel')
        };
    }
    Panel.prototype.componentDidMount = function () {
        var _this = this;
        if (this.state.isOpen) {
            this._async.setTimeout(function () {
                _this.setState({
                    isAnimatingOpen: false
                });
            }, 2000);
        }
    };
    Panel.prototype.componentWillReceiveProps = function (newProps) {
        if (newProps.isOpen !== this.state.isOpen) {
            this.setState({
                isOpen: newProps.isOpen,
                isAnimatingOpen: newProps.isOpen ? true : false,
                isAnimatingClose: newProps.isOpen ? false : true
            });
        }
    };
    Panel.prototype.render = function () {
        var _a = this.props, children = _a.children, _b = _a.className, className = _b === void 0 ? '' : _b, type = _a.type, hasCloseButton = _a.hasCloseButton, isLightDismiss = _a.isLightDismiss, isBlocking = _a.isBlocking, headerText = _a.headerText, closeButtonAriaLabel = _a.closeButtonAriaLabel, _c = _a.headerClassName, headerClassName = _c === void 0 ? '' : _c, elementToFocusOnDismiss = _a.elementToFocusOnDismiss, ignoreExternalFocusing = _a.ignoreExternalFocusing, forceFocusInsideTrap = _a.forceFocusInsideTrap, firstFocusableSelector = _a.firstFocusableSelector;
        var _d = this.state, isOpen = _d.isOpen, isAnimatingOpen = _d.isAnimatingOpen, isAnimatingClose = _d.isAnimatingClose, id = _d.id;
        var isLeft = type === Panel_Props_1.PanelType.smallFixedNear ? true : false;
        var isRTL = rtl_1.getRTL();
        var isOnRightSide = isRTL ? isLeft : !isLeft;
        var headerTextId = id + '-headerText';
        var pendingCommandBarContent = '';
        if (!isOpen) {
            return null;
        }
        var header;
        if (headerText) {
            header = React.createElement("p", {className: css_1.css('ms-Panel-headerText', headerClassName), id: headerTextId}, headerText);
        }
        var closeButton;
        if (hasCloseButton) {
            closeButton = React.createElement("button", {className: 'ms-Panel-closeButton ms-PanelAction-close', onClick: this._onPanelClick, "aria-label": closeButtonAriaLabel, "data-is-visible": true}, 
                React.createElement("i", {className: 'ms-Panel-closeIcon ms-Icon ms-Icon--Cancel'})
            );
        }
        var overlay;
        if (isBlocking) {
            overlay = React.createElement(Overlay_1.Overlay, {isDarkThemed: false, onClick: isLightDismiss ? this._onPanelClick : null});
        }
        return (React.createElement(Layer_1.Layer, null, 
            React.createElement(index_2.Popup, {role: 'dialog', ariaLabelledBy: headerText ? headerTextId : undefined, onDismiss: this.props.onDismiss}, 
                React.createElement("div", {ref: this._onPanelRef, className: css_1.css('ms-Panel', className, {
                    'ms-Panel--openLeft': !isOnRightSide,
                    'ms-Panel--openRight': isOnRightSide,
                    'is-open': isOpen,
                    'ms-Panel-animateIn': isAnimatingOpen,
                    'ms-Panel-animateOut': isAnimatingClose,
                    'ms-Panel--smFluid': type === Panel_Props_1.PanelType.smallFluid,
                    'ms-Panel--smLeft': type === Panel_Props_1.PanelType.smallFixedNear,
                    'ms-Panel--sm': type === Panel_Props_1.PanelType.smallFixedFar,
                    'ms-Panel--md': type === Panel_Props_1.PanelType.medium,
                    'ms-Panel--lg': type === Panel_Props_1.PanelType.large || type === Panel_Props_1.PanelType.largeFixed,
                    'ms-Panel--fixed': type === Panel_Props_1.PanelType.largeFixed,
                    'ms-Panel--xl': type === Panel_Props_1.PanelType.extraLarge,
                })}, 
                    overlay, 
                    React.createElement(index_1.FocusTrapZone, {className: 'ms-Panel-main', elementToFocusOnDismiss: elementToFocusOnDismiss, isClickableOutsideFocusTrap: isLightDismiss, ignoreExternalFocusing: ignoreExternalFocusing, forceFocusInsideTrap: forceFocusInsideTrap, firstFocusableSelector: firstFocusableSelector}, 
                        React.createElement("div", {className: 'ms-Panel-commands', "data-is-visible": true}, 
                            pendingCommandBarContent, 
                            closeButton), 
                        React.createElement("div", {className: 'ms-Panel-contentInner'}, 
                            header, 
                            React.createElement("div", {className: 'ms-Panel-content'}, children))))
            )
        ));
    };
    Panel.prototype.dismiss = function () {
        if (this.state.isOpen) {
            this.setState({
                isAnimatingOpen: false,
                isAnimatingClose: true
            });
        }
    };
    Panel.prototype._onPanelClick = function () {
        this.dismiss();
    };
    Panel.prototype._onPanelRef = function (ref) {
        if (ref) {
            this._events.on(ref, 'animationend', this._onAnimationEnd);
        }
        else {
            this._events.off();
        }
    };
    Panel.prototype._onAnimationEnd = function (ev) {
        if (ev.animationName.indexOf('In') > -1) {
            this.setState({
                isOpen: true,
                isAnimatingOpen: false
            });
        }
        if (ev.animationName.indexOf('Out') > -1) {
            this.setState({
                isOpen: false,
                isAnimatingClose: false
            });
            if (this.props.onDismiss) {
                this.props.onDismiss();
            }
        }
    };
    Panel.defaultProps = {
        isOpen: false,
        isBlocking: true,
        hasCloseButton: true,
        type: Panel_Props_1.PanelType.smallFixedFar,
    };
    return Panel;
}(BaseComponent_1.BaseComponent));
exports.Panel = Panel;

//# sourceMappingURL=Panel.js.map
