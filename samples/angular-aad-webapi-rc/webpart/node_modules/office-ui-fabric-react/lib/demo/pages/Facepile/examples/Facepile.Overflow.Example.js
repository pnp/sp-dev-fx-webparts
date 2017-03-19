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
var facepileProps = {
    personas: FacepileExampleData_1.facepilePersonas,
    maxDisplayablePersonas: 5,
    overflowButtonType: index_1.OverflowButtonType.downArrow,
    overflowButtonProps: {
        onClick: function (ev) {
            return alert('overflow icon clicked');
        }
    }
};
var FacepileOverflowExample = (function (_super) {
    __extends(FacepileOverflowExample, _super);
    function FacepileOverflowExample() {
        _super.call(this);
        this.state = {
            displayedPersonas: 5,
            overflowButtonType: index_1.OverflowButtonType.none
        };
    }
    FacepileOverflowExample.prototype.render = function () {
        var _this = this;
        var _a = this.state, displayedPersonas = _a.displayedPersonas, overflowButtonType = _a.overflowButtonType;
        facepileProps.maxDisplayablePersonas = displayedPersonas;
        facepileProps.overflowButtonType = overflowButtonType;
        return (React.createElement("div", {className: 'ms-FacepileExample'}, 
            React.createElement(index_1.Facepile, __assign({}, facepileProps)), 
            React.createElement(index_1.Slider, {label: 'Number of Personas Shown:', min: 0, max: 6, step: 1, showValue: true, value: this.state.displayedPersonas, onChange: function (value) { return _this.setState(function (prevState) {
                prevState.displayedPersonas = value;
                return prevState;
            }); }}), 
            React.createElement(index_1.Dropdown, {label: 'Overflow Type:', selectedKey: this.state.overflowButtonType, options: [
                { key: index_1.OverflowButtonType.none, text: index_1.OverflowButtonType[index_1.OverflowButtonType.none] },
                { key: index_1.OverflowButtonType.descriptive, text: index_1.OverflowButtonType[index_1.OverflowButtonType.descriptive] },
                { key: index_1.OverflowButtonType.downArrow, text: index_1.OverflowButtonType[index_1.OverflowButtonType.downArrow] },
                { key: index_1.OverflowButtonType.more, text: index_1.OverflowButtonType[index_1.OverflowButtonType.more] },
            ], onChanged: function (value) { return _this.setState(function (prevState) {
                prevState.overflowButtonType = value.key;
                return prevState;
            }); }})));
    };
    return FacepileOverflowExample;
}(React.Component));
exports.FacepileOverflowExample = FacepileOverflowExample;

//# sourceMappingURL=Facepile.Overflow.Example.js.map
