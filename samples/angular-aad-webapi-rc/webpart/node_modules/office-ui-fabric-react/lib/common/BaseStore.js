"use strict";
var _instanceId = 0;
var BaseStore = (function () {
    function BaseStore() {
        this._callbacks = {};
    }
    BaseStore.prototype.subscribe = function (onChange) {
        var _this = this;
        var id = _instanceId++;
        this._callbacks[id] = onChange;
        return { dispose: function () { return delete _this._callbacks[id]; } };
    };
    BaseStore.prototype.emitChange = function () {
        for (var id in this._callbacks) {
            if (this._callbacks.hasOwnProperty(id)) {
                this._callbacks[id]();
            }
        }
    };
    return BaseStore;
}());
exports.BaseStore = BaseStore;

//# sourceMappingURL=BaseStore.js.map
