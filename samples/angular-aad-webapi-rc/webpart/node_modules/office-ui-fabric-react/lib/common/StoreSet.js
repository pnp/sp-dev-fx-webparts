"use strict";
var Utilities_1 = require('../Utilities');
var StoreSet = (function () {
    function StoreSet() {
        this._stores = {};
    }
    StoreSet.prototype.add = function (key, value) {
        this._stores[key.id] = value;
        return this;
    };
    StoreSet.prototype.getStore = function (key) {
        return this._stores[key.id];
    };
    StoreSet.prototype.merge = function (stores) {
        var mergedStoreSet = new StoreSet();
        mergedStoreSet._stores = Utilities_1.assign({}, this._stores, stores);
        return mergedStoreSet;
    };
    return StoreSet;
}());
exports.StoreSet = StoreSet;

//# sourceMappingURL=StoreSet.js.map
