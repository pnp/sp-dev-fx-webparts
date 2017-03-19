"use strict";
var HomeController = (function () {
    function HomeController($scope, $log, $api, $adalProvider) {
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
    HomeController.prototype.signOn = function () {
        this.$adalProvider.login();
    };
    HomeController.prototype.signOut = function () {
        this.$adalProvider.logOut();
    };
    HomeController.prototype.isAuthenticated = function () {
        return this.$adalProvider.userInfo.isAuthenticated;
    };
    HomeController.prototype.getGraphToken = function () {
        this.$adalProvider.acquireToken("https://graph.microsoft.com");
    };
    HomeController.prototype.getAPIToken = function () {
        this.$adalProvider.acquireToken('https://dhartman.onmicrosoft.com/PnPWebApp');
    };
    HomeController.prototype.hasGraphToken = function () {
        this._hasGraphToken = this.$adalProvider.getCachedToken("https://graph.microsoft.com") !== null;
        return this._hasGraphToken;
    };
    HomeController.prototype.hasAPIToken = function () {
        this._hasAPIToken = this.$adalProvider.getCachedToken('https://dhartman.onmicrosoft.com/PnPWebApp') !== null;
        return this._hasAPIToken;
    };
    HomeController.prototype.callGraph = function () {
        var _this = this;
        this.$api.getMe()
            .then(function (result) {
            _this.$log.debug("success call to graph api");
            _this.user = result.data;
        });
    };
    HomeController.prototype.callApi = function () {
        var _this = this;
        this.$api.getItem()
            .then(function (result) {
            _this.$log.debug("success call to web api");
            _this.$log.debug(result);
            alert('success call to custom web api');
        });
    };
    return HomeController;
}());
HomeController.$inject = ['$scope', '$log', 'WebAPIService', 'adalAuthenticationService'];
exports.HomeController = HomeController;

//# sourceMappingURL=homeController.js.map
