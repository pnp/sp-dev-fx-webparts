"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var index_1 = require('../../../../index');
var LinkBasicExample = (function (_super) {
    __extends(LinkBasicExample, _super);
    function LinkBasicExample() {
        _super.apply(this, arguments);
    }
    LinkBasicExample.prototype.render = function () {
        return (React.createElement("div", null, 
            React.createElement(index_1.Link, {href: 'http://dev.office.com/fabric/components/link'}, "I am a link with an href."), 
            React.createElement("span", null, " Also, "), 
            React.createElement(index_1.Link, null, "I am a link without an href. "), 
            React.createElement("span", null, " Not to be outdone, "), 
            React.createElement(index_1.Link, {disabled: true, href: 'http://dev.office.com/fabric/components/link'}, "I am a disabled link, even with an href.")));
    };
    return LinkBasicExample;
}(React.Component));
exports.LinkBasicExample = LinkBasicExample;

//# sourceMappingURL=Link.Basic.Example.js.map
