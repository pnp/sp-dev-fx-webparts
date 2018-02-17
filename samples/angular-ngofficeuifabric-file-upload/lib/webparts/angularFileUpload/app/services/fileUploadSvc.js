"use strict";
var FileUploadService = (function () {
    function FileUploadService(baseService, $q) {
        this.baseService = baseService;
        this.$q = $q;
    }
    FileUploadService.prototype.uploadFile = function (libraryName, file) {
        var _this = this;
        var deferred = this.$q.defer();
        var uploadUrl = "/_api/web/lists/getbytitle('" + libraryName + "')/rootfolder/files/add(url=@filename, overwrite=true)?@filename='" + file.fileName + "'";
        this.baseService
            .postRequest(uploadUrl, file.fileAsBuffer)
            .then(function (response) {
            return _this.baseService
                .getRequest(null, response.d.ListItemAllFields.__deferred.uri + "?$select=Id,Modified,FileLeafRef");
        }).then(function (response) {
            deferred.resolve(response);
        }, function (error) {
            deferred.reject(error);
        });
        return deferred.promise;
    };
    FileUploadService.prototype.getFiles = function (libraryName, rowLimit) {
        var url = "/_api/Web/lists/getbytitle('" + libraryName + "')/items?$select=Id,Modified,FileLeafRef,Author/Id&$expand=Author&$orderby=Modified desc&$top=" + rowLimit;
        return this.baseService.getRequest(url);
    };
    FileUploadService.prototype.deleteFile = function (libraryName, id) {
        var url = "/_api/Web/lists/getbytitle('" + libraryName + "')/items(" + id + ")";
        return this.baseService.deleteRequest(url, "*");
    };
    return FileUploadService;
}());
FileUploadService.$inject = ["baseService", "$q"];
exports.FileUploadService = FileUploadService;

//# sourceMappingURL=fileUploadSvc.js.map
