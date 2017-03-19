"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var index_1 = require('../../../../index');
var NavByKeysExample = (function (_super) {
    __extends(NavByKeysExample, _super);
    function NavByKeysExample() {
        _super.apply(this, arguments);
    }
    NavByKeysExample.prototype.render = function () {
        return (React.createElement(index_1.Nav, {groups: [{ links: [
                    { name: 'Home', key: 'Home', url: '' },
                    { name: 'Activity', key: 'Activity', url: '' },
                    { name: 'News', key: 'News', url: '' },
                    { name: 'Documents', key: 'Documents', url: '' },
                ] }]}));
    };
    return NavByKeysExample;
}(React.Component));
exports.NavByKeysExample = NavByKeysExample;

//# sourceMappingURL=Nav.ByKeys.Example.js.map
