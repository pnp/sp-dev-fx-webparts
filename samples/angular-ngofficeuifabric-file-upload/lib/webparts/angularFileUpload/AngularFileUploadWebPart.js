"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var sp_core_library_1 = require("@microsoft/sp-core-library");
var sp_webpart_base_1 = require("@microsoft/sp-webpart-base");
var sp_loader_1 = require("@microsoft/sp-loader");
var AngularFileUpload_module_scss_1 = require("./AngularFileUpload.module.scss");
var strings = require("angularFileUploadStrings");
var angular = require("angular");
require("ng-office-ui-fabric");
var baseSvc_1 = require("./app/services/baseSvc");
var fileUploadSvc_1 = require("./app/services/fileUploadSvc");
var fileUploadCtrl_1 = require("./app/controllers/fileUploadCtrl");
var customFileChange_1 = require("./app/directives/customFileChange");
var isoToDateString_1 = require("./app/filters/isoToDateString");
var AngularFileUploadWebPart = (function (_super) {
    __extends(AngularFileUploadWebPart, _super);
    function AngularFileUploadWebPart(context) {
        var _this = _super.call(this) || this;
        sp_loader_1.SPComponentLoader.loadCss('https://appsforoffice.microsoft.com/fabric/2.6.1/fabric.min.css');
        sp_loader_1.SPComponentLoader.loadCss('https://appsforoffice.microsoft.com/fabric/2.6.1/fabric.components.min.css');
        return _this;
    }
    AngularFileUploadWebPart.prototype.render = function () {
        if (this.renderedOnce === false) {
            this.domElement.innerHTML = "\n      <div class=\"" + AngularFileUpload_module_scss_1.default.angularFileUpload + "\">\n        <div class=\"" + AngularFileUpload_module_scss_1.default.container + "\" data-ng-controller=\"fileUploadCtrl as vm\">\n          <div class=\"ms-Grid ms-fontColor-white " + AngularFileUpload_module_scss_1.default.row + " " + AngularFileUpload_module_scss_1.default.headerBackground + "\">\n            <div class=\"ms-Grid-row\">\n            <div class=\"ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12\">\n               <h1 class=\"ms-fontSize-su ms-fontColor-white " + AngularFileUpload_module_scss_1.default.textAlignCenter + "\">Welcome to Angular File Upload!</h1>\n            </div>\n            </div>\n            <div class=\"ms-Grid-row " + AngularFileUpload_module_scss_1.default.whiteBackground + " " + AngularFileUpload_module_scss_1.default.row + "\">\n              <div class=\"ms-Grid-col ms-u-sm5 ms-u-md7 ms-u-lg7 ms-fontColor-black\"><input type=\"file\" value=\"vm.file.fileName\" data-custom-file-change=\"vm.file\" /></div>\n              <div class=\"ms-Grid-col ms-u-sm2 ms-u-md2 ms-u-lg2\"><uif-spinner data-ng-if=\"vm.isUploading\"></uif-spinner></div>\n              <div class=\"ms-Grid-col ms-u-sm5 ms-u-md3 ms-u-lg3\"><uif-button uif-type=\"primary\" data-ng-click=\"vm.upload()\">Upload</uif-button></div>\n            </div>\n\n            <div class=\"ms-Grid-row\">\n            <div class=\"ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12\">\n               <h1 class=\"ms-fontSize-su ms-fontColor-white " + AngularFileUpload_module_scss_1.default.textAlignCenter + "\">{{vm.libraryTitle}}: Files uploaded by You</h1>\n            </div>\n            </div>\n\n            <div class=\"ms-Grid-row " + AngularFileUpload_module_scss_1.default.whiteBackground + " " + AngularFileUpload_module_scss_1.default.row + "\">\n            <div class=\"ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12\">\n                   <uif-spinner data-ng-if=\"vm.isRemoving\">Removing .....</uif-spinner>\n               </div>\n            </div>\n\n            <div class=\"ms-Grid-row " + AngularFileUpload_module_scss_1.default.whiteBackground + " " + AngularFileUpload_module_scss_1.default.row + "\">\n               <div class=\"ms-Grid-col ms-u-sm12 ms-u-md12 ms-u-lg12\">\n                  <uif-table>\n                      <uif-table-head>\n                          <uif-table-row>\n                              <uif-table-header>File Name</uif-table-header>\n                              <uif-table-header>Modified</uif-table-header>\n                              <uif-table-header>Action</uif-table-header>\n                          </uif-table-row>\n                      </uif-table-head>\n                      <uif-table-body>\n                          <uif-table-row data-ng-repeat=\"fileItem in vm.allFiles\">\n                              <uif-table-cell>{{fileItem.FileLeafRef}}</uif-table-cell>\n                              <uif-table-cell>{{fileItem.Modified | isoToDateString}}</uif-table-cell>\n                              <uif-table-cell><i class=\"ms-Icon ms-Icon--Delete " + AngularFileUpload_module_scss_1.default.cursorPointer + "\" aria-hidden=\"true\" data-ng-click=\"vm.deleteFile(fileItem)\"></i></uif-table-cell>\n                          </uif-table-row>\n                      </uif-table-body>\n                  </uif-table>\n               </div>\n            </div>\n          </div>\n        </div>\n      </div>";
            var context = this.context.pageContext;
            this.initAngularApp(context);
        }
        this.$injector.get('$rootScope').$broadcast('configurationChanged', {
            libraryTitle: this.properties.libraryTitle,
            rowLimit: this.properties.rowLimit
        });
    };
    AngularFileUploadWebPart.prototype.initAngularApp = function (pageContext) {
        var fileUploadApp = angular.module('fileUploadApp', [
            'officeuifabric.core',
            'officeuifabric.components'
        ]);
        fileUploadApp
            .constant("pageContext", pageContext)
            .service("baseService", baseSvc_1.BaseService)
            .service("fileUploadService", fileUploadSvc_1.FileUploadService)
            .controller("fileUploadCtrl", fileUploadCtrl_1.FileUploadCtrl)
            .filter("isoToDateString", isoToDateString_1.IsoToDateString.filter)
            .directive("customFileChange", customFileChange_1.CustomFileChange.factory());
        this.$injector = angular.bootstrap(this.domElement, ['fileUploadApp']);
    };
    Object.defineProperty(AngularFileUploadWebPart.prototype, "dataVersion", {
        get: function () {
            return sp_core_library_1.Version.parse('1.0');
        },
        enumerable: true,
        configurable: true
    });
    AngularFileUploadWebPart.prototype.getPropertyPaneConfiguration = function () {
        return {
            pages: [
                {
                    header: {
                        description: strings.PropertyPaneDescription
                    },
                    groups: [
                        {
                            groupName: strings.BasicGroupName,
                            groupFields: [
                                sp_webpart_base_1.PropertyPaneTextField('libraryTitle', {
                                    label: strings.LibraryTitleLabel
                                }),
                                sp_webpart_base_1.PropertyPaneTextField('rowLimit', {
                                    label: strings.RowLimitLabel
                                })
                            ]
                        }
                    ]
                }
            ]
        };
    };
    Object.defineProperty(AngularFileUploadWebPart.prototype, "disableReactivePropertyChanges", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    return AngularFileUploadWebPart;
}(sp_webpart_base_1.BaseClientSideWebPart));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AngularFileUploadWebPart;

//# sourceMappingURL=AngularFileUploadWebPart.js.map
