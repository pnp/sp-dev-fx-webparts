"use strict";
var ElevatedPrivilegesController = (function () {
    function ElevatedPrivilegesController($scope, $log, $api, $adalProvider) {
        this.$scope = $scope;
        this.$log = $log;
        this.$api = $api;
        this.$adalProvider = $adalProvider;
        this.signedIn = false;
        // private variables
        this._hasGraphToken = false;
        this._hasAPIToken = false;
        if (this.hasGraphToken()) {
            this.callGraph();
        }
    }
    ElevatedPrivilegesController.prototype.signOn = function () {
        this.$adalProvider.login();
    };
    ElevatedPrivilegesController.prototype.signOut = function () {
        this.$adalProvider.logOut();
    };
    ElevatedPrivilegesController.prototype.isAuthenticated = function () {
        return this.$adalProvider.userInfo.isAuthenticated;
    };
    ElevatedPrivilegesController.prototype.getGraphToken = function () {
        this.$adalProvider.acquireToken("https://graph.microsoft.com");
    };
    ElevatedPrivilegesController.prototype.getAPIToken = function () {
        this.$adalProvider.acquireToken('https://dhartman.onmicrosoft.com/PnPWebApp');
    };
    ElevatedPrivilegesController.prototype.hasGraphToken = function () {
        this._hasGraphToken = this.$adalProvider.getCachedToken("https://graph.microsoft.com") !== null;
        return this._hasGraphToken;
    };
    ElevatedPrivilegesController.prototype.hasAPIToken = function () {
        this._hasAPIToken = this.$adalProvider.getCachedToken('https://dhartman.onmicrosoft.com/PnPWebApp') !== null;
        return this._hasAPIToken;
    };
    ElevatedPrivilegesController.prototype.callGraph = function () {
        var _this = this;
        this.$api.getMe()
            .then(function (result) {
            _this.$log.debug("success call to graph api");
            _this.user = result.data;
        });
    };
    ElevatedPrivilegesController.prototype.callApi = function () {
        var _this = this;
        this.$api.getItem()
            .then(function (result) {
            _this.$log.debug("success call to web api");
            _this.$log.debug(result);
            alert('success call to custom web api');
        });
    };
    return ElevatedPrivilegesController;
}());
ElevatedPrivilegesController.$inject = ['$scope', '$log', 'WebAPIService', 'adalAuthenticationService'];
exports.ElevatedPrivilegesController = ElevatedPrivilegesController;

//# sourceMappingURL=elevatedprivilegesController.js.map
