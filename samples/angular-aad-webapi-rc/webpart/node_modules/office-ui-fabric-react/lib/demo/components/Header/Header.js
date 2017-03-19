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
var ContextualMenu_1 = require('../../../ContextualMenu');
var rtl_1 = require('../../../utilities/rtl');
var DirectionalHint_1 = require('../../../common/DirectionalHint');
var FocusZone_1 = require('../../../FocusZone');
var withResponsiveMode_1 = require('../../../utilities/decorators/withResponsiveMode');
require('./Header.scss');
var Header = (function (_super) {
    __extends(Header, _super);
    function Header(props) {
        _super.call(this, props);
        this._onGearClick = this._onGearClick.bind(this);
        this._onDismiss = this._onDismiss.bind(this);
        this._onRTLToggled = this._onRTLToggled.bind(this);
        this._onMenuClick = this._onMenuClick.bind(this);
        this.state = {
            contextMenu: null,
            isRTLEnabled: rtl_1.getRTL()
        };
    }
    Header.prototype.render = function () {
        var _a = this.props, title = _a.title, sideLinks = _a.sideLinks, responsiveMode = _a.responsiveMode;
        var contextMenu = this.state.contextMenu;
        // In medium and below scenarios, hide the side links.
        if (responsiveMode <= withResponsiveMode_1.ResponsiveMode.large) {
            sideLinks = [];
        }
        return (React.createElement("div", null, 
            React.createElement("div", {className: 'Header'}, 
                (responsiveMode <= withResponsiveMode_1.ResponsiveMode.large) && (React.createElement("button", {className: 'Header-button', onClick: this._onMenuClick}, 
                    React.createElement("i", {className: 'ms-Icon ms-Icon--GlobalNavButton'})
                )), 
                React.createElement("div", {className: 'Header-title ms-font-xl ms-fontColor-white'}, 
                    React.createElement("i", {className: 'ms-Icon ms-Icon--Org'}), 
                    title), 
                React.createElement("div", {className: 'Header-buttons'}, 
                    React.createElement(FocusZone_1.FocusZone, {direction: FocusZone_1.FocusZoneDirection.horizontal}, sideLinks.map(function (link, linkIndex) { return (React.createElement("a", {key: linkIndex, className: 'Header-button ms-fontColor-white', href: link.url}, link.name)); }).concat([
                        React.createElement("button", {key: 'headerButton', className: 'Header-button', onClick: this._onGearClick}, 
                            React.createElement("i", {className: 'ms-Icon ms-Icon--Settings'})
                        )
                    ]))
                )), 
            contextMenu ? (React.createElement(ContextualMenu_1.ContextualMenu, {items: contextMenu.items, isBeakVisible: true, targetElement: contextMenu.target, directionalHint: DirectionalHint_1.DirectionalHint.bottomAutoEdge, gapSpace: 5, onDismiss: this._onDismiss})) : (null)));
    };
    Header.prototype._onMenuClick = function (ev) {
        var _a = this.props, onIsMenuVisibleChanged = _a.onIsMenuVisibleChanged, isMenuVisible = _a.isMenuVisible;
        if (onIsMenuVisibleChanged) {
            onIsMenuVisibleChanged(!isMenuVisible);
        }
    };
    Header.prototype._onGearClick = function (ev) {
        var contextMenu = this.state.contextMenu;
        this.setState({
            contextMenu: contextMenu ? null : {
                target: ev.currentTarget,
                items: this._getOptionMenuItems()
            }
        });
    };
    Header.prototype._getOptionMenuItems = function () {
        return [{
                key: 'isRTL',
                name: "Render in " + (this.state.isRTLEnabled ? 'LTR' : 'RTL'),
                icon: 'Settings',
                onClick: this._onRTLToggled
            }];
    };
    Header.prototype._onRTLToggled = function (ev) {
        var isRTLEnabled = this.state.isRTLEnabled;
        rtl_1.setRTL(!isRTLEnabled);
        this.setState({
            isRTLEnabled: !isRTLEnabled,
            contextMenu: null
        });
    };
    Header.prototype._onDismiss = function () {
        this.setState({
            contextMenu: null
        });
    };
    Header = __decorate([
        withResponsiveMode_1.withResponsiveMode
    ], Header);
    return Header;
}(React.Component));
exports.Header = Header;

//# sourceMappingURL=Header.js.map
