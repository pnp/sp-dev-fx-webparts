"use strict";
var angular = require("angular");
var BaseService = (function () {
    function BaseService($http, $q, pageContext) {
        this.$http = $http;
        this.$q = $q;
        this.pageContext = pageContext;
        this.baseUrl = pageContext.web.absoluteUrl;
    }
    BaseService.prototype.getRequest = function (query, endPoint) {
        var deferred = this.$q.defer();
        this.$http({
            url: endPoint || this.baseUrl + query,
            method: "GET",
            headers: {
                "accept": "application/json;odata=verbose",
                "content-Type": "application/json;odata=verbose"
            }
        }).then(function (response) {
            if (response.data.d.results) {
                deferred.resolve(response.data.d.results);
            }
            else {
                deferred.resolve(response.data.d);
            }
        }, function (error) {
            var iError = {
                code: error.data.error.code,
                message: error.data.error.message.value,
                status: error.status,
                statusText: error.statusText
            };
            deferred.reject(iError);
        });
        return deferred.promise;
    };
    BaseService.prototype.postRequest = function (url, requestBody, endPoint) {
        var _this = this;
        var deferred = this.$q.defer();
        this.getFormDigestValue(this.baseUrl)
            .then(function (requestDigest) {
            return _this.$http({
                url: endPoint || _this.baseUrl + url,
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "X-RequestDigest": requestDigest,
                    "content-Type": "application/json;odata=verbose"
                },
                data: JSON.stringify(requestBody)
            });
        }).then(function (response) {
            deferred.resolve(response.data);
        }, function (error) {
            var iError = {
                code: error.data.error.code,
                message: error.data.error.message.value,
                status: error.status,
                statusText: error.statusText
            };
            deferred.reject(iError);
        });
        return deferred.promise;
    };
    BaseService.prototype.updateRequest = function (url, requestBody, eTag, endPoint) {
        var _this = this;
        var deferred = this.$q.defer();
        this.getFormDigestValue(this.baseUrl)
            .then(function (requestDigest) {
            return _this.$http({
                url: endPoint || _this.baseUrl + url,
                method: "POST",
                headers: {
                    "accept": "application/json;odata=verbose",
                    "X-RequestDigest": requestDigest,
                    "content-Type": "application/json;odata=verbose",
                    'IF-MATCH': eTag,
                    'X-HTTP-Method': 'MERGE'
                },
                data: JSON.stringify(requestBody)
            });
        }).then(function (response) {
            deferred.resolve();
        }, function (error) {
            var iError = {
                code: error.data.error.code,
                message: error.data.error.message.value,
                status: error.status,
                statusText: error.statusText
            };
            deferred.reject(iError);
        });
        return deferred.promise;
    };
    BaseService.prototype.deleteRequest = function (url, eTag, endPoint) {
        var _this = this;
        var deferred = this.$q.defer();
        this.getFormDigestValue(this.baseUrl)
            .then(function (requestDigest) {
            return _this.$http({
                url: endPoint || _this.baseUrl + url,
                method: "POST",
                headers: {
                    'Accept': 'application/json;odata=nometadata',
                    'X-RequestDigest': requestDigest,
                    'IF-MATCH': eTag,
                    'X-HTTP-Method': 'DELETE'
                }
            });
        }).then(function (response) {
            deferred.resolve();
        }, function (error) {
            var iError = {
                code: error.data.error.code,
                message: error.data.error.message.value,
                status: error.status,
                statusText: error.statusText
            };
            deferred.reject(iError);
        });
        return deferred.promise;
    };
    BaseService.prototype.fileUploadRequest = function (url, file, endPoint) {
        var _this = this;
        var deferred = this.$q.defer();
        this.getFormDigestValue(this.baseUrl)
            .then(function (requestDigest) {
            return _this.$http({
                url: endPoint || _this.baseUrl + url,
                method: "POST",
                transformRequest: angular.identity,
                headers: {
                    "accept": "application/json;odata=verbose",
                    "X-RequestDigest": requestDigest,
                    "content-Type": undefined
                },
                data: ArrayBuffer
            });
        }).then(function (response) {
            deferred.resolve(response.data);
        }, function (error) {
            var iError = {
                code: error.data.error.code,
                message: error.data.error.message.value,
                status: error.status,
                statusText: error.statusText
            };
            deferred.reject(iError);
        });
        return deferred.promise;
    };
    BaseService.prototype.getFormDigestValue = function (webUrl) {
        var deferred = this.$q.defer();
        this.$http({
            url: webUrl + '/_api/contextinfo',
            method: 'POST',
            headers: {
                'Accept': 'application/json;odata=nometadata'
            }
        })
            .then(function (digestResult) {
            deferred.resolve(digestResult.data.FormDigestValue);
        }, function (error) {
            var iError = {
                code: error.data.error.code,
                message: error.data.error.message.value,
                status: error.status,
                statusText: error.statusText
            };
            deferred.reject(iError);
        });
        return deferred.promise;
    };
    return BaseService;
}());
BaseService.$inject = ["$http", "$q", "pageContext"];
exports.BaseService = BaseService;

//# sourceMappingURL=baseSvc.js.map
