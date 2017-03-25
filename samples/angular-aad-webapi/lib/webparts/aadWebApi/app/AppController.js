"use strict";
var AppController = (function () {
    function AppController($rootScope, $state) {
        this.$state = $state;
        this._init();
    }
    AppController.prototype._init = function () {
        this.$state.go('elevatedprivileges');
    };
    return AppController;
}());
AppController.$inject = ['$rootScope', '$state'];
exports.AppController = AppController;

//# sourceMappingURL=AppController.js.map
