"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var StoreHost = (function (_super) {
    __extends(StoreHost, _super);
    function StoreHost() {
        _super.apply(this, arguments);
    }
    StoreHost.prototype.getChildContext = function () {
        var parentStores = this.context.stores;
        var currentStores = this.props.stores;
        return { stores: parentStores ? parentStores.merge(currentStores) : currentStores };
    };
    StoreHost.prototype.render = function () {
        return React.Children.only(this.props.children);
    };
    StoreHost.contextTypes = {
        stores: React.PropTypes.object
    };
    StoreHost.childContextTypes = {
        stores: React.PropTypes.object
    };
    return StoreHost;
}(React.Component));
exports.StoreHost = StoreHost;

//# sourceMappingURL=StoreHost.js.map
