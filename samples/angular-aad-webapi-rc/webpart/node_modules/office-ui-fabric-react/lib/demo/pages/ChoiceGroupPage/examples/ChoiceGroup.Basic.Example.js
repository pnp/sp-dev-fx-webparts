"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var index_1 = require('../../../../index');
var ChoiceGroupBasicExample = (function (_super) {
    __extends(ChoiceGroupBasicExample, _super);
    function ChoiceGroupBasicExample() {
        _super.call(this);
        this.state = {
            imageKey: ''
        };
        this._onChanged = this._onChanged.bind(this);
        this._onImageChoiceGroupChange = this._onImageChoiceGroupChange.bind(this);
    }
    ChoiceGroupBasicExample.prototype.render = function () {
        return (React.createElement("div", null, 
            React.createElement(index_1.ChoiceGroup, {options: [
                {
                    key: 'A',
                    text: 'Option A'
                },
                {
                    key: 'B',
                    text: 'Option B',
                    checked: true
                },
                {
                    key: 'C',
                    text: 'Option C',
                    disabled: true
                },
                {
                    key: 'D',
                    text: 'Option D',
                    checked: true,
                    disabled: true
                }
            ], onChanged: this._onChanged, label: 'Pick one', required: true}), 
            React.createElement(index_1.ChoiceGroup, {label: 'Pick one image', options: [
                {
                    key: 'bar',
                    checked: this.state.imageKey === 'bar',
                    imageSrc: 'dist/choicegroup-bar-unselected.png',
                    selectedImageSrc: 'dist/choicegroup-bar-selected.png',
                    imageSize: { width: 50, height: 50 },
                    text: 'Bar chart'
                },
                {
                    key: 'pie',
                    checked: this.state.imageKey === 'pie',
                    imageSrc: 'dist/choicegroup-pie-unselected.png',
                    selectedImageSrc: 'dist/choicegroup-pie-selected.png',
                    imageSize: { width: 50, height: 50 },
                    text: 'Pie chart'
                }
            ], onChanged: this._onImageChoiceGroupChange})));
    };
    ChoiceGroupBasicExample.prototype._onChanged = function () {
        console.log('The option has been changed.');
    };
    ChoiceGroupBasicExample.prototype._onImageChoiceGroupChange = function (option, evt) {
        this.setState({
            imageKey: option.key
        });
    };
    return ChoiceGroupBasicExample;
}(React.Component));
exports.ChoiceGroupBasicExample = ChoiceGroupBasicExample;

//# sourceMappingURL=ChoiceGroup.Basic.Example.js.map
