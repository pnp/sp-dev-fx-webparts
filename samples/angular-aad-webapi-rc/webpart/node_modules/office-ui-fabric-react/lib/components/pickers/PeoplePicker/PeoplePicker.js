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
/* tslint:disable */
var React = require('react');
/* tslint:enable */
var BasePicker_1 = require('../BasePicker');
var SelectedItemDefault_1 = require('./PeoplePickerItems/SelectedItemDefault');
var SuggestionItemDefault_1 = require('./PeoplePickerItems/SuggestionItemDefault');
var SelectedItemWithMenu_1 = require('./PeoplePickerItems/SelectedItemWithMenu');
require('./PeoplePicker.scss');
var BasePeoplePicker = (function (_super) {
    __extends(BasePeoplePicker, _super);
    function BasePeoplePicker() {
        _super.apply(this, arguments);
    }
    return BasePeoplePicker;
}(BasePicker_1.BasePicker));
exports.BasePeoplePicker = BasePeoplePicker;
var MemberListPeoplePicker = (function (_super) {
    __extends(MemberListPeoplePicker, _super);
    function MemberListPeoplePicker() {
        _super.apply(this, arguments);
    }
    return MemberListPeoplePicker;
}(BasePicker_1.BasePickerListBelow));
exports.MemberListPeoplePicker = MemberListPeoplePicker;
/**
 * Standard People Picker.
 */
var NormalPeoplePicker = (function (_super) {
    __extends(NormalPeoplePicker, _super);
    function NormalPeoplePicker() {
        _super.apply(this, arguments);
    }
    NormalPeoplePicker.defaultProps = {
        onRenderItem: function (props) { return React.createElement(SelectedItemDefault_1.SelectedItemDefault, __assign({}, props)); },
        onRenderSuggestionsItem: function (props) { return React.createElement(SuggestionItemDefault_1.SuggestionItemNormal, __assign({}, props)); }
    };
    return NormalPeoplePicker;
}(BasePeoplePicker));
exports.NormalPeoplePicker = NormalPeoplePicker;
/**
* Compact layout. It uses small personas when displaying search results.
*/
var CompactPeoplePicker = (function (_super) {
    __extends(CompactPeoplePicker, _super);
    function CompactPeoplePicker() {
        _super.apply(this, arguments);
    }
    CompactPeoplePicker.defaultProps = {
        onRenderItem: function (props) { return React.createElement(SelectedItemDefault_1.SelectedItemDefault, __assign({}, props)); },
        onRenderSuggestionsItem: function (props) { return React.createElement(SuggestionItemDefault_1.SuggestionItemSmall, __assign({}, props)); }
    };
    return CompactPeoplePicker;
}(BasePeoplePicker));
exports.CompactPeoplePicker = CompactPeoplePicker;
/**
 * MemberList layout. The selected people show up below the search box.
 */
var ListPeoplePicker = (function (_super) {
    __extends(ListPeoplePicker, _super);
    function ListPeoplePicker() {
        _super.apply(this, arguments);
    }
    ListPeoplePicker.defaultProps = {
        onRenderItem: function (props) { return React.createElement(SelectedItemWithMenu_1.SelectedItemWithMenu, __assign({}, props)); },
        onRenderSuggestionsItem: function (props) { return React.createElement(SuggestionItemDefault_1.SuggestionItemNormal, __assign({}, props)); }
    };
    return ListPeoplePicker;
}(MemberListPeoplePicker));
exports.ListPeoplePicker = ListPeoplePicker;

//# sourceMappingURL=PeoplePicker.js.map
