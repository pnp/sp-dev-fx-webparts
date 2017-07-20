"use strict";
var angular = require("angular");
require("ng-office-ui-fabric");
var baseSvc_1 = require("./services/baseSvc");
var fileUploadSvc_1 = require("./services/fileUploadSvc");
var fileUploadCtrl_1 = require("./controllers/fileUploadCtrl");
var customFileChange_1 = require("./directives/customFileChange");
var isoToDateString_1 = require("./filters/isoToDateString");
var fileUploadApp = angular.module('fileUploadApp', [
    'officeuifabric.core',
    'officeuifabric.components'
]);
fileUploadApp
    .service("baseService", baseSvc_1.BaseService)
    .service("fileUploadService", fileUploadSvc_1.FileUploadService)
    .controller("fileUploadCtrl", fileUploadCtrl_1.FileUploadCtrl)
    .filter("isoToDateString", isoToDateString_1.IsoToDateString.filter)
    .directive("customFileChange", customFileChange_1.CustomFileChange.factory());

//# sourceMappingURL=FileUploadModule.js.map
