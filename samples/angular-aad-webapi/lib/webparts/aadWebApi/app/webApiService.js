"use strict";
var WebAPIService = (function () {
    function WebAPIService($q, $http, $log) {
        this.$q = $q;
        this.$http = $http;
        this.$log = $log;
    }
    WebAPIService.prototype.getItem = function () {
        return this.$http.get('https://pnpwebappsecure.azurewebsites.net/api/item');
    };
    WebAPIService.prototype.getMe = function () {
        return this.$http.get('https://graph.microsoft.com/v1.0/me');
    };
    return WebAPIService;
}());
WebAPIService.$inject = ['$q', '$http', '$log'];
exports.WebAPIService = WebAPIService;

//# sourceMappingURL=webApiService.js.map
