"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/* tslint:disable:no-unused-variable */
var React = require('react');
/* tslint:enable:no-unused-variable */
var Breadcrumb_1 = require('../../../../Breadcrumb');
var BreadcrumbBasicExample = (function (_super) {
    __extends(BreadcrumbBasicExample, _super);
    function BreadcrumbBasicExample() {
        _super.call(this);
        this._onBreadcrumbItemClicked = this._onBreadcrumbItemClicked.bind(this);
    }
    BreadcrumbBasicExample.prototype.render = function () {
        return (React.createElement(Breadcrumb_1.Breadcrumb, {items: [
            { text: 'Files', 'key': 'Files', onClick: this._onBreadcrumbItemClicked },
            { text: 'This is folder 1', 'key': 'f1', onClick: this._onBreadcrumbItemClicked },
            { text: 'This is folder 2', 'key': 'f2', onClick: this._onBreadcrumbItemClicked },
            { text: 'This is folder 3', 'key': 'f3', onClick: this._onBreadcrumbItemClicked },
            { text: 'This is folder 4', 'key': 'f4', onClick: this._onBreadcrumbItemClicked },
            { text: 'This is folder 5', 'key': 'f5', onClick: this._onBreadcrumbItemClicked },
        ], maxDisplayedItems: 3}));
    };
    BreadcrumbBasicExample.prototype._onBreadcrumbItemClicked = function (ev, item) {
        console.log("Breadcrumb item with key \"" + item.key + "\" has been clicked.");
    };
    return BreadcrumbBasicExample;
}(React.Component));
exports.BreadcrumbBasicExample = BreadcrumbBasicExample;

//# sourceMappingURL=Breadcrumb.Basic.Example.js.map
