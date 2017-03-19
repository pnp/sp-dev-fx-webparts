"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var index_1 = require('../../../../index');
require('./SearchBox.Small.Example.scss');
var SearchBoxSmallExample = (function (_super) {
    __extends(SearchBoxSmallExample, _super);
    function SearchBoxSmallExample() {
        _super.apply(this, arguments);
    }
    SearchBoxSmallExample.prototype.render = function () {
        return (React.createElement("div", {className: 'ms-SearchBoxSmallExample'}, 
            React.createElement(index_1.SearchBox, {onChange: function (newValue) { return console.log('SearchBox onChange fired: ' + newValue); }, onSearch: function (newValue) { return console.log('SearchBox onSearch fired: ' + newValue); }})
        ));
    };
    return SearchBoxSmallExample;
}(React.Component));
exports.SearchBoxSmallExample = SearchBoxSmallExample;

//# sourceMappingURL=SearchBox.Small.Example.js.map
