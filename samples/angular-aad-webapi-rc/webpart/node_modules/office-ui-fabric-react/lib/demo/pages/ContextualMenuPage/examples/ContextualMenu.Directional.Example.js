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
var index_1 = require('../../../../index');
require('./ContextualMenuExample.scss');
var DIRECTION_OPTIONS = [
    { key: index_1.DirectionalHint[index_1.DirectionalHint.topLeftEdge], text: 'Top Left Edge' },
    { key: index_1.DirectionalHint[index_1.DirectionalHint.topCenter], text: 'Top Center' },
    { key: index_1.DirectionalHint[index_1.DirectionalHint.topRightEdge], text: 'Top Right Edge' },
    { key: index_1.DirectionalHint[index_1.DirectionalHint.topAutoEdge], text: 'Top Auto Edge' },
    { key: index_1.DirectionalHint[index_1.DirectionalHint.bottomLeftEdge], text: 'Bottom Left Edge' },
    { key: index_1.DirectionalHint[index_1.DirectionalHint.bottomCenter], text: 'Bottom Center' },
    { key: index_1.DirectionalHint[index_1.DirectionalHint.bottomRightEdge], text: 'Bottom Right Edge' },
    { key: index_1.DirectionalHint[index_1.DirectionalHint.bottomAutoEdge], text: 'Bottom Auto Edge' },
    { key: index_1.DirectionalHint[index_1.DirectionalHint.leftTopEdge], text: 'Left Top Edge' },
    { key: index_1.DirectionalHint[index_1.DirectionalHint.leftCenter], text: 'Left Center' },
    { key: index_1.DirectionalHint[index_1.DirectionalHint.leftBottomEdge], text: 'Left Bottom Edge' },
    { key: index_1.DirectionalHint[index_1.DirectionalHint.rightTopEdge], text: 'Right Top Edge' },
    { key: index_1.DirectionalHint[index_1.DirectionalHint.rightCenter], text: 'Right Center' },
    { key: index_1.DirectionalHint[index_1.DirectionalHint.rightBottomEdge], text: 'Right Bottom Edge' },
];
var ContextualMenuDirectionalExample = (function (_super) {
    __extends(ContextualMenuDirectionalExample, _super);
    function ContextualMenuDirectionalExample() {
        _super.call(this);
        this.state = {
            isContextualMenuVisible: false,
            isBeakVisible: false,
            directionalHint: index_1.DirectionalHint.bottomLeftEdge,
            gapSpace: 0,
            beakWidth: 10
        };
    }
    ContextualMenuDirectionalExample.prototype.render = function () {
        var _a = this.state, isContextualMenuVisible = _a.isContextualMenuVisible, isBeakVisible = _a.isBeakVisible, directionalHint = _a.directionalHint, gapSpace = _a.gapSpace, beakWidth = _a.beakWidth;
        return (React.createElement("div", {className: 'ms-ContextualMenuDirectionalExample'}, 
            React.createElement("div", {className: 'ms-ContextualMenuDirectionalExample-configArea'}, 
                React.createElement(index_1.Checkbox, {label: 'Show beak', checked: isBeakVisible, onChange: this._onShowBeakChange}), 
                React.createElement(index_1.Slider, {max: 20, label: 'Gap Space', min: 0, defaultValue: 0, onChange: this._onGapSlider}), 
                isBeakVisible &&
                    (React.createElement(index_1.Slider, {max: 50, label: 'Beak Width', min: 10, defaultValue: 10, onChange: this._onBeakWidthSlider})), 
                React.createElement(index_1.Dropdown, {label: 'Directional hint', selectedKey: index_1.DirectionalHint[directionalHint], options: DIRECTION_OPTIONS, onChanged: this._onDirectionalChanged})), 
            React.createElement("div", {className: 'ms-ContextualMenuDirectionalExample-buttonArea', ref: 'menuButton'}, 
                React.createElement(index_1.Button, {onClick: this._onShowMenuClicked}, isContextualMenuVisible ? 'Hide context menu' : 'Show context menu')
            ), 
            isContextualMenuVisible ? (React.createElement(index_1.ContextualMenu, {target: this.refs.menuButton, isBeakVisible: isBeakVisible, directionalHint: directionalHint, gapSpace: gapSpace, beakWidth: beakWidth, items: [
                {
                    key: 'newItem',
                    name: 'New',
                    icon: 'Add',
                    items: [
                        {
                            key: 'emailMessage',
                            name: 'Email message',
                        },
                        {
                            key: 'calendarEvent',
                            name: 'Calendar event',
                        }
                    ]
                },
                {
                    key: 'upload',
                    name: 'Upload',
                    icon: 'Upload'
                },
                {
                    key: 'rename',
                    name: 'Rename',
                },
                {
                    key: '-',
                    name: '-',
                },
                {
                    key: 'share',
                    name: 'Share',
                    icon: 'Share',
                    items: [
                        {
                            key: 'sharetoemail',
                            name: 'Share to Email',
                            icon: 'Mail'
                        },
                        {
                            key: 'sharetofacebook',
                            name: 'Share to Facebook',
                        },
                        {
                            key: 'sharetotwitter',
                            name: 'Share to Twitter',
                            icon: 'Share'
                        },
                    ]
                },
                {
                    key: 'print',
                    name: 'Print',
                    icon: 'Print'
                },
            ]})) : (null)));
    };
    ContextualMenuDirectionalExample.prototype._onShowBeakChange = function (ev, isVisible) {
        this.setState({
            isBeakVisible: isVisible
        });
    };
    ContextualMenuDirectionalExample.prototype._onShowMenuClicked = function () {
        this.setState({
            isContextualMenuVisible: !this.state.isContextualMenuVisible
        });
    };
    ContextualMenuDirectionalExample.prototype._onDirectionalChanged = function (option) {
        this.setState({
            directionalHint: index_1.DirectionalHint[option.key]
        });
    };
    ContextualMenuDirectionalExample.prototype._onGapSlider = function (value) {
        this.setState({
            gapSpace: value
        });
    };
    ContextualMenuDirectionalExample.prototype._onBeakWidthSlider = function (value) {
        this.setState({
            beakWidth: value
        });
    };
    __decorate([
        index_1.autobind
    ], ContextualMenuDirectionalExample.prototype, "_onShowBeakChange", null);
    __decorate([
        index_1.autobind
    ], ContextualMenuDirectionalExample.prototype, "_onShowMenuClicked", null);
    __decorate([
        index_1.autobind
    ], ContextualMenuDirectionalExample.prototype, "_onDirectionalChanged", null);
    __decorate([
        index_1.autobind
    ], ContextualMenuDirectionalExample.prototype, "_onGapSlider", null);
    __decorate([
        index_1.autobind
    ], ContextualMenuDirectionalExample.prototype, "_onBeakWidthSlider", null);
    return ContextualMenuDirectionalExample;
}(React.Component));
exports.ContextualMenuDirectionalExample = ContextualMenuDirectionalExample;

//# sourceMappingURL=ContextualMenu.Directional.Example.js.map
