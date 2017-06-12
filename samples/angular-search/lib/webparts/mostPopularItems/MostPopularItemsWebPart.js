"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var sp_core_library_1 = require("@microsoft/sp-core-library");
var sp_webpart_base_1 = require("@microsoft/sp-webpart-base");
var angular = require("angular");
require("ng-office-ui-fabric");
var sp_loader_1 = require("@microsoft/sp-loader");
var strings = require("mostPopularItemsStrings");
var LandingTemplate_1 = require("./LandingTemplate");
var MostPopularItemsWebPart = (function (_super) {
    __extends(MostPopularItemsWebPart, _super);
    function MostPopularItemsWebPart(context) {
        var _this = _super.call(this) || this;
        sp_loader_1.SPComponentLoader.loadCss('https://appsforoffice.microsoft.com/fabric/2.6.1/fabric.min.css');
        sp_loader_1.SPComponentLoader.loadCss('https://appsforoffice.microsoft.com/fabric/2.6.1/fabric.components.min.css');
        return _this;
    }
    MostPopularItemsWebPart.prototype.render = function () {
        if (this.renderedOnce === false) {
            this.domElement.innerHTML = LandingTemplate_1.default.templateHtml;
            require('./app/controller_home.js');
            this.$injector = angular.bootstrap(this.domElement, ['app_MostPopularItems']);
        }
        this.$injector.get('$rootScope').$broadcast('configurationChanged', {
            url: this.properties.url,
            numberOfItems: this.properties.numberOfItems
        });
    };
    Object.defineProperty(MostPopularItemsWebPart.prototype, "dataVersion", {
        get: function () {
            return sp_core_library_1.Version.parse('1.0');
        },
        enumerable: true,
        configurable: true
    });
    MostPopularItemsWebPart.prototype.getPropertyPaneConfiguration = function () {
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
                                sp_webpart_base_1.PropertyPaneTextField('url', {
                                    label: strings.UrlFieldLabel
                                }),
                                sp_webpart_base_1.PropertyPaneSlider('numberOfItems', {
                                    label: strings.NumberOfItemsFieldLabel,
                                    min: 5,
                                    max: 25,
                                    step: 1
                                })
                            ]
                        }
                    ]
                }
            ]
        };
    };
    Object.defineProperty(MostPopularItemsWebPart.prototype, "disableReactivePropertyChanges", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    return MostPopularItemsWebPart;
}(sp_webpart_base_1.BaseClientSideWebPart));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MostPopularItemsWebPart;

//# sourceMappingURL=MostPopularItemsWebPart.js.map
