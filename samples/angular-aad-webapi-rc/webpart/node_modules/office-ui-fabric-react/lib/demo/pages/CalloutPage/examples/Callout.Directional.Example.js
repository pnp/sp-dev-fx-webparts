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
require('./CalloutExample.scss');
var index_1 = require('../../../../index');
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
var CalloutDirectionalExample = (function (_super) {
    __extends(CalloutDirectionalExample, _super);
    function CalloutDirectionalExample() {
        _super.call(this);
        this.state = {
            isCalloutVisible: false,
            isBeakVisible: true,
            directionalHint: index_1.DirectionalHint.bottomLeftEdge
        };
    }
    CalloutDirectionalExample.prototype.render = function () {
        var _this = this;
        var _a = this.state, isCalloutVisible = _a.isCalloutVisible, isBeakVisible = _a.isBeakVisible, directionalHint = _a.directionalHint, gapSpace = _a.gapSpace, beakWidth = _a.beakWidth;
        //  ms-Callout-smallbeak is used in this directional example to reflect all the positions. Large beak will disable some position to avoid beak over the callout edge.
        return (React.createElement("div", {className: 'ms-CalloutExample'}, 
            React.createElement("div", {className: 'ms-CalloutExample-configArea'}, 
                React.createElement(index_1.Checkbox, {label: 'Show beak', checked: isBeakVisible, onChange: this._onShowBeakChange}), 
                React.createElement(index_1.Slider, {max: 30, label: 'Gap Space', min: 0, defaultValue: 16, onChange: this._onGapSlider}), 
                isBeakVisible &&
                    (React.createElement(index_1.Slider, {max: 50, label: 'Beak Width', min: 10, defaultValue: 16, onChange: this._onBeakWidthSlider})), 
                React.createElement(index_1.Dropdown, {label: 'Directional hint', selectedKey: index_1.DirectionalHint[directionalHint], options: DIRECTION_OPTIONS, onChanged: this._onDirectionalChanged})), 
            React.createElement("div", {className: 'ms-CalloutExample-buttonArea', ref: function (menuButton) { return _this._menuButtonElement = menuButton; }}, 
                React.createElement(index_1.Button, {onClick: this._onShowMenuClicked}, isCalloutVisible ? 'Hide callout' : 'Show callout')
            ), 
            isCalloutVisible ? (React.createElement(index_1.Callout, {className: 'ms-CalloutExample-callout', gapSpace: gapSpace, targetElement: this._menuButtonElement, isBeakVisible: isBeakVisible, beakWidth: beakWidth, directionalHint: directionalHint}, 
                React.createElement("div", {className: 'ms-CalloutExample-header'}, 
                    React.createElement("p", {className: 'ms-CalloutExample-title'}, "All of your favorite people")
                ), 
                React.createElement("div", {className: 'ms-CalloutExample-inner'}, 
                    React.createElement("div", {className: 'ms-CalloutExample-content'}, 
                        React.createElement("p", {className: 'ms-CalloutExample-subText'}, "Message body is optional. If help documentation is available, consider adding a link to learn more at the bottom.")
                    )
                ))) : (null)));
    };
    CalloutDirectionalExample.prototype._onShowMenuClicked = function () {
        this.setState({
            isCalloutVisible: !this.state.isCalloutVisible
        });
    };
    CalloutDirectionalExample.prototype._onShowBeakChange = function (ev, isVisible) {
        this.setState({
            isBeakVisible: isVisible,
            beakWidth: 10
        });
    };
    CalloutDirectionalExample.prototype._onDirectionalChanged = function (option) {
        this.setState({
            directionalHint: index_1.DirectionalHint[option.key]
        });
    };
    CalloutDirectionalExample.prototype._onGapSlider = function (value) {
        this.setState({
            gapSpace: value
        });
    };
    CalloutDirectionalExample.prototype._onBeakWidthSlider = function (value) {
        this.setState({
            beakWidth: value
        });
    };
    __decorate([
        index_1.autobind
    ], CalloutDirectionalExample.prototype, "_onShowMenuClicked", null);
    __decorate([
        index_1.autobind
    ], CalloutDirectionalExample.prototype, "_onShowBeakChange", null);
    __decorate([
        index_1.autobind
    ], CalloutDirectionalExample.prototype, "_onDirectionalChanged", null);
    __decorate([
        index_1.autobind
    ], CalloutDirectionalExample.prototype, "_onGapSlider", null);
    __decorate([
        index_1.autobind
    ], CalloutDirectionalExample.prototype, "_onBeakWidthSlider", null);
    return CalloutDirectionalExample;
}(React.Component));
exports.CalloutDirectionalExample = CalloutDirectionalExample;

//# sourceMappingURL=Callout.Directional.Example.js.map
