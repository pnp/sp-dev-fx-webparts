"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var sp_core_library_1 = require("@microsoft/sp-core-library");
var sp_webpart_base_1 = require("@microsoft/sp-webpart-base");
var sp_loader_1 = require("@microsoft/sp-loader");
var strings = require("angularWebApiStrings");
var angular = require("angular");
require("ng-office-ui-fabric");
require("./app/app.module");
var AngularWebApiWebPart = (function (_super) {
    __extends(AngularWebApiWebPart, _super);
    function AngularWebApiWebPart(context) {
        var _this = _super.call(this) || this;
        sp_loader_1.SPComponentLoader.loadCss('https://appsforoffice.microsoft.com/fabric/2.6.1/fabric.min.css');
        sp_loader_1.SPComponentLoader.loadCss('https://appsforoffice.microsoft.com/fabric/2.6.1/fabric.components.min.css');
        return _this;
    }
    AngularWebApiWebPart.prototype.render = function () {
        if (this.renderedOnce === false) {
            this.domElement.innerHTML = "<angularwebapi></angularwebapi>";
            this.$injector = angular.bootstrap(this.domElement, ['angularsecurecall']);
        }
    };
    Object.defineProperty(AngularWebApiWebPart.prototype, "dataVersion", {
        get: function () {
            return sp_core_library_1.Version.parse('1.0');
        },
        enumerable: true,
        configurable: true
    });
    AngularWebApiWebPart.prototype.getPropertyPaneConfiguration = function () {
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
                                sp_webpart_base_1.PropertyPaneTextField('description', {
                                    label: strings.DescriptionFieldLabel
                                })
                            ]
                        }
                    ]
                }
            ]
        };
    };
    return AngularWebApiWebPart;
}(sp_webpart_base_1.BaseClientSideWebPart));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AngularWebApiWebPart;

//# sourceMappingURL=AngularWebApiWebPart.js.map
