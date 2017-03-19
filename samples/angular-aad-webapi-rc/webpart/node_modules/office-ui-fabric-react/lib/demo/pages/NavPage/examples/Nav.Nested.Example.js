"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var index_1 = require('../../../../index');
var NavNestedExample = (function (_super) {
    __extends(NavNestedExample, _super);
    function NavNestedExample() {
        _super.apply(this, arguments);
    }
    NavNestedExample.prototype.render = function () {
        return (React.createElement(index_1.Nav, {groups: [{ links: [
                    { name: 'Parent link', url: 'http://example.com', links: [
                            { name: 'Child link', url: 'http://example.com' },
                            { name: 'Child link', url: 'http://example.com', links: [
                                    { name: 'Child link', url: 'http://example.com' },
                                    { name: 'Child link', url: 'http://example.com' }
                                ] },
                            { name: 'Child link', url: 'http://example.com' }
                        ] },
                    { name: 'Parent link', url: 'http://example.com', links: [
                            { name: 'Child link', url: 'http://example.com' },
                        ] }
                ] }]}));
    };
    return NavNestedExample;
}(React.Component));
exports.NavNestedExample = NavNestedExample;

//# sourceMappingURL=Nav.Nested.Example.js.map
