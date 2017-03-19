"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var Checkbox_1 = require('../../../../Checkbox');
var CheckboxBasicExample = (function (_super) {
    __extends(CheckboxBasicExample, _super);
    function CheckboxBasicExample() {
        _super.call(this);
        this.state = {
            isChecked: false
        };
        this._onCheckboxChange = this._onCheckboxChange.bind(this);
    }
    CheckboxBasicExample.prototype.render = function () {
        var _this = this;
        var isChecked = this.state.isChecked;
        return (React.createElement("div", null, 
            React.createElement(Checkbox_1.Checkbox, {label: 'Uncontrolled checkbox', onChange: this._onCheckboxChange, inputProps: {
                onFocus: function () { console.log('Uncontrolled checkbox is focused'); },
                onBlur: function () { console.log('Uncontrolled checkbox is blured'); }
            }}), 
            React.createElement(Checkbox_1.Checkbox, {label: 'Uncontrolled checkbox with defaultChecked true', defaultChecked: true, onChange: this._onCheckboxChange}), 
            React.createElement(Checkbox_1.Checkbox, {label: 'Disabled uncontrolled checkbox with defaultChecked true', disabled: true, defaultChecked: true, onChange: this._onCheckboxChange}), 
            React.createElement(Checkbox_1.Checkbox, {label: 'Controlled checkbox', checked: isChecked, onChange: function (ev, checked) { return _this.setState({ isChecked: checked }); }})));
    };
    CheckboxBasicExample.prototype._onCheckboxChange = function (ev, isChecked) {
        console.log("The option has been changed to " + isChecked + ".");
    };
    return CheckboxBasicExample;
}(React.Component));
exports.CheckboxBasicExample = CheckboxBasicExample;

//# sourceMappingURL=Checkbox.Basic.Example.js.map
