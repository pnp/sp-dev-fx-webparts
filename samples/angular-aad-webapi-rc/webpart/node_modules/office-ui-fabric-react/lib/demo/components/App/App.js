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
var index_1 = require('../../../index');
var index_2 = require('../index');
var Nav_1 = require('../../../Nav');
var AppState_1 = require('./AppState');
var withResponsiveMode_1 = require('../../../utilities/decorators/withResponsiveMode');
require('./App.scss');
var App = (function (_super) {
    __extends(App, _super);
    function App(props) {
        _super.call(this, props);
        this.state = {
            isMenuVisible: false
        };
        this._onIsMenuVisibleChanged = this._onIsMenuVisibleChanged.bind(this);
        this._onLinkClick = this._onLinkClick.bind(this);
    }
    App.prototype.render = function () {
        var responsiveMode = this.props.responsiveMode;
        var isMenuVisible = this.state.isMenuVisible;
        var navPanel = (React.createElement(Nav_1.Nav, {groups: AppState_1.AppState.examplePages, onLinkClick: this._onLinkClick, onRenderLink: function (link) { return ([
            React.createElement("span", {key: 1, className: 'Nav-linkText'}, link.name),
            (link.status !== undefined ?
                React.createElement("span", {key: 2, className: 'Nav-linkFlair ' + 'is-state' + link.status}, AppState_1.ExampleStatus[link.status]) :
                null)
        ]); }}));
        return (React.createElement(index_1.Fabric, {className: index_1.css('ms-App', 'ms-App--' + withResponsiveMode_1.ResponsiveMode[responsiveMode])}, 
            React.createElement("div", {className: 'ms-App-header'}, 
                React.createElement(index_2.Header, {title: AppState_1.AppState.appTitle, sideLinks: AppState_1.AppState.headerLinks, isMenuVisible: isMenuVisible, onIsMenuVisibleChanged: this._onIsMenuVisibleChanged})
            ), 
            (responsiveMode > withResponsiveMode_1.ResponsiveMode.large) ? (React.createElement("div", {className: 'ms-App-nav'}, navPanel)) : (null), 
            React.createElement("div", {className: 'ms-App-content', "data-is-scrollable": 'true'}, this.props.children), 
            (responsiveMode <= withResponsiveMode_1.ResponsiveMode.large) ? (React.createElement(index_1.Panel, {className: 'ms-App-navPanel ms-font-m', isOpen: isMenuVisible, isLightDismiss: true, type: index_1.PanelType.smallFixedNear, onDismiss: this._onIsMenuVisibleChanged.bind(this, false)}, navPanel)) : (null)));
    };
    App.prototype._onIsMenuVisibleChanged = function (isMenuVisible) {
        this.setState({ isMenuVisible: isMenuVisible });
    };
    App.prototype._onLinkClick = function () {
        this.setState({ isMenuVisible: false });
    };
    App = __decorate([
        withResponsiveMode_1.withResponsiveMode
    ], App);
    return App;
}(React.Component));
exports.App = App;

//# sourceMappingURL=App.js.map
