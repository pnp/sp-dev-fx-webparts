"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var TagPicker_1 = require('../../../../components/pickers/TagPicker/TagPicker');
var _testTags = [
    'black',
    'blue',
    'brown',
    'cyan',
    'green',
    'magenta',
    'mauve',
    'orange',
    'pink',
    'purple',
    'red',
    'rose',
    'violet',
    'white',
    'yellow'
].map(function (item) { return ({ key: item, name: item }); });
var TagPickerBasicExample = (function (_super) {
    __extends(TagPickerBasicExample, _super);
    function TagPickerBasicExample() {
        _super.apply(this, arguments);
    }
    TagPickerBasicExample.prototype.render = function () {
        return (React.createElement(TagPicker_1.TagPicker, {onResolveSuggestions: this._onFilterChanged.bind(this), getTextFromItem: function (item) { return item.name; }, pickerSuggestionsProps: {
            suggestionsHeaderText: 'Suggested Tags',
            noResultsFoundText: 'No Color Tags Found'
        }}));
    };
    TagPickerBasicExample.prototype._onFilterChanged = function (filterText, tagList) {
        var _this = this;
        return filterText ? _testTags.filter(function (tag) { return tag.name.toLowerCase().indexOf(filterText.toLowerCase()) === 0; }).filter(function (item) { return !_this._listContainsDocument(item, tagList); }) : [];
    };
    TagPickerBasicExample.prototype._listContainsDocument = function (tag, tagList) {
        if (!tagList || !tagList.length || tagList.length === 0) {
            return false;
        }
        return tagList.filter(function (compareTag) { return compareTag.key === tag.key; }).length > 0;
    };
    return TagPickerBasicExample;
}(React.Component));
exports.TagPickerBasicExample = TagPickerBasicExample;

//# sourceMappingURL=TagPicker.Basic.Example.js.map
