"use strict";
var FileUploadCtrl = (function () {
    function FileUploadCtrl(fileUploadService, $rootScope) {
        var _this = this;
        this.fileUploadService = fileUploadService;
        this.$rootScope = $rootScope;
        this.isUploading = false;
        this.isRemoving = false;
        var vm = this;
        $rootScope.$on('configurationChanged', function (event, args) {
            _this.libraryTitle = args.libraryTitle;
            _this.rowLimit = parseInt(args.rowLimit);
            if (_this.libraryTitle) {
                _this.init();
            }
        });
    }
    FileUploadCtrl.prototype.init = function () {
        var _this = this;
        this.fileUploadService.getFiles(this.libraryTitle, this.rowLimit)
            .then(function (response) {
            _this.allFiles = response;
        }, function (error) {
            alert(error.message);
        });
    };
    FileUploadCtrl.prototype.upload = function () {
        var _this = this;
        if (!this.file) {
            return;
        }
        this.isUploading = true;
        this.fileUploadService.uploadFile(this.libraryTitle, this.file)
            .then(function (response) {
            _this.allFiles.unshift(response);
            _this.file = null;
            _this.isUploading = false;
        }, function (error) {
            alert(error.message);
            _this.isUploading = false;
        });
    };
    FileUploadCtrl.prototype.deleteFile = function (fileItem) {
        var _this = this;
        this.isRemoving = true;
        this.fileUploadService
            .deleteFile(this.libraryTitle, fileItem.Id)
            .then(function (response) {
            var fileItemIndex = _this.allFiles.indexOf(fileItem);
            _this.allFiles.splice(fileItemIndex, 1);
            _this.isRemoving = false;
        }, function (error) {
            alert(error.message);
            _this.isRemoving = false;
        });
    };
    return FileUploadCtrl;
}());
FileUploadCtrl.$inject = ['fileUploadService', '$rootScope'];
exports.FileUploadCtrl = FileUploadCtrl;

//# sourceMappingURL=fileUploadCtrl.js.map
