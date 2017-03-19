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
var React = require('react');
var index_1 = require('../../../../index');
var FacepileExampleData_1 = require('./FacepileExampleData');
require('./Facepile.Examples.scss');
(function (ExtraDataType) {
    ExtraDataType[ExtraDataType["none"] = 0] = "none";
    ExtraDataType[ExtraDataType["name"] = 1] = "name";
    ExtraDataType[ExtraDataType["stats"] = 2] = "stats";
})(exports.ExtraDataType || (exports.ExtraDataType = {}));
var ExtraDataType = exports.ExtraDataType;
var FacepileBasicExample = (function (_super) {
    __extends(FacepileBasicExample, _super);
    function FacepileBasicExample() {
        _super.call(this);
        this.state = {
            numberOfFaces: 3,
            imagesFadeIn: true,
            extraDataType: ExtraDataType.none
        };
    }
    FacepileBasicExample.prototype.render = function () {
        var _this = this;
        var _a = this.state, extraDataType = _a.extraDataType, numberOfFaces = _a.numberOfFaces;
        var facepileProps = {
            personas: FacepileExampleData_1.facepilePersonas.slice(0, numberOfFaces),
            getPersonaProps: function (persona) {
                if (extraDataType === ExtraDataType.name) {
                    return {
                        imageShouldFadeIn: _this.state.imagesFadeIn,
                        hidePersonaDetails: false
                    };
                }
                else if (extraDataType === ExtraDataType.stats) {
                    return {
                        imageShouldFadeIn: _this.state.imagesFadeIn,
                        hidePersonaDetails: false,
                        primaryText: "[" + persona.data + "]"
                    };
                }
                return {
                    imageShouldFadeIn: _this.state.imagesFadeIn,
                };
            }
        };
        return (React.createElement("div", {className: 'ms-FacepileExample'}, 
            React.createElement(index_1.Facepile, __assign({}, facepileProps)), 
            React.createElement(index_1.Slider, {label: 'Number of Personas:', min: 1, max: 5, step: 1, showValue: true, value: numberOfFaces, onChange: function (value) { return _this.setState(function (prevState) {
                prevState.numberOfFaces = value;
                return prevState;
            }); }}), 
            React.createElement(index_1.Checkbox, {label: 'Fade In', checked: this.state.imagesFadeIn, onChange: function (ev, checked) {
                _this.setState(function (prevState) {
                    prevState.imagesFadeIn = checked;
                    return prevState;
                });
            }}), 
            React.createElement(index_1.Dropdown, {label: 'Additional Data:', selectedKey: this.state.extraDataType, options: [
                { key: ExtraDataType.none, text: ExtraDataType[ExtraDataType.none] },
                { key: ExtraDataType.name, text: ExtraDataType[ExtraDataType.name] },
                { key: ExtraDataType.stats, text: ExtraDataType[ExtraDataType.stats] }
            ], onChanged: function (value) { return _this.setState(function (prevState) {
                prevState.extraDataType = value.key;
                return prevState;
            }); }})));
    };
    return FacepileBasicExample;
}(React.Component));
exports.FacepileBasicExample = FacepileBasicExample;

//# sourceMappingURL=Facepile.Basic.Example.js.map
