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
var TagItem_1 = require('./TagItem');
var TagPicker = (function (_super) {
    __extends(TagPicker, _super);
    function TagPicker() {
        _super.apply(this, arguments);
    }
    TagPicker.defaultProps = {
        onRenderItem: function (props) { return React.createElement(TagItem_1.TagItem, __assign({}, props), props.item.name); },
        onRenderSuggestionsItem: function (props) { return React.createElement("div", null, 
            " ", 
            props.name, 
            " "); }
    };
    return TagPicker;
}(BasePicker_1.BasePicker));
exports.TagPicker = TagPicker;

//# sourceMappingURL=TagPicker.js.map
