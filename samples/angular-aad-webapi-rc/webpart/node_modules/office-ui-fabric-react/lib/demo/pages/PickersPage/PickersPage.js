"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var index_1 = require('../../../index');
var index_2 = require('../../components/index');
var Picker_CustomResult_Example_1 = require('./examples/Picker.CustomResult.Example');
var TagPicker_Basic_Example_1 = require('./examples/TagPicker.Basic.Example');
var pageroute_1 = require('../../utilities/pageroute');
var AppState_1 = require('../../components/App/AppState');
var TagPickerExampleCode = require('./examples/TagPicker.Basic.Example.tsx');
var PickerCustomResultExampleCode = require('./examples/Picker.CustomResult.Example.tsx');
var PickersPage = (function (_super) {
    __extends(PickersPage, _super);
    function PickersPage() {
        _super.call(this);
        this._url = pageroute_1.getPageRouteFromState(AppState_1.AppState, 'Basic components', 'PeoplePicker');
    }
    PickersPage.prototype.render = function () {
        return (React.createElement(index_2.ComponentPage, {title: 'Pickers', componentName: 'PickersExample', exampleCards: React.createElement("div", null, 
            React.createElement(index_2.ExampleCard, {title: 'Tag Picker', code: TagPickerExampleCode}, 
                React.createElement(TagPicker_Basic_Example_1.TagPickerBasicExample, null)
            ), 
            React.createElement(index_2.ExampleCard, {title: 'Custom Picker (Document Picker)', code: PickerCustomResultExampleCode}, 
                React.createElement(Picker_CustomResult_Example_1.PickerCustomResultExample, null)
            )), propertiesTables: React.createElement(index_2.PropertiesTableSet, {componentName: 'BasePicker', componentPath: 'components/pickers/'}), overview: React.createElement("div", null, 
            React.createElement(index_1.Link, {target: '_blank', href: 'http://dev.office.com/fabric/components/Pickers'}, " Pickers "), 
            React.createElement("span", null, " are used to pick recipients.")), route: this._url, isHeaderVisible: this.props.isHeaderVisible}));
    };
    return PickersPage;
}(React.Component));
exports.PickersPage = PickersPage;

//# sourceMappingURL=PickersPage.js.map
